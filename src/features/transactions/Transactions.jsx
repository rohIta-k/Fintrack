import { useState, useMemo, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useDebounce } from "../../hooks/useDebounce";

import { getTransactions } from "../../services/transactions.api";

import TransactionTable from "./components/TransactionTable";
import TransactionModal from "./components/TransactionModal";
import Filters from "./components/Filters";

const Transactions = () => {
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  // LOCAL STATE 
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  // Debounce search
  const debouncedSearch = useDebounce(filters.search, 500);

  const finalFilters = useMemo(() => {
    return {
      ...filters,
      search: debouncedSearch,
    };
  }, [filters, debouncedSearch]);

  const handleAdd = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tx) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  // SAVE HANDLER
  const handleSave = (newTx) => {
    if (editingTx) {
      // ✏️ EDIT
      setTransactions((prev) =>
        prev.map((tx) =>
          tx.id === editingTx.id ? { ...tx, ...newTx } : tx
        )
      );
    } else {
      // ADD
      const newTransaction = {
        ...newTx,
        id: Date.now().toString(),
      };

      setTransactions((prev) => [newTransaction, ...prev]);
    }
  };

  // FETCH INITIAL DATA
  const { data, loading, error, refetch } = useFetch(
    getTransactions,
    finalFilters
  );

  // FIRST LOAD: use API data if no local data
  useEffect(() => {
    if (data && transactions.length === 0) {
      setTransactions(data);
    }
  }, [data]);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // APPLY FILTERS ON LOCAL DATA 
  const filteredData = useMemo(() => {
    let filtered = [...transactions];

    if (finalFilters.search) {
      const search = finalFilters.search.toLowerCase();
      filtered = filtered.filter(
        (tx) =>
          tx.notes?.toLowerCase().includes(search) ||
          tx.category.toLowerCase().includes(search)
      );
    }

    if (finalFilters.type) {
      filtered = filtered.filter((tx) => tx.type === finalFilters.type);
    }

    if (finalFilters.category) {
      filtered = filtered.filter((tx) => tx.category === finalFilters.category);
    }

    if (finalFilters.minAmount) {
      filtered = filtered.filter(
        (tx) => tx.amount >= Number(finalFilters.minAmount)
      );
    }

    if (finalFilters.maxAmount) {
      filtered = filtered.filter(
        (tx) => tx.amount <= Number(finalFilters.maxAmount)
      );
    }

    if (finalFilters.startDate) {
      filtered = filtered.filter(
        (tx) =>
          new Date(tx.date + "T00:00:00") >=
          new Date(finalFilters.startDate)
      );
    }

    if (finalFilters.endDate) {
      filtered = filtered.filter(
        (tx) =>
          new Date(tx.date + "T23:59:59") <=
          new Date(finalFilters.endDate)
      );
    }

    return filtered;
  }, [transactions, finalFilters]);

  return (
    <div className="container-app page-padding flex flex-col gap-6">

      {/* Filters */}
      <Filters onChange={setFilters} onAdd={handleAdd} />

      {/* Loading */}
      {loading && transactions.length === 0 && (
        <div className="card">
          <p className="subtext">Loading transactions...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="card flex justify-between items-center">
          <p className="text-red-500">Failed to load transactions</p>
          <button className="btn-primary" onClick={refetch}>
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <TransactionTable
        data={filteredData}
        onEdit={handleEdit}
      />

      {/* Modal */}
      <TransactionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingTx}
      />
    </div>
  );
};

export default Transactions;
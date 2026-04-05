import { useState, useEffect } from "react";
import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";
import { getCategoryById } from "../../../constants/categories";
import { useRole } from "../../../context/RoleContext";

const ITEMS_PER_PAGE = 7;

const TransactionTable = ({ data = [], onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = data.slice(startIndex, endIndex);

  const { role } = useRole();
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <div className="card overflow-x-auto">

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="table-header text-left border-b border-[var(--border)]">
            <th className="py-3">Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Notes</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={role === "admin" ? 6 : 5} className="text-center py-6 text-[var(--muted)]">
                No transactions found
              </td>
            </tr>
          ) : (
            currentData.map((tx) => {
              const category = getCategoryById(tx.category);

              return (
                <tr
                  key={tx.id}
                  className="border-b border-[var(--border)] 
             transition"
                >
                  <td className="table-cell">{formatDate(tx.date)}</td>

                  <td className="table-cell">
                    <span className="flex items-center gap-2">
                      <span>{category?.icon}</span>
                      {category?.label || "Other"}
                    </span>
                  </td>

                  <td className="table-cell capitalize">{tx.type}</td>

                  <td
                    className="table-cell font-medium"
                    style={{
                      color:
                        tx.type === "income"
                          ? "var(--income)"
                          : "var(--expense)",
                    }}
                  >
                    {tx.type === "expense" ? "-" : "+"}
                    {formatCurrency(tx.amount)}
                  </td>

                  <td className="table-cell text-[var(--muted)]">
                    {tx.notes || "-"}
                  </td>
                  {role === "admin" && (
                    <td>
                      <button
                        className="text-sm text-blue-600 hover:underline font-medium"
                        onClick={() => onEdit(tx)}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex items-center justify-between px-4 py-3 text-sm text-[var(--muted)]">

          {/* Info */}
          <span>
            {startIndex + 1} – {Math.min(endIndex, totalItems)} of {totalItems}
          </span>

          {/* Controls */}
          <div className="flex items-center gap-2">

            {/* Prev */}
            <button
              className="px-2 py-1 rounded-md border border-[var(--border)] disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm ${currentPage === i + 1
                  ? "bg-gray-900 text-white"
                  : "border border-[var(--border)]"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              className="px-2 py-1 rounded-md border border-[var(--border)] disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
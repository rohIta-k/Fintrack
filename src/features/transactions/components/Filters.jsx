import { useState, useEffect } from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../../constants/categories";
import { useRole } from "../../../context/RoleContext";


const Filters = ({ onChange, onAdd }) => {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    category: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });

  // Notify on change
  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  const handleChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "",
      category: "",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
    });
  };

  const allCategories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
  const { role } = useRole();

  return (
    <div className="card flex flex-col gap-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by notes or category..."
        className="input"
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
      />

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">

        {/* Type */}
        <select
          className="input"
          value={filters.type}
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <select
          className="input"
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {allCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Min Amount */}
        <input
          type="number"
          placeholder="Min ₹"
          className="input"
          value={filters.minAmount}
          onChange={(e) => handleChange("minAmount", e.target.value)}
        />

        {/* Max Amount */}
        <input
          type="number"
          placeholder="Max ₹"
          className="input"
          value={filters.maxAmount}
          onChange={(e) => handleChange("maxAmount", e.target.value)}
        />

        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--muted)]">From</span>
          {/* Start Date */}
          <input
            type="date"
            className="input"
            value={filters.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--muted)]">To</span>

          {/* End Date */}
          <input
            type="date"
            className="input"
            value={filters.endDate}
            min={filters.startDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
        </div>
      </div>

      {/* Reset */}
      <div className="flex justify-between items-center">
        {role === "admin" && (
          <button className="btn-primary" onClick={() => {
            console.log("CLICKED");
            onAdd();
          }}>
            + Add Transaction
          </button>
        )}

        <button className="btn-outline hover:!bg-transparent hover:!shadow-none" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
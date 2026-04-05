import { useState, useEffect } from "react";

const TransactionModal = ({ open, onClose, onSave, initialData }) => {
    const [form, setForm] = useState({
        amount: "",
        type: "expense",
        category: "",
        date: "",
        notes: "",
    });

    // 🔥 Prefill for edit
    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        } else {
            setForm({
                amount: "",
                type: "expense",
                category: "",
                date: "",
                notes: "",
            });
        }
    }, [initialData, open]);

    if (!open) return null;

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const errors = [];

        // Amount
        if (!form.amount || Number(form.amount) <= 0) {
            errors.push("Valid amount");
        }

        // Category
        if (!form.category) {
            errors.push("Category");
        }

        // Date
        if (!form.date) {
            errors.push("Date");
        }

        // Type (optional check, but safe)
        if (!form.type) {
            errors.push("Type");
        }

        // ❌ If any errors → show ONE alert
        if (errors.length > 0) {
            alert(`Please fill the following fields:\n\n• ${errors.join("\n• ")}`);
            return;
        }
        onSave({
            ...form,
            amount: Number(form.amount),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px] flex flex-col gap-4">

                <h2 className="text-lg font-semibold">
                    {initialData ? "Edit Transaction" : "Add Transaction"}
                </h2>

                <input
                    className="input"
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                />

                <select
                    className="input"
                    value={form.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                <select
                    className="input"
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                >
                    <option value="">Select Category</option>

                    {(form.type === "expense"
                        ? ["food", "shopping", "transport", "bills", "entertainment", "health", "travel", "others"]
                        : ["salary", "freelance", "investments", "business", "other_income"]
                    ).map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    className="input"
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                />

                <input
                    className="input"
                    placeholder="Notes"
                    value={form.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                />

                <div className="flex justify-end gap-2">
                    <button className="btn-outline" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn-primary" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;
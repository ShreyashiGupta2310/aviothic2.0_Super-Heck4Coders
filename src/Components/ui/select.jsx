import React from "react";

export default function select({ label, options = [], value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

import React from "react";

// Badge component
// Props:
// - type: "food" | "water" | "medical" | "shelter" | "other"
// - status: "low" | "medium" | "high" | "resolved"
// - optional: className for extra styling
export default function badge({ type, status, className = "" }) {
  // Colors based on type
  const typeColors = {
    food: "bg-yellow-200 text-yellow-800",
    water: "bg-blue-200 text-blue-800",
    medical: "bg-red-200 text-red-800",
    shelter: "bg-green-200 text-green-800",
    other: "bg-gray-200 text-gray-800",
  };

  // Colors based on urgency/status
  const statusColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-orange-100 text-orange-700",
    high: "bg-red-100 text-red-700",
    resolved: "bg-gray-300 text-gray-800 line-through",
  };

  // Decide which color to use
  const bgColor = type ? typeColors[type] : statusColors[status] || "bg-gray-200 text-gray-800";

  // Text to show: prefer status first, then type
  const label = status ? status.toUpperCase() : type?.toUpperCase() || "OTHER";

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${bgColor} ${className}`}
    >
      {label}
    </span>
  );
}

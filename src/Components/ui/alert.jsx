import React from "react";

export default function Alert({ type = "info", message, onClose }) {
  const colors = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <div
      className={`flex justify-between items-center px-4 py-2 rounded-md ${colors[type]}`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 font-bold text-lg focus:outline-none"
        >
          &times;
        </button>
      )}
    </div>
  );
}

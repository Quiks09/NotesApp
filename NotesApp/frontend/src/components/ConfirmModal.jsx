import React from "react";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-[#33323280]"
      style={{ backdropFilter: "blur(2px)" }} 
    >
      <div className="bg-white rounded p-6 max-w-sm text-center shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

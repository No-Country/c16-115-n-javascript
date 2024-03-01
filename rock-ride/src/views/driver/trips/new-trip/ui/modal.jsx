import React from "react";

export const Modal = ({ isOpen, onClose, children }) => {
  const modalClasses = isOpen ? "flex" : "hidden";
  const contentClasses = "bg-[#f0f0f0] p-6 rounded shadow-md w-80 flex flex-col";

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 ${modalClasses} items-center justify-center`}
    >
      <div className={`${contentClasses}`}>
        <button
          className="p-1 bg-none text-black hover:bg-[#84ceff] rounded self-end"
          onClick={onClose}
        >
          <span className="text-2xl text-center font-semibold">x</span>
        </button>
        {children}
      </div>
    </div>
  );
};

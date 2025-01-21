import React from "react";

const CustomButton = ({ className, onClick, textContent, type }) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {textContent}
    </button>
  );
};

export default CustomButton;

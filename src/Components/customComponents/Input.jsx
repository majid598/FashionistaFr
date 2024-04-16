import React from "react";

const Input = ({ type, name, style, value, changeHandler, holder,maxLength }) => {
  return (
    <input
      type={type ? type : "text"}
      name={name}
      value={value}
      onChange={changeHandler}
      className={`${style} w-full p-2 rounded-sm bg-transparent border-2 border-white/30 outline-none hover:border-white/50 focus:border-white text-zinc-300`}
      placeholder={holder}
      maxLength={maxLength}
    />
  );
};

export default Input;

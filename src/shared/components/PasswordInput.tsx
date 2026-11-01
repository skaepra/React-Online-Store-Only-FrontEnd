import React, { useState, InputHTMLAttributes } from "react";
import { IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import BaseInput from "./BaseInput";

type PasswordInputProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  variant?: "default" | "soft";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange">;

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Enter your password",
  error,
  variant,
  ...rest
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <BaseInput
      {...rest}
      type={visible ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      variant={variant}
      icon={<IoLockClosedOutline size={20} />}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="flex items-center justify-center p-1 text-gray-400 transition-colors hover:text-gray-700 focus:outline-none dark:text-zinc-400 dark:hover:text-white"
          tabIndex={-1}
        >
          {visible ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
        </button>
      }
    />
  );
}
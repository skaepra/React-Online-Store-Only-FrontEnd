import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type CommonProps = {
  icon?: React.ReactNode;
  error?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  className?: string;
  variant?: "default" | "soft";
};

type InputModeProps = CommonProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    multiline?: false;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

type TextAreaModeProps = CommonProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
    multiline: true;
    rows?: number;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };

export type InputProps = InputModeProps | TextAreaModeProps;

export default function BaseInput(props: InputProps) {
  const {
    icon,
    error,
    rightElement,
    leftElement,
    multiline = false,
    className = "",
    variant = "default",
    onChange,
    ...rest
  } = props;

  const hasLeftContent = !!icon || !!leftElement;
  const hasRightContent = !!rightElement;

  const isSoft = variant === "soft";
  const autofillClasses = isSoft
    ? "[&&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#eef2f6_inset] [&&:-webkit-autofill]:[-webkit-text-fill-color:#111827] dark:[&&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#27272a_inset] dark:[&&:-webkit-autofill]:[-webkit-text-fill-color:white]"
    : "[&&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#f9fafb_inset] [&&:-webkit-autofill]:[-webkit-text-fill-color:#111827] dark:[&&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#27272a_inset] dark:[&&:-webkit-autofill]:[-webkit-text-fill-color:white]";

  return (
    <div className={`flex w-full flex-col ${isSoft ? "my-1.5" : "my-2"}`}>
      <div
        className={`relative flex flex-row items-center transition-colors ${
          isSoft
            ? `rounded-md border bg-[#eef2f6] dark:bg-zinc-800 ${
                error
                  ? "border-red-500"
                  : "border-transparent focus-within:border-indigo-300"
              }`
            : `rounded-lg border bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500 dark:bg-zinc-800 ${
                error ? "border-red-500" : "border-gray-200 dark:border-zinc-700"
              }`
        } ${multiline ? "h-auto min-h-[45px] !items-start" : isSoft ? "h-[48px]" : "h-[45px]"}`}
      >
        {icon && (
          <span
            className={`pointer-events-none absolute left-[15px] flex items-center justify-center text-gray-400 dark:text-zinc-400 ${
              multiline ? "top-[14px]" : ""
            }`}
          >
            {icon}
          </span>
        )}

        {leftElement && (
          <div
            className={`absolute left-[10px] z-10 flex items-center ${
              multiline ? "top-[12px]" : ""
            }`}
          >
            {leftElement}
          </div>
        )}

        {multiline ? (
          <textarea
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            onChange={
              onChange as React.ChangeEventHandler<HTMLTextAreaElement>
            }
            rows={(props as TextAreaModeProps).rows ?? 4}
            className={`w-full flex-1 resize-y border-none bg-transparent pb-3 pt-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0 dark:text-white dark:placeholder:text-zinc-500 ${autofillClasses} ${
              hasLeftContent ? "pl-[45px]" : "pl-4"
            } ${hasRightContent ? "pr-[45px]" : "pr-4"} ${className}`}
          />
        ) : (
          <input
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            onChange={
              onChange as React.ChangeEventHandler<HTMLInputElement>
            }
            className={`h-full w-full flex-1 border-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0 dark:text-white dark:placeholder:text-zinc-500 ${autofillClasses} ${
              hasLeftContent ? "pl-[45px]" : "pl-4"
            } ${hasRightContent ? "pr-[45px]" : "pr-4"} ${className}`}
          />
        )}

        {rightElement && (
          <div
            className={`absolute right-[10px] flex items-center ${
              multiline ? "top-[12px]" : ""
            }`}
          >
            {rightElement}
          </div>
        )}
      </div>

      {!!error && (
        <span className="ml-[4px] mt-1 text-xs font-medium text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}

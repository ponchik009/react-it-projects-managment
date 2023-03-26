import React from "react";

interface CheckboxProps {
  color: "#219653" | "#FF5B2E" | "rgba(210, 32, 67, 1)";
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  color,
  label,
  checked,
  onChange,
  id,
  disabled = false,
}) => {
  return (
    <label htmlFor={id} style={{ color }}>
      {label}
      <input
        type="checkbox"
        name={id}
        id={id}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
    </label>
  );
};

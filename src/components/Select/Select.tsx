import React from "react";

interface Option {
  name: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  id: string;
  required?: boolean;
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  id,
  required = false,
  label = "",
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <label
      htmlFor={id}
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "64px",
      }}
    >
      <div style={{ maxWidth: "96px" }}>
        {required && (
          <span style={{ color: "#FF5B2E", marginRight: 8 }}>*</span>
        )}
        <span>{label}</span>
      </div>
      <select
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        style={{ padding: "8px 16px", width: "512px" }}
        disabled={disabled}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
};

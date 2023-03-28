import React from "react";
import PhoneInput from "react-phone-input-2";

import "./Input.css";

interface InputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  label: string;
  placeholder?: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  color?: string;
  width?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  required = true,
  label,
  placeholder = "",
  id,
  type = "text",
  disabled = false,
  color = "rgba(0, 0, 0, 1)",
  width = "512px",
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
      <div style={{ maxWidth: "96px", display: "flex" }}>
        {required && (
          <span style={{ color: "#FF5B2E", marginRight: 8 }}>*</span>
        )}
        <span>{label}</span>
      </div>
      {type === "tel" ? (
        <PhoneInput
          country={"ru"}
          value={value as string}
          onChange={(phone) => onChange({ target: { value: phone } } as any)}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ padding: "8px 16px", width, color }}
          disabled={disabled}
        />
      )}
    </label>
  );
};

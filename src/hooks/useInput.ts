import React from "react";

export const useInput = <T>(initialValue: T) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (typeof value === "boolean") {
        setValue(!value as T);
        return;
      }
      setValue(e.target.value as T);
    },
    [setValue, value]
  );

  const reset = React.useCallback(() => {
    setValue(initialValue);
  }, [setValue]);

  return {
    hook: [value, onChange] as [
      T,
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {}
    ],
    reset,
  };
};

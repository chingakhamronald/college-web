"use client";

import { Input, InputProps } from "@nextui-org/input";
import { useField } from "formik";
import { FC } from "react";

interface InputFieldProps extends InputProps {
  label: string;
  name: string;
}

export const InputField: FC<InputFieldProps> = ({ label, ...props }) => {
  console.log({ props: props, label: label });

  const [field, meta] = useField(props.name);

  return (
    <div className="w-full">
      <Input
        variant="bordered"
        type="text"
        size="sm"
        label={label}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

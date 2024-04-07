import React from "react";
import { FormFieldProps } from "./FormComponent";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";

type InputFormComponentProps = {
  autoFocus: boolean;
  formField: FormFieldProps;
  handleChange: ({
    e: { target },
  }: {
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >;
  }) => void;
};

export const InputFormComponent = ({
  autoFocus,
  formField,
  handleChange,
}: InputFormComponentProps) => {
  const fieldProps = {
    required: true,
    id: formField.name,
    key: formField.name,
    autoFocus,
    type: formField.valueType,
    name: formField.name,
    placeholder: `type the ${formField.name}`,
    value: formField.value,
    className:
      "max-w-[20rem] max-h-[13rem] h-[2rem] my-[1rem] p-2 border-2 border-gray-300 rounded-md",
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => handleChange({ e }),
  };

  if (formField.type === "select" && fieldProps.value instanceof Object) {
    const { required, name, value, className } = fieldProps;
    return (
      <div>
        <select
          className={`${className} bg-gray-100 w-[7rem] h-[3rem] py-1`}
          id={name}
          onChange={(e) => handleChange({ e })}
          required={required}
          name={name}
        >
          {Object.entries(value.options).map(([key, { value, label }]) => (
            <option value={value as unknown as string} key={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  const labelName = fieldProps.key.replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className=" my-4">
      <Label htmlFor={fieldProps.key}>{labelName}</Label>
      {formField.type === "textarea" ? (
        <Textarea {...fieldProps} value={fieldProps.value as string} />
      ) : (
        <Input {...fieldProps} value={fieldProps.value as string} />
      )}
    </div>
  );
};

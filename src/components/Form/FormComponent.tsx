import { useEffect, useState } from "react";

import { InputFormComponent } from ".";
import { Button } from "../ui/button";

export type SelectOptionProps = {
  options: {
    value: number;
    label: string;
    selected: boolean;
    disabled: boolean;
  }[];
  selected: string | number;
};

export type FormFieldProps = {
  type: "input" | "textarea" | "select";
  valueType: "text" | "number" | "email" | "password";
  visible: "hidden" | "visible";
  name: string;
  value: string | number | SelectOptionProps;
};

type FormComponentProps<T> = {
  title: string;
  subtitle: string;
  buttonLabel?: string;
  formFields: FormFieldProps[];
  submitAction: (payload: T) => void;
  children?: React.ReactNode;
  className?: string;
  callback?: (data: T) => boolean | object;
};

export const FormComponent = <T,>({
  title,
  subtitle,
  submitAction,
  buttonLabel,
  formFields,
  children,
  className,
  callback,
}: FormComponentProps<T>) => {
  const [formState, setFormState] = useState<FormFieldProps[]>(formFields);

  useEffect(() => {
    setFormState(formFields);
  }, [formFields]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newPayload = formState.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.name as unknown as string]: curr.value,
      }),
      {} as T
    );

    if (callback) {
      const modifiedPayload = callback(newPayload);
      if (modifiedPayload === true) {
        return;
      }

      if (typeof modifiedPayload === "object") {
        newPayload = modifiedPayload as T;
      }
    }

    submitAction(newPayload);
  };

  const handleChange = ({
    e: { target },
  }: {
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >;
  }) => {
    if (target.type === "select-one") {

      const selected = Number(target.value);

      setFormState((prev) =>
        prev.map((field) =>
          field.name === target.name
            ? {
                ...field,
                value: { ...(field.value as SelectOptionProps), selected },
              }
            : field
        )
      );
    } else {
      setFormState((prev) =>
        prev.map((field) =>
          field.name === target.name ? { ...field, value: target.value } : field
        )
      );
    }
  };

  return (
    <form
      className={`flex flex-col flex-wrap justify-center items-center w-[95vw] md:w-[25rem] p-4 m-4 bg-gray-100 rounded-md ${
        className ?? ""
      }`}
      onSubmit={handleSubmit}
    >
      <h3>{title}</h3>
      <h5 className="text-center m-2 text-gray-500">{subtitle}</h5>
      <div className="m-2">
        {children ??
          formState.map(
            (field, index) =>
              field.visible !== "hidden" && (
                <InputFormComponent
                  key={field.name as unknown as string}
                  autoFocus={index === 0}
                  formField={field}
                  handleChange={handleChange}
                />
              )
          )}
      </div>

      {<Button type="submit">{buttonLabel ?? "Okay"}</Button>}
    </form>
  );
};

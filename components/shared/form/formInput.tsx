import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
  UseFormRegisterReturn,
} from "react-hook-form";

type FormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
  children: (
    field: ControllerRenderProps<TFieldValues, TName>
  ) => React.ReactNode;
  label: string;
  comment?: string;
  wrapperClassName?: string;
};

const FormInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  children,
  control,
  name,
  wrapperClassName,
  comment,
  label,
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={wrapperClassName}>
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          {comment ? <FormDescription>{comment}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;

import { FieldValues, UseFormProps, useForm, useFormContext } from "react-hook-form";

export function useFormHook(): [typeof useForm,  boolean] {
    const context = useFormContext();
    if (context) return [useFormContext, true];
    return [useForm, false];
}

export function useConditionalForm<T extends FieldValues>(props?: UseFormProps<T>) {
    const [formHook, inFormContext] = useFormHook();
    return [formHook<T>(props), inFormContext] as const;
}
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useConditionalForm } from '@src/hooks/useConditionalForm';
import React from 'react';
import { FieldValues, Path } from 'react-hook-form';
import * as yup from 'yup';

export interface SelectProps<T extends FieldValues> extends React.SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    options: Array<{ label: string; value: string | number }>;
    validationSchema?: yup.ObjectSchema<T>;
}

const Select = <T extends FieldValues>({
    validationSchema,
    options,
    ...rest
}: SelectProps<T>) => {
    const [{ register, formState }, inFormContext] = useConditionalForm<T>({
        ...(validationSchema && { resolver: yupResolver(validationSchema) })
    });

    if (inFormContext && validationSchema) {
        throw new Error("validationSchema can only be passed if not wrapped in Form component.");
    }

    return (
        <div className="form-item">
            <select {...register(rest.name as Path<T>)} {...rest}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ErrorMessage name={rest.name as any} errors={formState?.errors} />
        </div>
    );
};

export default Select;
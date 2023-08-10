import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useConditionalForm } from '@src/hooks/useConditionalForm';
import React, { useEffect } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import * as yup from 'yup';

export interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    validationSchema?: yup.ObjectSchema<T>;
}

const Input = <T extends FieldValues>({
    validationSchema,
    ...rest
}: InputProps<T>) => {
    const [{ register, formState }, inFormContext] = useConditionalForm<T>({
        ...(validationSchema && { resolver: yupResolver(validationSchema), mode: 'onChange' })
    });

    if (inFormContext && validationSchema) {
        throw new Error("validationSchema can only be pass if not wrapped in Form component.")
    }

    // useEffect(() => {
    //     if (!inFormContext && !formState.errors?.[rest.name]) {
    //         console.log('Submit');
    //     }
    // }, [inFormContext, formState.errors?.[rest.name]])

    return (
        <div className="form-item">
            <input {...rest} {...register(rest.name as Path<T>)} />
            <ErrorMessage name={rest.name as any} errors={formState?.errors} />
        </div>
    );
};

export default Input;
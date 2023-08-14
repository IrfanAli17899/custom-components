import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useConditionalForm } from '@src/hooks/useConditionalForm';
import React, { useEffect, useRef } from 'react';
import { FieldValues, Path, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

export interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    validationSchema?: yup.ObjectSchema<T>;
    onValueChange?: SubmitHandler<T>
}

const Input = <T extends FieldValues>({
    validationSchema,
    onValueChange,
    ...rest
}: InputProps<T>) => {
    const [{ register, formState, watch, handleSubmit }, inFormContext] = useConditionalForm<T>({
        ...(validationSchema && { resolver: yupResolver(validationSchema), mode: 'onChange' })
    });

    if (inFormContext && validationSchema) {
        throw new Error("validationSchema can only be pass if not wrapped in Form component.")
    }


    const watchedFields = watch();

    const prevWatchedFields = useRef(watchedFields);

    useEffect(() => {
        if (!inFormContext && onValueChange) {
            const fieldsChanged = Object.keys(watchedFields).some(field =>
                watchedFields[field] !== prevWatchedFields.current[field]
            );
            if (fieldsChanged) {
                prevWatchedFields.current = watchedFields;
                handleSubmit(onValueChange)();
            }
        }
    }, [inFormContext, watchedFields, handleSubmit, onValueChange]);

    return (
        <div className="form-item">
            <input {...rest} {...register(rest.name as Path<T>)} />
            <ErrorMessage name={rest.name as any} errors={formState?.errors} />
        </div>
    );
};

export default Input;
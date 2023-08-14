import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useConditionalForm } from '@src/hooks/useConditionalForm';
import React, { useEffect, useRef } from 'react';
import { FieldErrors, FieldValues, Mode, Path, SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

export interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    mode?: Mode
    validationSchema?: yup.ObjectSchema<T>;
    onValueChange?: (data: T | null, errors: FieldErrors<T> | null) => void
}

const Input = <T extends FieldValues>({
    validationSchema,
    onValueChange,
    ...rest
}: InputProps<T>) => {
    const [{ register, formState, watch, handleSubmit }, inFormContext] = useConditionalForm<T>({
        ...(validationSchema && { resolver: yupResolver(validationSchema), mode: rest.mode || 'onChange' })
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
                handleSubmit(onSubmit, onError)();
            }
        }
    }, [inFormContext, watchedFields, handleSubmit, onValueChange]);

    const onSubmit: SubmitHandler<T> = (data) => {
        onValueChange?.(data, null)
    }

    const onError: SubmitErrorHandler<T> = (errors) => {
        onValueChange?.(null, errors);
    }

    return (
        <div className="form-item">
            <input {...rest} {...register(rest.name as Path<T>)} />
            <ErrorMessage name={rest.name as any} errors={formState?.errors} />
        </div>
    );
};

export default Input;
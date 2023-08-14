import React, { ReactNode, useEffect, useRef } from 'react';
import { useForm, SubmitHandler, FieldValues, UseFormProps, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isEmpty } from '@src/utils/objectUtils';

export interface FormProps<T extends FieldValues> extends UseFormProps<T> {
    children: ReactNode;
    onSubmit: SubmitHandler<T>;
    validationSchema: yup.ObjectSchema<T>;
}


const Form = <T extends FieldValues>({
    children,
    onSubmit,
    validationSchema,
    ...rest
}: FormProps<T>) => {
    const methods = useForm<T>({
        resolver: yupResolver(validationSchema),
        ...rest,
    });

    const { handleSubmit, watch } = methods;

    const watchedFields = watch();

    const prevWatchedFields = useRef(watchedFields);

    useEffect(() => {
        if (rest.mode !== "onSubmit") {
            const fieldsChanged = Object.keys(watchedFields).some(field =>
                watchedFields[field] !== prevWatchedFields.current[field]
            );
            if (fieldsChanged) {
                prevWatchedFields.current = watchedFields;
                handleSubmit(onSubmit)();
            }
        }
    }, [rest.mode, watchedFields, handleSubmit, onSubmit]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>

    );
};

export default Form;

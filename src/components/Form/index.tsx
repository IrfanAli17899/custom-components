import React, { ReactNode } from 'react';
import { useForm, SubmitHandler, FieldValues, UseFormProps, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>

    );
};

export default Form;

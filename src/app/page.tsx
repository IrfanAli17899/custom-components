"use client"
import React, { useRef } from 'react';
import * as yup from 'yup';
import { SubmitHandler } from 'react-hook-form';
import Input from '@src/components/Input';
import Form from '@src/components/Form';
import Select from '@src/components/Select';
import Modal, { ModalHandle } from '@src/components/Modal';
// import DynamicComponent from '@src/components/DynamicComponent';

interface FormData {
  firstName: string;
  category: string;
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  category: yup.string().required('Category is required'),
});



const MyForm: React.FC = () => {
  const modalRef = useRef<ModalHandle>(null);

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  // return(
  //     <Input name='firstName' validationSchema={validationSchema} />
  // )

  return (
    <div>
      <Form onSubmit={onSubmit} mode='onChange' validationSchema={validationSchema}>
        <Input name='firstName' placeholder="First Name" />
        {/* <DynamicComponent
            tag="input"

          // name='firstName'
          
          // type='password'
          placeholder="First Name"

        /> */}
        <Select
          name='category'
          options={[
            { label: 'cloth', value: 'cloth' },
            { label: 'gadgets', value: 'gadgets' },
          ]}
        />
        <button type="submit">Submit</button>
      </Form>

      <div>
        <button onClick={handleOpenModal}>Open Modal</button>
        <Modal ref={modalRef}>
          <h2>Modal Content</h2>
          <p>This is the content of the modal.</p>
        </Modal>
      </div>

    </div>
  );
};

export default MyForm;
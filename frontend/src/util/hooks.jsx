import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onChange = ({ target: { name, value } }) =>
    setValues({
      ...values,
      [name]: value,
    });
  const onSubmit = (event) => {
    try {
      event.preventDefault();
      callback();
    } catch (err) {
      console.log(err);
    }
  };

  return { onChange, onSubmit, values };
};

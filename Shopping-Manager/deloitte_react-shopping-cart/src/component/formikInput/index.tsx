import React, { memo } from 'react';
import { FieldProps } from 'formik';

type Props<T> = {} & React.InputHTMLAttributes<HTMLInputElement> &
  FieldProps<any, T>;

const FormikInput = <T, undefined>({
  field,
  form: { touched, errors },
  id,
  ...props
}: Props<T>) => {
  console.log('formik input');
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {props.placeholder}
      </label>
      <input
        type="text"
        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        id={id}
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && (
        <p className="text-sm text-red-500 font-light">{errors[field.name]}</p>
      )}
    </div>
  );
};

export default memo(FormikInput);

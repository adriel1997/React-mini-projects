import React, { memo } from 'react';
import { FieldProps } from 'formik';

type Props<T> = {
  options: React.OptionHTMLAttributes<HTMLOptionElement>[];
} & React.InputHTMLAttributes<HTMLSelectElement> &
  FieldProps<any, T>;

const FormikSelect = <T, undefined>({
  field,
  form: { touched, errors },
  id,
  options,
  ...props
}: Props<T>) => {
  console.log('formik select');

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {props.placeholder}
      </label>
      <select
        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        {...field}
        {...props}
      >
        {options.map((x) => (
          <option key={`option_${x.value}`} value={x.value}>
            {x.children}
          </option>
        ))}
      </select>
      {touched[field.name] && errors[field.name] && (
        <p className="text-sm text-red-500 font-light">{errors[field.name]}</p>
      )}
    </div>
  );
};

export default memo(FormikSelect);

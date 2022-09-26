import { FastField, Form, Formik, FormikConfig, FormikValues } from 'formik';
import React, { PropsWithChildren } from 'react';

type Props<T, U> = {
  fields: U[];
  btnText: string;
} & FormikConfig<T> &
  PropsWithChildren;

const FomikForm = <
  T extends FormikValues,
  U extends {
    id: string;
  },
>({
  fields,
  btnText,
  children,
  ...props
}: Props<T, U>) => {
  return (
    <Formik {...props}>
      {({ isValid, dirty, isSubmitting, errors }) => {
        return (
          <Form className="mt-8 space-y-6">
            {!!errors.serverError && (
              <p className="text-2xl text-red-500 font-semibold text-center">
                {errors.serverError}
              </p>
            )}
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              {fields.map((x) => (
                <FastField key={x.id} {...x} />
              ))}
            </div>
            {children}
            <div>
              <button
                type="submit"
                disabled={isSubmitting || !(dirty && isValid)}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-wait disabled:hover:bg-slate-400"
              >
                {btnText}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FomikForm;

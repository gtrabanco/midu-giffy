import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import register from "services/register";

const initialValues = {
  username: "",
  password: "",
};

const validateFields = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Required username";
  } else if (values.username?.length < 5) {
    errors.username = "Username must have at least 5 characters";
  }

  if (!values.password) {
    errors.password = "Required password";
  } else if (values.password?.length <= 5) {
    errors.password = "Password length is less than 6";
  }
};

export default function Register() {
  const [registered, setRegistered] = useState(false);

  if (registered) {
    return <>
      <h2>You have been registered ✅</h2>
    </>;
  }

  const handleSubmit = (values, { setFieldError }) => {
    return register(values)
      .then(() => setRegistered(true))
      .catch(() => {
        setFieldError("username", "This username is not valid");
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validateFields}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, isSubmitting }) => (
          <Form className="form" onSubmit={handleSubmit}>
            <Field
              name="username"
              type="text"
              onChange={handleChange}
              placeholder="Username..."
            />
            <ErrorMessage
              className="form-error"
              name="username"
              component="small"
            />
            <Field
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password..."
            />
            <ErrorMessage
              className="form-error"
              name="password"
              component="small"
            />
            <button type="submit" className="btn" disabled={isSubmitting}>
              Registrarse
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

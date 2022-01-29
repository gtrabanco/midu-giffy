import React, { useState } from "react";
import { useForm, ErrorMessage } from "react-hook-form";

import registerService from "services/register";

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
  const { handleSubmit, register, errors } = useForm();
  const [registered, setRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values) => {
    setIsSubmitting(true);
    registerService(values).then(() => {
      setRegistered(true);
      setIsSubmitting(false);
    });
  };

  if (registered) {
    return (
      <>
        <h2>
          You have been registered{" "}
          <span role="img" aria-label="sucessfully">
            ✅
          </span>
        </h2>
      </>
    );
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username
          <input
            type="text"
            name="username"
            placeholder="Username..."
            ref={register({
              required: 'Username is required',
              minLength: {
                value: 4,
                message: "User must have at least 4 characters.",
              },
            })}
          />
        </label>
        <ErrorMessage errors={errors} name="username">
          {(error) => <small className="error">{error}</small>}
        </ErrorMessage>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Password..."
            ref={register({ required: 'You can not login without a password' })}
          />
        </label>
        <ErrorMessage errors={errors} name="password">
          {(error) => <small className="error">{error}</small>}
        </ErrorMessage>
        <button type="submit" className="btn" disabled={isSubmitting}>
          Register
        </button>
      </form>
    </>
  );
}

import React, { FC } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";

import { validationSchema, fields, initValues } from "./formHelpers";

import { ILoginShape } from "@containers/Auth/interfaces/AuthForm.interface";
import { FormProps } from "@shared/interfaces";
import { FormGenerator } from "@shared/components";
import { NameOfRoutes } from "@shared/constants";

const getRedirectLink = (email: string) => {
  const clippedEmail = email ? email.trim() : "";
  return `${NameOfRoutes.AUTH_FORGOT_PASSWORD}${clippedEmail ? `?email=${clippedEmail}` : ""}`;
};

const LoginForm: FC<FormProps<ILoginShape>> = (props) => {
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        props.submitHandler && props.submitHandler(values);
        setSubmitting(false);
      }}
      initialValues={initValues}
    >
      {(formikProps) => (
        <FormGenerator fields={fields}>
          <Flex justifyContent="space-between" alignItems="center">
            <Link to={getRedirectLink(formikProps.values.email)}>Forgot Password?</Link>
            <Button type="submit" isDisabled={props.loading || !validationSchema.isValidSync(formikProps.values)}>
              Log In
            </Button>
          </Flex>
        </FormGenerator>
      )}
    </Formik>
  );
};

export default LoginForm;

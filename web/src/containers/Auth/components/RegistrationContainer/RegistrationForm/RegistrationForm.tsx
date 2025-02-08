import React, { useState, FC } from "react";
import { Formik } from "formik";
import { Button } from "@chakra-ui/react";

import { validationSchema, fields, getInitValues } from "./formHelpers";

import { IRegistrationShape } from "@containers/Auth/interfaces/AuthForm.interface";
import { FormProps } from "@shared/interfaces";
import { FormGenerator } from "@shared/components";

const RegistrationForm: FC<FormProps<IRegistrationShape>> = (props) => {
  const [formValues] = useState(getInitValues(null));

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        props.submitHandler && props.submitHandler(values);
        setSubmitting(false);
      }}
      validateOnMount={true}
      validateOnChange={true}
      initialValues={formValues}
    >
      {(formikProps) => (
        <>
          <FormGenerator fields={fields}>
            <Button type="submit" isDisabled={props.loading || !validationSchema.isValidSync(formikProps.values)}>
              Sign Up
            </Button>
          </FormGenerator>
        </>
      )}
    </Formik>
  );
};

export default RegistrationForm;

import React, { FC } from "react";
import { Formik } from "formik";
import { Button } from "@chakra-ui/react";

import { validationSchema, fields, initValues } from "./formHelpers";

import { IChangePasswordShape } from "@containers/Auth/interfaces/AuthForm.interface";
import { FormProps } from "@shared/interfaces";
import { FormGenerator } from "@shared/components";

const ChangePasswordForm: FC<FormProps<IChangePasswordShape>> = (props) => {
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        props.submitHandler && props.submitHandler(values);
        setSubmitting(false);
      }}
      validateOnMount={true}
      validateOnChange={true}
      initialValues={initValues}
    >
      {(formikProps) => (
        <>
          <FormGenerator fields={fields}>
            <Button type="submit" isDisabled={props.loading || !validationSchema.isValidSync(formikProps.values)}>
              Set New Password
            </Button>
          </FormGenerator>
        </>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;

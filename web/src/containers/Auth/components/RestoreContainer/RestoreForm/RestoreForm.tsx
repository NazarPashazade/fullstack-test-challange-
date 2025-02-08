import React, { useState, FC } from "react";
import { Button, Text } from "@chakra-ui/react";
import { Formik } from "formik";

import { validationSchema, fields, getInitValues } from "./formHelpers";

import { IRestoreShape } from "@containers/Auth/interfaces/AuthForm.interface";
import { FormProps } from "@shared/interfaces";
import { FormGenerator } from "@shared/components";

export interface RestoreFormProps {
  email: string | null;
}

const RestoreForm: FC<FormProps<IRestoreShape> & RestoreFormProps> = (props) => {
  const { email } = props;

  const [formValues] = useState(getInitValues(email));

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        props.submitHandler && props.submitHandler(values);
        setSubmitting(false);
      }}
      initialValues={formValues}
    >
      {(formikProps) => (
        <>
          <Text>We’ll send you link to restore your password</Text>
          <FormGenerator fields={fields}>
            <Button type="submit" isDisabled={props.loading || !validationSchema.isValidSync(formikProps.values)}>
              Send
            </Button>
          </FormGenerator>
        </>
      )}
    </Formik>
  );
};

export default RestoreForm;

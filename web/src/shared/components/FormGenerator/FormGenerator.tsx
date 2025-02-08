import React, { Fragment } from "react";
import { Form, useFormikContext } from "formik";

import { RenderField } from "./components";

import { TFieldItem, IHandlers } from "@shared/components";

interface FormGeneratorProps extends IHandlers {
  fields: TFieldItem[];
  children?: React.ReactNode;
}

const FormGenerator = (props: FormGeneratorProps) => {
  const { fields, children } = props;
  const { handleSubmit } = useFormikContext();

  return (
    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <Fragment key={`form-generator-${field.name}-${field.type}-${index}`}>{RenderField({ field, index })}</Fragment>
      ))}
      {children}
    </Form>
  );
};

export default FormGenerator;

import * as Yup from "yup";

import { IRestoreShape } from "@containers/Auth/interfaces";
import { TFieldItem } from "@shared/components/FormGenerator";
import { FieldItemType } from "@shared/components/FormGenerator/interfaces";
import { FORM_ERROR_MESSAGES } from "@shared/constants";

export const validationSchema: Yup.Schema<IRestoreShape> = Yup.object().shape({
  email: Yup.string().email(FORM_ERROR_MESSAGES.EMAIL).required(FORM_ERROR_MESSAGES.REQUIRED),
});

export const fields: TFieldItem[] = [
  {
    type: FieldItemType.TEXT,
    name: "email",
    label: "Email",
  },
];

const initValues: IRestoreShape = {
  email: "",
};

export const getInitValues = (email: string | null) => {
  return email ? { email } : initValues;
};

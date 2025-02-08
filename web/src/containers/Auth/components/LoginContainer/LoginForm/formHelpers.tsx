import * as Yup from "yup";

import { ILoginShape } from "@containers/Auth/interfaces";
import { TFieldItem } from "@shared/components/FormGenerator";
import { FieldItemType } from "@shared/components/FormGenerator/interfaces";
import { FORM_ERROR_MESSAGES } from "@shared/constants";

export const validationSchema: Yup.Schema<ILoginShape> = Yup.object().shape({
  email: Yup.string().email(FORM_ERROR_MESSAGES.EMAIL).required(FORM_ERROR_MESSAGES.REQUIRED),
  password: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED),
});

export const fields: TFieldItem[] = [
  {
    type: FieldItemType.TEXT,
    name: "email",
    label: "Email",
  },
  {
    type: FieldItemType.PASSWORD,
    name: "password",
    label: "Password",
    isShowPasswordIcon: true,
  },
];

export const initValues: ILoginShape = {
  email: "",
  password: "",
};

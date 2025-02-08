import * as Yup from "yup";

import { IRegistrationShape } from "@containers/Auth/interfaces";
import { TFieldItem } from "@shared/components/FormGenerator";
import { FORM_ERROR_MESSAGES } from "@shared/constants";
import { User } from "@shared/models";
import { IS_EXIST_DIGIT, IS_EXIST_LOWERCASE, IS_EXIST_UPPERCASE } from "@shared/constants/regExMatches.constant";
import { FieldItemType, RenderTypes } from "@shared/components/FormGenerator/interfaces";

export const validationSchema: Yup.Schema<IRegistrationShape> = Yup.object().shape({
  first_name: Yup.string().max(35, `First Name ${FORM_ERROR_MESSAGES.LONG}`).required(FORM_ERROR_MESSAGES.REQUIRED),
  last_name: Yup.string().max(35, `Last Name ${FORM_ERROR_MESSAGES.LONG}`).required(FORM_ERROR_MESSAGES.REQUIRED),
  email: Yup.string().email(FORM_ERROR_MESSAGES.EMAIL).required(FORM_ERROR_MESSAGES.REQUIRED),
  password: Yup.string()
    .min(6, `Password ${FORM_ERROR_MESSAGES.SHORT}`)
    .matches(IS_EXIST_DIGIT, FORM_ERROR_MESSAGES.DIGIT)
    .matches(IS_EXIST_LOWERCASE, FORM_ERROR_MESSAGES.LOWERCASE)
    .matches(IS_EXIST_UPPERCASE, FORM_ERROR_MESSAGES.UPPERCASE)
    .required(FORM_ERROR_MESSAGES.REQUIRED),
  password_confirm: Yup.string()
    .required(FORM_ERROR_MESSAGES.REQUIRED)
    .oneOf([Yup.ref("password")], FORM_ERROR_MESSAGES.PASSWORDS_MATCH),
});

export const fields: TFieldItem[] = [
  {
    type: FieldItemType.RENDER,
    renderType: RenderTypes.FIELD_LIST_COLUMN,
    name: "name-line",
    fields: [
      {
        type: FieldItemType.TEXT,
        name: "first_name",
        label: "First Name",
      },
      {
        type: FieldItemType.TEXT,
        name: "last_name",
        label: "Last Name",
      },
    ],
  },
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
  {
    type: FieldItemType.PASSWORD,
    name: "password_confirm",
    label: "Confirm Password",
    isShowPasswordIcon: true,
  },
];

export const getInitValues = (user: Partial<User> | null): IRegistrationShape => ({
  email: user?.email || "",
  first_name: user?.first_name || "",
  last_name: user?.last_name || "",
  password: "",
  password_confirm: "",
});

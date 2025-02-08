import * as Yup from "yup";

import { IChangePasswordShape } from "@containers/Auth/interfaces";
import { TFieldItem } from "@shared/components/FormGenerator";
import { FORM_ERROR_MESSAGES } from "@shared/constants";
import { IS_EXIST_DIGIT, IS_EXIST_LOWERCASE, IS_EXIST_UPPERCASE } from "@shared/constants/regExMatches.constant";
import { FieldItemType } from "@shared/components/FormGenerator/interfaces";

export const validationSchema: Yup.Schema<IChangePasswordShape> = Yup.object().shape({
  password: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED),
  confirm_password: Yup.string()
    .required(FORM_ERROR_MESSAGES.REQUIRED)
    .min(6, `Password ${FORM_ERROR_MESSAGES.SHORT}`)
    .matches(IS_EXIST_DIGIT, FORM_ERROR_MESSAGES.DIGIT)
    .matches(IS_EXIST_LOWERCASE, FORM_ERROR_MESSAGES.LOWERCASE)
    .matches(IS_EXIST_UPPERCASE, FORM_ERROR_MESSAGES.UPPERCASE)
    .oneOf([Yup.ref("password")], FORM_ERROR_MESSAGES.PASSWORDS_MATCH),
});

export const fields: TFieldItem[] = [
  {
    type: FieldItemType.PASSWORD,
    name: "password",
    label: "Password",
    isShowPasswordIcon: true,
  },
  {
    type: FieldItemType.PASSWORD,
    name: "confirm_password",
    label: "Confirm Password",
    isShowPasswordIcon: true,
  },
];

export const initValues: IChangePasswordShape = {
  password: "",
  confirm_password: "",
};

import { FC } from "react";
import { FormikProps } from "formik";

import {
  CheckBoxFieldItem,
  NumberFieldItem,
  PasswordFieldItem,
  TextAreaFieldItem,
  TextFieldItem,
  RadioFieldItem,
  SelectFieldItem,
  RenderFieldType,
} from "../components";

import { AnyType, IOption } from "@shared/interfaces";

export type TFieldItem =
  | TextFieldItem
  | PasswordFieldItem
  | TextAreaFieldItem
  | RenderFieldType
  | NumberFieldItem
  | CheckBoxFieldItem
  | RadioFieldItem
  | SelectFieldItem;

export interface IThirdPartyHandler<T, K> {
  prepareOptionFunction?: (element: T) => IOption;
  getData: (params: K) => T;
  selectData: () => T;
}

export interface IHandlers {
  handlers?: {
    [key: string]: IThirdPartyHandler<AnyType, AnyType>;
  };
}

export interface IRenderField {
  name: string;
}

export type IGenerateRenderField<T> = FC<
  T & {
    formikProps: FormikProps<T>;
  }
>;

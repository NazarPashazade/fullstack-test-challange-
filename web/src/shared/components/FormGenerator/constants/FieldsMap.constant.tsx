import {
  GeneratePasswordField,
  GenerateTextField,
  GenerateTextAreaField,
  GenerateNumberField,
  GenerateCheckBoxField,
  GenerateRadioField,
  GenerateSelectField,
} from "../components/FormRender";
import { FieldItemType } from "../interfaces";

import { AnyType } from "@shared/interfaces";

export const FieldsMap = new Map<FieldItemType, AnyType>([
  [FieldItemType.TEXT, GenerateTextField],
  [FieldItemType.NUMBER, GenerateNumberField],
  [FieldItemType.TEXTAREA, GenerateTextAreaField],
  [FieldItemType.PASSWORD, GeneratePasswordField],
  [FieldItemType.CHECKBOX, GenerateCheckBoxField],
  [FieldItemType.RADIO, GenerateRadioField],
  [FieldItemType.SELECT, GenerateSelectField],
]);

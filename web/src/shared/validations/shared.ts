import * as Yup from "yup";

export const OptionValidation = Yup.object({
  value: Yup.string().required(),
  label: Yup.mixed().required(),
});

import React from "react";

import { RegistrationForm, AuthWrapper } from "../../components";
import { IRegistrationShape } from "../../interfaces";

import { useRegistrationMutation } from "@containers/Auth/api/auth.api";

const RegistrationContainer: React.FC = () => {
  const { mutate, isPending } = useRegistrationMutation();

  const handleSubmit = (values: IRegistrationShape) => mutate(values);

  return (
    <AuthWrapper title="Create Account">
      <RegistrationForm loading={isPending} submitHandler={handleSubmit} />
    </AuthWrapper>
  );
};

export default RegistrationContainer;

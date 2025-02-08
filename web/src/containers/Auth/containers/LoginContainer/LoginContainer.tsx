import React, { FC } from "react";

import { LoginForm, AuthWrapper } from "../../components";
import { ILoginShape } from "../../interfaces";

import { useLoginUserMutation } from "@containers/Auth/api/auth.api";
import { useAuthContext } from "@shared/providers";
import { useNavigate } from "react-router-dom";

const LoginContainer: FC = () => {
  const { onLogin } = useAuthContext();
  const { mutate, isPending } = useLoginUserMutation();
  const navigate = useNavigate();
  const handleSubmit = (values: ILoginShape) => {
    mutate(values, {
      onSuccess: ({ token }) => {
        navigate("/");
        onLogin(token);
      },
    });
  };

  return (
    <AuthWrapper title="Log In">
      <LoginForm loading={isPending} submitHandler={handleSubmit} />
    </AuthWrapper>
  );
};

export default LoginContainer;

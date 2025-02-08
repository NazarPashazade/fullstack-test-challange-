import { FC } from "react";
import { useParams } from "react-router";

import { ChangePasswordForm, AuthWrapper } from "../../components";
import { IChangePasswordShape } from "../../interfaces";

import { useChangePasswordMutation } from "@containers/Auth/api/auth.api";

const RestoreContainer: FC = () => {
  const { hash } = useParams();

  const { mutate, isPending } = useChangePasswordMutation();

  const handleSubmit = (values: IChangePasswordShape) => {
    if (hash) {
      mutate({
        hash,
        password: values.password,
      });
    }
  };

  return (
    <AuthWrapper title="New Password">
      <ChangePasswordForm loading={isPending} submitHandler={handleSubmit} />
    </AuthWrapper>
  );
};

export default RestoreContainer;

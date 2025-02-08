import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import { RestoreForm, AuthWrapper } from "../../components";
import { IRestoreShape } from "../../interfaces";

import { useForgotPasswordMutation } from "@containers/Auth/api/auth.api";
import { NameOfRoutes } from "@shared/constants";

const getEmailFromQuery = (string: string, field: string) => {
  return string.replace(`?${field}=`, "");
};

const RestoreContainer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = useMemo(() => {
    return getEmailFromQuery(location.search, "email");
  }, [location.search]);

  const { mutate, isPending } = useForgotPasswordMutation();

  const handleSubmit = (values: IRestoreShape) => mutate(values);

  return (
    <AuthWrapper title="Restore Password" backClick={() => navigate(NameOfRoutes.AUTH_LOGIN)}>
      <RestoreForm email={email} loading={isPending} submitHandler={handleSubmit} />
    </AuthWrapper>
  );
};

export default RestoreContainer;

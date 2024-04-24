// import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FormComponent, FormFieldProps } from "@/components/Form";
import { LoggedUserT, SignInDTO, SignInDTOT, UserT } from "@/models";
import { AppStore, useVerifyUser } from "@/store";
import { formTemplateProps as formTemplateProps } from "./constants";
import { notifierError, notifierSuccess } from "@/utils";

export const SignIn = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const { userExistsWithPassword } = useVerifyUser();
  const submitAction = AppStore(({ actions }) => actions.SIGN_IN);

  const initialState = {
    username: "",
    password: "",
  };

  const formFields: FormFieldProps[] = Object.entries(initialState).map(
    ([key, value]) => {
      const valueType = key === "password" ? "password" : "text";

      return {
        type: "input",
        valueType,
        visible: "visible",
        name: key,
        value: value,
      };
    }
  );

  const verifyData = ({username, password}: Pick<UserT, "username" | "password">) => {
    const errors = new SignInDTO({username, password} as unknown as SignInDTOT).validate();
    const isUserExists = userExistsWithPassword(username, password);

    if (errors.length) {
      notifierError(errors);
      return true;
    }

    if (!isUserExists) {
      notifierError(["User does not exists"]);
      return true;
    }

    notifierSuccess("User signed in");

    navigate("/");

    const { id } = isUserExists as LoggedUserT;
    return { user: { id, username } };
  };

  const { title, subtitle, buttonLabel } = formTemplateProps("Sign In");

  return (
    <div className="flex flex-col items-center justify-center align-middle h-[75dvh]">
      <FormComponent
        title={title}
        subtitle={subtitle}
        buttonLabel={buttonLabel}
        submitAction={submitAction}
        formFields={formFields}
        callback={(data) => verifyData(data as unknown as Pick<UserT, "username" | "password">)}
        className={className}
      />
      <div className="p-4">
        <p className="text-gray-500 underline">
          <Link id="redirect-link" to={`/signup`}>
            {`Go to Sign Up`}
          </Link>
        </p>
      </div>
    </div>
  );
};

// import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FormComponent, FormFieldProps } from "@/components/Form";
import { SignUpDTO, SignUpDTOT, UserT } from "@/models";
import { AppStore, useGetBiggestUserId, useVerifyUser } from "@/store";
import { formTemplateProps } from "./constants";
import { notifierError, notifierSuccess } from "@/store/ultils";

export const SignUp = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const { userNameExists } = useVerifyUser();
  const submitAction = AppStore(({ actions }) => actions.SIGN_UP);

  const initialState: UserT = {
    id: useGetBiggestUserId() + 1,
    name: "",
    email: "a@a.aa",
    username: "",
    password: "",
  };

  const formFields: FormFieldProps[] = Object.entries(initialState).map(
    ([key, value]) => {
      const valueType =
        key === "password" ? "password" : key === "email" ? "email" : "text";

      return {
        type: "input",
        valueType,
        visible: key === "id" ? "hidden" : "visible",
        name: key,
        value: value,
      };
    }
  );

  const verifyData = (data: UserT) => {
    const errors = new SignUpDTO(data as SignUpDTOT).validate();

    if (errors.length) {
      notifierError(errors);
      return true;
    }
    const isUserExists = userNameExists(data.username);

    if (isUserExists) {
      notifierError(["User already exists"]);
      return true;
    }

    notifierSuccess("User signed up");

    navigate("/signin");

    return {user: data};
  };

  const { title, subtitle, buttonLabel } = formTemplateProps("Sign Up");


  return (
    <div className="flex flex-col items-center justify-center align-middle h-[75dvh]">
      <FormComponent
        title={title}
        subtitle={subtitle}
        buttonLabel={buttonLabel}
        submitAction={submitAction}
        formFields={formFields}
        callback={(data) => verifyData(data as unknown as UserT)}
        className={className}
      />
      <div className="p-4">
        <p className="text-gray-500 underline">
          <Link id="redirect-link" to={`/signin`}>
            {`Go to Sign In`}
          </Link>
        </p>
      </div>
    </div>
  );
};

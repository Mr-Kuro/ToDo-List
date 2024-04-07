import { FormComponent, FormFieldProps } from "@/components/Form";
import {TodoDTO, TodoPropsT, TodoT } from "@/models";
import {
  AppStore,
  TIMING_OPT,
  useGetBiggestTodoId,
  useGetLoggedUser,
  useVerifyTodo,
} from "@/store";
import { convertDate, notifierError, notifierSuccess } from "@/store/ultils";

export const TodoCreate = () => {
  const submitAction = AppStore(({ actions }) => actions.ADD_TODO);
  const { todoExists } = useVerifyTodo();

  const initialState: Record<keyof TodoPropsT, string | number> = {
    id: useGetBiggestTodoId() + 1,
    userId: useGetLoggedUser().id,
    title: "",
    message: "",
    status: "pending",
    timing: 0,
    notifierIn: 0,
  };

  /* constante de campos do formulário -> 
    um array de objetos, cada um contendo as propriedades de um campo do formulário
  */
  const formFields: FormFieldProps[] = Object.entries(initialState).map(
    ([key, value]) => {
      const type =
        key === "notifierIn"
          ? "select"
          : key === "message"
          ? "textarea"
          : "input";

      const valueType =
        key === "timing" || key === "notifierIn" ? "number" : "text";

      const isVisible = key === "id" || key === "userId" || key === "status";

      return {
        type,
        valueType,
        visible: isVisible ? "hidden" : "visible",
        name: key,
        value: key === "notifierIn" ? TIMING_OPT : value,
      };
    }
  );
  const convertedTiming = (TodoPropsT: TodoPropsT): TodoT => {
    const { timing, notifierIn, ...rest } = TodoPropsT;
    const newDate = convertDate(
      (notifierIn.selected as number) * (timing as number)
    );

    return { timing: newDate.localeString, ...rest };
  };

  const verifyData = (data: TodoPropsT) => {
    const errors = new TodoDTO(data).validate();

    if (errors.length) {
      notifierError(errors);
      return true;
    }

    if (todoExists(data.title)) {
      notifierError(["Todo already exists"]);
      return true;
    }
    
    notifierSuccess("Todo created successfully");

    return {todo: convertedTiming(data)};
  };

  const templateTitle = "Create a new Todo Item";

  return (
    <div className="flex flex-col items-center justify-center align-middle h-[75dvh]">
      <FormComponent
        title={templateTitle}
        subtitle={`Please, fill the form`}
        buttonLabel={"Create"}
        formFields={formFields}
        callback={(data) => verifyData(data as unknown as TodoPropsT)}
        submitAction={submitAction}
      />
    </div>
  );
};

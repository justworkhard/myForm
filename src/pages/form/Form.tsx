import { FormInstance } from "./interface";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

interface FormProps {
  children: React.ReactNode;
  form: FormInstance;
}

function Form({ children, form }: FormProps) {
  // 绑定form
  const [formInstance] = useForm(form);

  const formContextValue: FormInstance = formInstance;
  const wrapperNode = (
    <FieldContext.Provider value={formContextValue}>
      {children}
    </FieldContext.Provider>
  );
  return <div>{wrapperNode}</div>;
}

export default Form;

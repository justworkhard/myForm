import React from "react";
import FieldContext from "./FieldContext";

import { defaultGetValueFromEvent } from "./utils";
import { FieldEntity, FieldProps, InternalFieldProps } from "./interface";

function Field({
  children,
  fieldContext,
  name,
  trigger = "onChange",
}: InternalFieldProps) {
  const [_, forceUpdata] = React.useState({});

  const { getFieldsValue, registerField, dispatch } = fieldContext;

  // getControl
  function getControlled(childProps: Record<string, any>) {
    const formValue = getFieldsValue();
    const mergedGetValueProps = {
      value: formValue[name],
    };
    const control: Record<string, any> = {
      ...childProps,
      ...mergedGetValueProps,
    };

    control[trigger] = (...args: any[]) => {
      let eventValue = defaultGetValueFromEvent("value", ...args);
      dispatch({
        type: "updateValue",
        namePath: name,
        value: eventValue,
      });
    };
    return control;
  }

  // forceUpData
  function onStoreChange() {
    console.log("forceUpdata", name);
    forceUpdata({});
  }

  // componentDidMount
  React.useEffect(() => {
    const fieldEntity: FieldEntity = {
      name,
      fieldContext,
      onStoreChange,
    };
    registerField(fieldEntity);
  }, []);

  const returnChildNode = React.cloneElement(
    children,
    getControlled(children.props)
  );
  return <React.Fragment>{returnChildNode}</React.Fragment>;
}
function WrapperField({ children, ...resetProps }: FieldProps) {
  const fieldContext = React.useContext(FieldContext);

  return (
    <Field fieldContext={fieldContext} {...resetProps}>
      {children}
    </Field>
  );
}

export default WrapperField;

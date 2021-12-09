import React from "react";
import Form from "./form";
import Field from "./form/Field";
import { Input, Select } from "antd";

export default function IndexPage() {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      name: "cxm",
    });
  }, []);

  return (
    <>
      <Form form={form}>
        <Field name="name">
          <Input />
        </Field>
        <Field name="age">
          <Input />
        </Field>
        <Field name="sex">
          <Select
            options={[
              {
                label: "男",
                value: "man",
              },
              {
                label: "女",
                value: "women",
              },
            ]}
          ></Select>
        </Field>
      </Form>
      <button
        onClick={() => {
          console.log(form.getFieldsValue());
        }}
      >
        点击
      </button>
    </>
  );
}

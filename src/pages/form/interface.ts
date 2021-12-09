import React from "react";

export type StoreValue = any;
export type Store = Record<string, any>;

interface UpdateAction {
  type: 'updateValue';
  namePath: string;
  value: StoreValue;
}

export type FieldEntities = FieldEntity[];
export type FieldEntity = {
  name: string;
  fieldContext: FormInstance;
  onStoreChange: () => void;
};

export interface FormInstance {
  getFieldsValue: () => Store;
  setFieldsValue: () => void;
  registerField: (entity: FieldEntity) => void;
  dispatch: (action: UpdateAction) => void;
}

export interface FieldProps {
  children: React.ReactElement,
  name:string,
  trigger?: "onChange"|string
}

export interface InternalFieldProps{
  children: React.ReactElement,
  fieldContext: FormInstance,
  name:string,
  trigger?: "onChange" | string
}
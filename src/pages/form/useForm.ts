import React from 'react'
import { Store, FieldEntities ,FormInstance} from './interface'

export function FormStore(){

  let store: Store = {}
  const fieldEntities: FieldEntities = []


  function getFieldsValue(){
    let result: Store = {}
    fieldEntities.forEach((field:any)=>{
       const name = field.name
       result[name] = store[name]?store[name]: undefined
    })
    return result
  }

  // 更新entity
  function notifyObservers(namePath:any){
    fieldEntities.forEach((entity:any)=>{
      if(entity.name === namePath){
        entity.onStoreChange()
      }
    })
  }
  function setFieldsValue(newValue: Store){
    fieldEntities.forEach((entity)=>{
      entity.onStoreChange()
    })
    return store = newValue
  }

  function registerField(entity:any){
    fieldEntities.push(entity);
  }
  function dispatch (action: any) {
    switch (action.type) {
      case 'updateValue': {
        const { namePath, value } = action;
        updateValue(namePath, value);
        break;
      }
      default:
      // Currently we don't have other action. Do nothing.
    }
  };

  function updateValue(namePath:any, value:any){
     store[namePath] = value
     notifyObservers(namePath)
  }

  function getForm(){
    return {
      getFieldsValue,
      setFieldsValue,
      registerField,
      dispatch
    }
  }

  return {
    getForm
  }
}
function useForm(form?: FormInstance): [FormInstance] {
  const formRef = React.useRef<any>();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      // Create a new FormStore if not provided
      const formStore: any = FormStore();

      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}

export default useForm;

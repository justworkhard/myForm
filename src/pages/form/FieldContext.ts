import React from 'react'
import {FormInstance} from './interface'

const warningFunc: any = () => {
  console.log(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
};
const context = React.createContext<FormInstance>({
  getFieldsValue: warningFunc,
  setFieldsValue: warningFunc,
  registerField: warningFunc,
  dispatch: warningFunc,
})

export default context
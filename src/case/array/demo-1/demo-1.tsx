import React from 'react'
import {
  FormItem,
  Editable,
  Input,
  Select,
  Radio,
  DatePicker,
  ArrayItems,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/antd'
import { createForm, Form } from '@formily/core'
import { FormProvider, createSchemaField, observer } from '@formily/react'
import Custom from './custom'
import { delay } from 'lodash'

const item = {name: "2323", position: 1, type: 3};

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    DatePicker,
    Space,
    Radio,
    Input,
    Select,
    ArrayItems,
    Custom,
  },
})

const form = createForm();

const schema = {
    type: 'object',
    properties: {
      container: {
        type: 'void',
        'x-component': 'Custom',
      },
    },
}

// delay(()=>{
//   form.setValues({array: [item]});
//   form.setValuesIn('array.0.container.array.0', item);
//   // form.setValuesIn('array.0.container.array.0.container.array.0', item);
// }, 1000);

export default observer(() => {

  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
});

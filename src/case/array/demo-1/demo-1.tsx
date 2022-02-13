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

const data = {"array":[{"container":{"array":[{"name":"1-1","position":2,"type":3,"container":{"array":[{"name":"1-1-1","position":1,"type":3},{"name":"1-1-2","position":2,"type":3}]}}]},"position":2,"type":6,"name":"1"},{"container":{"array":[{"name":"2-1","position":2,"type":3,"container":{"array":[{"name":"2-2-1","position":2,"type":3},{"name":"2-2-2","position":1,"type":3}]}}]},"position":2,"type":5,"name":"2"}]};

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

delay(()=>{
  // form.setValues({array: [item]});
  // form.setValuesIn('array.0.container.array.0', item);
  // form.setValuesIn('array.0.container.array.0.container.array.0', item);

  form.setValues(data);
}, 2000);

export default observer(() => {

  const onSubmit = (data) => {
    console.log(data, JSON.stringify(data));
  }

  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
});

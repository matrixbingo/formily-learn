import React from 'react';
import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { Form, FormButtonGroup, FormItem, Input, Select, Submit } from '@formily/antd';

const form = createForm();

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
  },
});

const schema = {
  type: 'object',
  properties: {
    select: {
      type: 'string',
      title: '控制者',
      default: 'visible',
      enum: [
        { label: '显示', value: 'visible' },
        { label: '隐藏', value: 'none' },
        { label: '隐藏-保留值', value: 'hidden' },
      ],
      'x-component': 'Select',
      'x-decorator': 'FormItem',
      'x-reactions': {
        target: 'input',
        fulfill: {
          state: {
            display: '{{$self.value}}',
          },
        },
      },
    },
    input: {
      type: 'string',
      title: '受控者',
      'x-component': 'Input',
      'x-decorator': 'FormItem',
    },
  },
};

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </FormProvider>
);

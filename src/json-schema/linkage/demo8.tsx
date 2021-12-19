import React from 'react';
import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';

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
      default: false,
      enum: [
        { label: '显示', value: true },
        { label: '隐藏', value: false },
      ],
      'x-component': 'Select',
      'x-decorator': 'FormItem',
      'x-reactions': {
        target: 'input1',
        fulfill: {
          state: {
            visible: '{{!!$self.value}}',
          },
        },
      },
    },
    input1: {
      type: 'string',
      title: '受控者',
      default: true,
      enum: [
        { label: '显示', value: true },
        { label: '隐藏', value: false },
      ],
      'x-component': 'Select',
      'x-decorator': 'FormItem',
      'x-reactions': {
        target: 'input2',
        fulfill: {
          state: {
            visible: '{{!!$self.value}}',
          },
        },
      },
    },
    input2: {
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
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </FormProvider>
);

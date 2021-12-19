import React from 'react';
import { Transfer, FormItem, FormButtonGroup, Submit } from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
  components: {
    Transfer,
    FormItem,
  },
});

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    transfer: {
      type: 'array',
      title: '穿梭框',
      'x-decorator': 'FormItem',
      'x-component': 'Transfer',
      enum: [
        { title: '选项1', key: 1 },
        { title: '选项2', key: 2 },
      ],
      'x-component-props': {
        render: '{{renderTitle}}',
      },
    },
  },
};

const renderTitle = (item) => item.title;

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} scope={{ renderTitle }} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);

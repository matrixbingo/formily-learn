import React from 'react';
import { TimePicker, FormItem, FormButtonGroup, Submit } from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
  components: {
    TimePicker,
    FormItem,
  },
});

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    time: {
      title: '时间',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
      type: 'string',
    },
    '[startTime,endTime]': {
      title: '时间范围',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker.RangePicker',
      type: 'string',
    },
    betweenTime: {
      title: '时间范围',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker.RangePicker',
      type: 'string',
    },
  },
};

export default () => (
  <FormProvider form={form}>
    <SchemaField schema={schema} />
    <FormButtonGroup>
      <Submit onSubmit={console.log}>提交</Submit>
    </FormButtonGroup>
  </FormProvider>
);

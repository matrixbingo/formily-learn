import React from 'react';
import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { Form, FormButtonGroup, FormItem, Input, Select, Submit } from '@formily/antd';

const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      window.console.log('field---------------->', field);
      form.setFieldState('input', (state) => {
        window.console.log('state---------------->', field);
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
        state.display = field.value;
      });
    });
  },
});

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

import React from 'react';
import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { Form, FormItem, Input, Select } from '@formily/antd';

const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('input1', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
        state.visible = !!field.value;
      });
    });
    onFieldValueChange('input1', (field) => {
      form.setFieldState('input2', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
        state.visible = !!field.value;
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
      default: false,
      enum: [
        { label: '显示', value: true },
        { label: '隐藏', value: false },
      ],
      'x-component': 'Select',
      'x-decorator': 'FormItem',
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

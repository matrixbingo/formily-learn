import React from 'react';
import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { Form, FormItem, Input, NumberPicker } from '@formily/antd';

const form = createForm({
  effects() {
    onFieldValueChange('dim_1', (field) => {
      const dim1 = field.value;
      const dim2 = field.query('dim_2').value();
      form.setFieldState('result', (state) => {
        state.value = dim1 * dim2;
      });
    });
    onFieldValueChange('dim_2', (field) => {
      const dim1 = field.query('dim_1').value();
      const dim2 = field.value || 0;
      form.setFieldState('result', (state) => {
        state.value = dim1 * dim2;
      });
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    NumberPicker,
  },
});

const schema = {
  type: 'object',
  properties: {
    dim_1: {
      type: 'number',
      title: '控制者',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
    },
    dim_2: {
      type: 'number',
      title: '控制者',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
    },
    result: {
      type: 'number',
      title: '控制者',
      'x-pattern': 'readPretty',
      'x-component': 'NumberPicker',
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

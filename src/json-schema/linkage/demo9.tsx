import React from 'react';
import { createForm, onFieldInputValueChange } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { Form, FormItem, NumberPicker } from '@formily/antd';

const form = createForm({
  effects() {
    onFieldInputValueChange('total', (field) => {
      if (field.value === undefined) return;
      form.setFieldState('count', (state) => {
        const price = form.values.price;
        if (!price) return;
        state.value = field.value / price;
      });
      form.setFieldState('price', (state) => {
        const count = form.values.count;
        if (!count) return;
        state.value = field.value / count;
      });
    });
    onFieldInputValueChange('price', (field) => {
      form.setFieldState('total', (state) => {
        const count = form.values.count;
        if (count === undefined) return;
        state.value = field.value * count;
      });
    });
    onFieldInputValueChange('count', (field) => {
      form.setFieldState('total', (state) => {
        const price = form.values.price;
        if (price === undefined) return;
        state.value = field.value * price;
      });
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    NumberPicker,
  },
});

const schema = {
  type: 'object',
  properties: {
    total: {
      type: 'number',
      title: '总价',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
    },
    count: {
      type: 'number',
      title: '数量',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
    },
    price: {
      type: 'number',
      title: '单价',
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

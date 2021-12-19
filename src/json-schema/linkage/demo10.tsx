import React from 'react';
import { createForm, onFieldInputValueChange } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { Form, FormItem, NumberPicker } from '@formily/antd';

const form = createForm();

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
      'x-reactions': [
        {
          target: 'count',
          effects: ['onFieldInputValueChange'],
          dependencies: ['price'],
          fulfill: {
            state: {
              value: '{{ $deps[0] ? $self.value / $deps[0] : $target.value }}',
            },
          },
        },
        {
          target: 'price',
          effects: ['onFieldInputValueChange'],
          dependencies: ['count'],
          fulfill: {
            state: {
              value: '{{ $deps[0] ? $self.value / $deps[0] : $target.value }}',
            },
          },
        },
      ],
    },
    count: {
      type: 'number',
      title: '数量',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
      'x-reactions': {
        target: 'total',
        effects: ['onFieldInputValueChange'],
        dependencies: ['price'],
        fulfill: {
          state: {
            value: '{{ $deps[0] !== undefined ? $self.value * $deps[0] : $target.value }}',
          },
        },
      },
    },
    price: {
      type: 'number',
      title: '单价',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
      'x-reactions': {
        target: 'total',
        effects: ['onFieldInputValueChange'],
        dependencies: ['count'],
        fulfill: {
          state: {
            value: '{{$deps[0] !== undefined ? $self.value * $deps[0] : $target.value}}',
          },
        },
      },
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

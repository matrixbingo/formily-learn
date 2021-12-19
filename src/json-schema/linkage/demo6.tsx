import React from 'react';
import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer, FormProvider } from '@formily/react';
import { Form, FormItem, Input, NumberPicker } from '@formily/antd';

const form = createForm();

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
      'x-reactions': {
        dependencies: ['dim_2'],
        target: 'result',
        fulfill: {
          state: {
            value: '{{ $self.value * $deps[0] }}',
          },
        },
      },
    },
    dim_2: {
      type: 'number',
      title: '控制者',
      'x-component': 'NumberPicker',
      'x-decorator': 'FormItem',
      'x-reactions': {
        dependencies: ['dim_1'],
        target: 'result',
        fulfill: {
          state: {
            value: '{{ $self.value * $deps[0] }}',
          },
        },
      },
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

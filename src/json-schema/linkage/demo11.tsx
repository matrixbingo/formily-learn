import React from 'react';
import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input } from '@formily/antd';
import './input.less';

const form = createForm({
  effects() {
    onFieldValueChange('color', (field) => {
      field.setComponentProps({
        style: {
          backgroundColor: field.value,
        },
      });
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});

export default () => (
  <Form form={form}>
    <SchemaField>
      <SchemaField.Number
        name="color"
        default="#FFFFFF"
        title="颜色"
        x-component="Input"
        x-decorator="FormItem"
      />
    </SchemaField>
    <FormConsumer>
      {() => (
        <code>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </code>
      )}
    </FormConsumer>
  </Form>
);

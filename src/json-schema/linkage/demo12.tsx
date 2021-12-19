import React from 'react';
import { createForm } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import { Form, FormItem, Input } from '@formily/antd';
import './input.less';

const form = createForm();

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
        x-reactions={{
          target: 'color',
          fulfill: {
            state: {
              'component[1].style.backgroundColor': '{{$self.value}}',
            },
            //以下用法也可以
            // schema: {
            //   'x-component-props.style.backgroundColor': '{{$self.value}}',
            // },
          },
        }}
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

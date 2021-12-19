import React from 'react';
import { PreviewText, FormItem, FormLayout, FormButtonGroup } from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, mapReadPretty, connect, createSchemaField } from '@formily/react';
import { Button, Input as AntdInput } from 'antd';
import 'antd/dist/antd.css';

const Input = connect(AntdInput, mapReadPretty(PreviewText.Input));

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    PreviewText,
  },
});

const form = createForm();

const phoneForm = createForm({
  validateFirst: true,
});

const phoneSchema = {
  type: 'object',
  properties: {
    input: {
      type: 'string',
      title: '文本预览',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      default: 'Hello world',
    },
    select: {
      type: 'string',
      title: '选择项预览',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.Select',
      'x-component-props': {
        mode: 'multiple',
      },
      default: ['123'],
      enum: [
        { label: 'A111', value: '123' },
        { label: 'A222', value: '222' },
      ],
    },
    datePicker: {
      type: 'string',
      title: '日期预览',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.DatePicker',
    },
    cascader: {
      type: 'string',
      title: 'Cascader预览',
      'x-decorator': 'FormItem',
      'x-component': 'PreviewText.Cascader',
      default: ['hangzhou', 'yuhang'],
      enum: [
        {
          label: '杭州',
          value: 'hangzhou',
        },
        {
          label: '余杭',
          value: 'yuhang',
        },
      ],
    },
  },
};

export default () => {
  return (
    <PreviewText.Placeholder value="暂无数据">
      <FormLayout labelCol={6} wrapperCol={10}>
        <FormProvider form={form}>
          <SchemaField schema={phoneSchema} />
          <FormButtonGroup.FormItem>
            <Button
              onClick={() => {
                form.setState((state) => {
                  state.editable = !state.editable;
                });
              }}
            >
              切换阅读态
            </Button>
          </FormButtonGroup.FormItem>
        </FormProvider>
      </FormLayout>
    </PreviewText.Placeholder>
  );
};

import React from 'react';
import {
  FormItem,
  Editable,
  Input,
  Select,
  Radio,
  DatePicker,
  ArrayItems,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    DatePicker,
    Space,
    Radio,
    Input,
    Select,
    ArrayItems,
  },
});

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    string_array: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: '字符串数组',
      items: {
        type: 'void',
        'x-component': 'Space',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },
          input: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
    array: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: '对象数组',
      items: {
        type: 'object',
        properties: {
          space: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              sort: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.SortHandle',
              },
              date: {
                type: 'string',
                title: '日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker.RangePicker',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                },
              },
              input: {
                type: 'string',
                title: '输入框',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              select: {
                type: 'string',
                title: '下拉框',
                enum: [
                  { label: '选项1', value: 1 },
                  { label: '选项2', value: 2 },
                ],
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                },
              },
              remove: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Remove',
              },
              operations: {
                type: 'void',
                'x-component': 'FormItem',
                properties: {
                  moveDown: {
                    type: 'void',
                    'x-component': 'ArrayItems.MoveDown',
                  },
                  moveUp: {
                    type: 'void',
                    'x-component': 'ArrayItems.MoveUp',
                  },
                },
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
    array2: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      'x-component-props': { style: { width: 600 } },
      title: '对象数组',
      items: {
        type: 'object',
        'x-decorator': 'ArrayItems.Item',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },

          input: {
            type: 'string',
            title: '输入框',
            'x-decorator': 'Editable',
            'x-component': 'Input',
            'x-component-props': {
              bordered: false,
            },
          },
          config: {
            type: 'object',
            title: '配置复杂数据',
            'x-component': 'Editable.Popover',
            'x-reactions':
              '{{(field)=>field.title = field.value && field.value.input || field.title}}',
            properties: {
              date: {
                type: 'string',
                title: '日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker.RangePicker',
                'x-component-props': {
                  style: {
                    width: 200,
                  },
                },
              },
              input: {
                type: 'string',
                title: '输入框',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              select: {
                type: 'string',
                title: '下拉框',
                enum: [
                  { label: '选项1', value: 1 },
                  { label: '选项2', value: 2 },
                ],
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                },
              },
            },
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
};

export default () => {

  const onSubmit = (data) => {
    form.validate();
    window.console.log('form---------------->', form);
    window.console.log('form.values---------------->', form.values);
    window.console.log('data---------------->', data);
  }

  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  );
};

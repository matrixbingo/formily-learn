import React from 'react';
import {
  FormItem,
  Input,
  ArrayItems,
  Editable,
  FormButtonGroup,
  Submit,
  Space,
} from '@formily/antd';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
  components: {
    Space,
    Editable,
    FormItem,
    Input,
    ArrayItems,
  },
  scope: {
    checkDeps(dep: string) {
      window.console.log('---------------->', dep);
      return dep !== '123';
    },
  },
});

const form = createForm();

const checkDeps = (dep) => {
  window.console.log('---------------->', dep);
  return dep !== '123';
};

const schema = {
  type: 'object',
  properties: {
    array: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      maxItems: 3,
      title: '对象数组',
      'x-component-props': { style: { width: 300 } },
      items: {
        type: 'object',
        'x-decorator': 'ArrayItems.Item',
        // 'x-component-props': {
        //   type: 'card',
        // },
        properties: {
          left: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              sort: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.SortHandle',
              },
              index: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Index',
              },
            },
          },
          edit: {
            type: 'void',
            'x-component': 'Editable.Popover',
            title: '配置数据',
            properties: {
              aa: {
                type: 'string',
                'x-decorator': 'FormItem',
                title: 'AA',
                required: true,
                'x-component': 'Input',
                description: '输入123',
              },
              bb: {
                type: 'string',
                title: 'BB',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-reactions': [
                  {
                    dependencies: ['.aa'],
                    when: '{{ checkDeps($deps[0]) }}',
                    fulfill: {
                      schema: {
                        title: 'BB',
                        'x-disabled': true,
                      },
                    },
                    otherwise: {
                      schema: {
                        title: 'Changed',
                        'x-disabled': false,
                      },
                    },
                  },
                ],
              },
            },
          },
          right: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              remove: {
                type: 'void',
                'x-component': 'ArrayItems.Remove',
              },
              moveUp: {
                type: 'void',
                'x-component': 'ArrayItems.MoveUp',
              },
              moveDown: {
                type: 'void',
                'x-component': 'ArrayItems.MoveDown',
              },
            },
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
};

export default () => {
  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  );
};

import React from 'react'
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
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, observer, useField, useForm, RecursionField } from '@formily/react'

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
})

export const schemaClild = {
  type: 'object',
  properties: {
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
              position: {
                type: 'string',
                title: '下拉框1',
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
              type: {
                type: 'string',
                title: '下拉框2',
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
                'x-reactions': [
                  {
                    dependencies: ['.position'],
                    when: "{{$deps[0] == '1'}}",
                    fulfill: {
                      schema: {
                        enum: [
                          { label: '选项3', value: 3 },
                          { label: '选项4', value: 4 },
                        ],
                      },
                    },
                  },
                  {
                    dependencies: ['.position'],
                    when: "{{$deps[0] == '2'}}",
                    fulfill: {
                      schema: {
                        enum: [
                          { label: '选项5', value: 5 },
                          { label: '选项6', value: 6 },
                        ],
                      },
                    },
                  }
                ]
              },
              name: {
                type: 'string',
                title: '输入框',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              right: {
                type: 'void',
                'x-component': 'Space',
                properties: {
                  remove: {
                    type: 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.Remove',
                  },
                  add: {
                    type: 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.Addition',
                    'x-component-props': {
                      style: {
                        width: 40,
                      },
                    },
                  },
                  edit: {
                    type: 'void',
                    'x-component': 'Editable.Popover',
                    title: '配置数据',
                    properties: {
                      add: {
                        type: 'void',
                        title: '兄弟节点',
                        'x-decorator': 'FormItem',
                        'x-component': 'ArrayItems.Addition',
                        'x-component-props': {
                          style: {
                            width: 40,
                          },
                        },
                      },
                      add1: {
                        type: 'void',
                        title: '子节点',
                        'x-decorator': 'FormItem',
                        'x-component': 'ArrayItems.Addition',
                        'x-component-props': {
                          style: {
                            width: 40,
                          },
                        },
                      },
                    },
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
  },
}

const CustomChild = observer(() => {
  const field = useField()
  const form = useForm()
  return (
    <RecursionField
      basePath={field.address}
      schema={schemaClild}
      onlyRenderProperties
    />
  )
})

export default CustomChild;

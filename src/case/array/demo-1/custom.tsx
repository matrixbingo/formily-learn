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
  Form
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField, observer, useField, useForm, RecursionField } from '@formily/react'
import CustomChild, { schemaClild } from './custom-child'
import { createClild, createRight } from './util'
import ArrayAddBtn from './array-add-btn'
import ArrayAddBtn2 from './array-add-btn2'

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
    CustomChild,
    ArrayAddBtn,
    ArrayAddBtn2
  },
})

const schema = {
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
          layout: {
            type: 'void',
            'x-component': 'FormLayout',
            'x-component-props': {
              labelCol: 6,
              wrapperCol: 10,
              layout: 'vertical',
            },
            properties: {
              space: {
                type: 'void',
                'x-component': 'Space',
                properties: {
                  position: {
                    type: 'string',
                    title: '下拉框0',
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
                    title: '输入框1',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                  },
                  right:createRight(1),
                },
              },
              container: createClild(),
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

const Custom = observer(() => {
  const field = useField()
  const form = useForm()
  return (
    <Form form={form} labelCol={5} wrapperCol={16} onAutoSubmit={console.log}>
    <SchemaField schema={schema} />
  </Form>

    // <RecursionField
    //   SchemaField={SchemaField}
    //   basePath={field.address}
    //   schema={schema}
    //   onlyRenderProperties
    // />
  )
})

export default Custom;

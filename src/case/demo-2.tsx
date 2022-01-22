import React, { useMemo, useState, useEffect } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, RecursionField, useForm, useField, observer } from '@formily/react'
import { Form, FormButtonGroup, FormItem, Input, Select, Submit, FormLayout, Cascader, FormGrid, ArrayItems, Editable, ArrayTable} from '@formily/antd'

const DYNAMIC_INJECT_SCHEMA = {
  type_1: {
    type: 'void',
    properties: {
      array: {
        type: 'array',
        'x-decorator': 'FormItem',
        'x-component': 'ArrayTable',
        'x-component-props': {
          pagination: { pageSize: 10 },
          scroll: { x: '100%' },
        },
        items: {
          type: 'object',
          properties: {
            column1: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { width: 50, title: 'Sort', align: 'center' },
              properties: {
                sort: {
                  type: 'void',
                  'x-component': 'ArrayTable.SortHandle',
                },
              },
            },
            column2: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { width: 80, title: 'Index', align: 'center' },
              properties: {
                index: {
                  type: 'void',
                  'x-component': 'ArrayTable.Index',
                },
              },
            },
            column3: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { width: 200, title: 'A1' },
              properties: {
                a1: {
                  type: 'string',
                  'x-decorator': 'Editable',
                  'x-component': 'Input',
                },
              },
            },
            column4: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { width: 200, title: 'A2' },
              properties: {
                a2: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            column5: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { width: 200, title: 'A3' },
              properties: {
                a3: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            column6: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Operations',
                dataIndex: 'operations',
                width: 100,
                fixed: 'right',
              },
              properties: {
                item: {
                  type: 'void',
                  'x-component': 'FormItem',
                  properties: {
                    remove: {
                      type: 'void',
                      'x-component': 'ArrayTable.Remove',
                    },
                    moveDown: {
                      type: 'void',
                      'x-component': 'ArrayTable.MoveDown',
                    },
                    moveUp: {
                      type: 'void',
                      'x-component': 'ArrayTable.MoveUp',
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
            'x-component': 'ArrayTable.Addition',
            title: '添加条目',
          },
        },
      },
    },
  },
  type_2: {
    type: 'void',
    properties: {
      array: {
        type: 'array',
        'x-decorator': 'FormItem',
        'x-component': 'ArrayTable',
        'x-component-props': {
          pagination: { pageSize: 10 },
          scroll: { x: '100%' },
        },
        items: {
          type: 'object',
          properties: {
            column1: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { width: 50, title: 'Sort', align: 'center' },
              properties: {
                sort: {
                  type: 'void',
                  'x-component': 'ArrayTable.SortHandle',
                },
              },
            },
            column2: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { width: 80, title: 'Index', align: 'center' },
              properties: {
                index: {
                  type: 'void',
                  'x-component': 'ArrayTable.Index',
                },
              },
            },
            column4: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { width: 200, title: 'A2' },
              properties: {
                a2: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            column5: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { width: 200, title: 'A3' },
              properties: {
                a3: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            column6: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': {
                title: 'Operations',
                dataIndex: 'operations',
                width: 100,
                fixed: 'right',
              },
              properties: {
                item: {
                  type: 'void',
                  'x-component': 'FormItem',
                  properties: {
                    remove: {
                      type: 'void',
                      'x-component': 'ArrayTable.Remove',
                    },
                    moveDown: {
                      type: 'void',
                      'x-component': 'ArrayTable.MoveDown',
                    },
                    moveUp: {
                      type: 'void',
                      'x-component': 'ArrayTable.MoveUp',
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
            'x-component': 'ArrayTable.Addition',
            title: '添加条目',
          },
        },
      },
    },
  },
}

const Custom = observer(() => {
  const field = useField()
  const form = useForm()
  const [schema, setSchema] = useState({})

  useEffect(() => {
    form.clearFormGraph(`${field.address}.*`) //回收字段模型
    form.deleteValuesIn(field.path) //清空字段值
    //可以异步获取
    setSchema(DYNAMIC_INJECT_SCHEMA[form.values.type])
  }, [form.values.type])

  return (
    <RecursionField
      basePath={field.address}
      schema={schema}
      onlyRenderProperties
    />
  )
})

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
    Custom,
    FormGrid,
    FormLayout,
    Cascader,
    ArrayItems,
    Editable,
    ArrayTable,
  },
})

export default observer(() => {
  const form = useMemo(() => createForm(), [])
  const schema = {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        title: '用户名',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      type: {
        type: 'string',
        title: '类型',
        enum: [
          { label: '类型1', value: 'type_1' },
          { label: '类型2', value: 'type_2' },
        ],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
      container: {
        type: 'void',
        'x-component': 'Custom',
      },
    },
  }

  const onSubmit = (data) => {
    form.validate();
    window.console.log('data---------------->', data);
  }

  return (
    <Form form={form} layout="vertical">
      <SchemaField schema={schema} />
      <FormButtonGroup.FormItem>
        <Submit block size="large" onSubmit={onSubmit}>
          提交
        </Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
})

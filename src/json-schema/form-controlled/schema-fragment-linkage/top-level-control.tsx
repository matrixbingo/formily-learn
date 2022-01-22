import React, { useMemo, useRef } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, observer } from '@formily/react'
import { Form, FormItem, Input, Select } from '@formily/antd'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
  },
})

const DYNAMIC_INJECT_SCHEMA = {
  type_1: {
    type: 'void',
    properties: {
      aa: {
        type: 'string',
        title: 'AA',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: 'Input',
        },
      },
    },
  },
  type_2: {
    type: 'void',
    properties: {
      aa: {
        type: 'string',
        title: 'AA',
        'x-decorator': 'FormItem',
        enum: [
          {
            label: '111',
            value: '111',
          },
          { label: '222', value: '222' },
        ],
        'x-component': 'Select',
        'x-component-props': {
          placeholder: 'Select',
        },
      },
      bb: {
        type: 'string',
        title: 'BB',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  },
}

export default observer(() => {
  const oldTypeRef = useRef()
  const form = useMemo(() => createForm(), [])
  const currentType = form.values.type
  const schema = {
    type: 'object',
    properties: {
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
      container: DYNAMIC_INJECT_SCHEMA[currentType],
    },
  }

  if (oldTypeRef.current !== currentType) {
    form.clearFormGraph('container.*') //回收字段模型
    form.deleteValuesIn('container') //清空字段值
  }

  oldTypeRef.current = currentType

  return (
    <Form form={form} layout="vertical">
      <SchemaField schema={schema} />
    </Form>
  )
})

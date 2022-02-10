import React, { useState, useEffect } from 'react';
import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Cascader,
  Submit,
  FormGrid,
  ArrayItems,
  Editable,
  FormButtonGroup,
  ArrayTable
} from '@formily/antd';
import { action } from '@formily/reactive';
import { Card, Button, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const form = createForm({
  validateFirst: true,
  effects() {
    onFieldValueChange('type', (field, form) => {
      if(field.value === 1){
        window.console.log('field, form---------------->', field.value, form);
        form.createField({name: 'newinput', component:[Input, {
          type: 'string',
          title: '用户名',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        }]});
      }
      form.setFieldState('input', (state) => {
        window.console.log('state---------------->', field);
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
        state.display = field.value;
      });
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    FormLayout,
    Input,
    Cascader,
    Select,
    ArrayItems,
    Editable,
    ArrayTable,
  },
  scope: {
    fetchAddress: (field) => {
      const transform = (data = {}) => {
        return Object.entries(data).reduce((buf, [key, value]) => {
          if (typeof value === 'string')
            return buf.concat({
              label: value,
              value: key,
            });
          const { name, code, cities, districts } = value;
          const _cities = transform(cities);
          const _districts = transform(districts);
          return buf.concat({
            label: name,
            value: code,
            children: _cities.length ? _cities : _districts.length ? _districts : undefined,
          });
        }, []);
      };

      field.loading = true;
      fetch('https://unpkg.com/china-location/dist/location.json')
        .then((res) => res.json())
        .then(
          action.bound((data) => {
            field.dataSource = transform(data);
            field.loading = false;
          }),
        );
    },
  },
});

const normalSchema = {
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
        {
          label: 'a1',
          value: 1,
        },
        {
          label: 'a2',
          value: 2,
        },
        {
          label: 'a3',
          value: 3,
        },
        {
          label: 'a3',
          value: 4,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  },
};

const schema1 = {
  type: 'object',
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
};

export default () => {
  const [current, setCurrent] = useState(schema1)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      form.setInitialValues({
        username: 'Aston Martin',
        type: 2,
      });
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="编辑用户" style={{ width: 1000 }}>
        <Spin spinning={loading}>
          <Form form={form} labelCol={5} wrapperCol={16} onAutoSubmit={console.log}>
            <SchemaField schema={normalSchema} />
            <SchemaField schema={current} />
            <FormButtonGroup.FormItem>
              <Submit block size="large">
                提交
              </Submit>
            </FormButtonGroup.FormItem>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

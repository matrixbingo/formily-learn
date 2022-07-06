import React, { FC } from 'react';
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
  Form,
} from '@formily/antd';
import { createSchemaField, observer, useField, useForm } from '@formily/react';
import CustomChild from './custom-child';
import { createClild, createRight } from './util';
import ArrayAddBtn from './array-add-btn';
import ArrayAddBtn2 from './array-add-btn2';
import { SwitchCard } from './switch-card';
import { toJS } from '@formily/reactive';
import { assign, get } from 'lodash';

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
    ArrayAddBtn2,
  },
});

const customizer = {
  appKey: {
    type: 'string',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
};

const right = {
  type: 'void',
  'x-component': 'Space',
  properties: {
    remove: {
      type: 'void',
      'x-component': 'ArrayItems.Remove',
    },
  },
};

const createArray = (
  path = { root: 'labelRule', rules: 'rules', relation: 'relation', type: 'type' },
) => {
  const { rules } = path;

  return {
    type: 'object',
    properties: {
      [rules]: {
        type: 'array',
        'x-component': 'ArrayItems',
        'x-decorator': 'FormItem',
        'x-component-props': { style: { width: 300 } },
        items: {
          type: 'object',
          'x-decorator': 'ArrayItems.Item',
          properties: {
            ...customizer,
            right,
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
};

const createSchema = (
  path = {
    root: 'labelRule',
    rules: 'rules',
    relation: 'relation',
    type: 'type',
    typeValue: 'rule',
  },
) => {
  const { root, type, relation, typeValue } = path;
  return {
    type: 'object',
    properties: {
      name: {
        type: 'void',
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          asterisk: true,
          feedbackLayout: 'none',
        },
        'x-component': 'Space',
        properties: {
          [root + '.' + type]: {
            type: 'string',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-display': 'hidden',
            default: typeValue,
          },
          // [root + '.' + relation]: {
          //   type: 'string',
          //   'x-decorator': 'FormItem',
          //   'x-component': 'SwitchCard',
          //   'x-decorator-props': {
          //     defaultValue: 'and',
          //   }
          // },
          [root]: {
            ...createArray(path),
          },
        },
      },
    },
  };
};

interface ConditionRules {
  path?: { root?: string; rules?: string; relation?: string; type?: string };
}

const ConditionRules: FC<ConditionRules> = observer((props) => {
  const { path: pathBase = {} } = props;

  const path = assign(
    { root: 'root', rules: 'rules', relation: 'relation', type: 'type', typeValue: 'rule' },
    pathBase,
  );
  const field = useField();
  const form = useForm();
  const values = toJS(form.values);
  const { root, rules, relation } = path;
  const size = get(values, [root, rules])?.length ?? 0;
  window.console.log('---------------->', form);
  return (
    <Form form={form} labelCol={5} wrapperCol={16} onAutoSubmit={console.log}>
      <SwitchCard
        form={form}
        field={field}
        name={relation}
        isShow={size > 0}
        disabled={false}
        key={1}
      >
        <SchemaField schema={createSchema(path)} />
      </SwitchCard>
      {/* <SchemaField schema={createSchema()} /> */}
      {/* <SchemaField schema={createSchema()} /> */}
    </Form>

    // <RecursionField
    //   SchemaField={SchemaField}
    //   basePath={field.address}
    //   schema={schema}
    //   onlyRenderProperties
    // />
  );
});

export default ConditionRules;

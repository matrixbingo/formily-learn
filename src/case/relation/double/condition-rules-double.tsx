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
import { createSchemaField, ISchema, observer, useField, useForm } from '@formily/react';
import CustomChild from '../demo/custom-child';
import { createClild, createRight } from '../demo/util';
import ArrayAddBtn from '../demo/array-add-btn';
import ArrayAddBtn2 from '../demo/array-add-btn2';
import { SwitchCard } from '../demo/switch-card';
import { toJS } from '@formily/reactive';
import { assign, get } from 'lodash';
import ConditionRules from '../single/condition-rules';

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
    ConditionRules,
  },
});


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
  customizer: any
): ISchema => {
  const { rules } = path;
  const _customizer = customizer || {} as any;
  window.console.log('_customizer---------------->', _customizer);
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
            bbb: {
              type: 'void',
              'x-component': 'ConditionRules',
              'x-component-props': { customizer: _customizer }
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
};

const createSchema = (
  path = {
    root: 'labelRule',
    rules: 'rules',
    relation: 'relation',
    type: 'type',
    typeValue: 'rule',
  },
  customizer: ISchema
): ISchema => {
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
          [root]: {
            ...createArray(path, customizer),
          },
        },
      },
    },
  };
};

interface ConditionRulesProps {
  customizer: ISchema;
  path?: { root?: string; rules?: string; relation?: string; type?: string };
}

const ConditionRulesDouble: FC<ConditionRulesProps> = observer((props) => {
  const { path: pathBase = {}, customizer } = props;

  const path = assign(
    { root: 'root', rules: 'rules', relation: 'relation', type: 'type', typeValue: 'rule' },
    pathBase,
  );
  const field = useField();
  const form = useForm();
  const values = toJS(form.values);
  const { root, rules, relation } = path;
  const size = get(values, [root, rules])?.length ?? 0;

  return (
    <Form form={form} labelCol={5} wrapperCol={16} onAutoSubmit={console.log}>
      <SwitchCard
        form={form}
        basePath={root}
        name={relation}
        isShow={size > 0}
        disabled={false}
        key={1}
      >
        <SchemaField schema={createSchema(path, customizer)} />
      </SwitchCard>
    </Form>

    // <RecursionField
    //   SchemaField={SchemaField}
    //   basePath={field.address}
    //   schema={schema}
    //   onlyRenderProperties
    // />
  );
});

export default ConditionRulesDouble;

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
import { assign, cloneDeep, get } from 'lodash';
import ConditionRules from '../single/condition-rules';
import { Form as FormProps } from '@formily/core';
import { Button } from 'antd';

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
            customizer: {
              type: 'void',
              'x-component': 'ConditionRules',
              'x-component-props': { customizer: _customizer, hasAddition: false, isSingle: false }
            },
          },
        },
        // properties: {
        //   addition: {
        //     type: 'void',
        //     title: '添加条目',
        //     'x-component': 'ArrayItems.Addition',
        //   },
        // },
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
      space: {
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

type  Path = { root?: string; rules?: string; relation?: string; type?: string };

interface ConditionRulesProps {
  customizer: ISchema;
  defaultValue?: any;
  singlePath?: Path;
  doublePath?: Path;
}

const addition = (form: FormProps, size: number, doublePath: Path, singlePath: Path, defaultValue: any) => {
  const { root: doubleRoot = 'root', rules: doubleRules = 'rules' } = doublePath;
  const { rules: singleRules = 'rules' } = singlePath;
  form.setValuesIn([doubleRoot, doubleRules, size, singleRules], [cloneDeep(defaultValue)]);
};

const ConditionRulesDouble: FC<ConditionRulesProps> = observer((props) => {
  const { singlePath: pathBase = {}, doublePath: pathRoot = {}, defaultValue = {}, customizer } = props;
  const singlePath = assign(
    { root: 'root', rules: 'rules', relation: 'relation', type: 'type', typeValue: 'rule' },
    pathBase,
  );
  const doublePath = assign(
    { root: 'root', rules: 'rules', relation: 'relation', type: 'type', typeValue: 'rule' },
    pathRoot,
  );

  const field = useField();
  const form = useForm();
  const values = toJS(form.values);
  const { root, rules, relation } = doublePath;
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
        <SchemaField schema={createSchema(singlePath, customizer)} />
        <Button onClick={() => addition(form, size, doublePath, singlePath, defaultValue)}>+  添加条目</Button>
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

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
import ArrayAddBtn from '../demo/array-add-btn';
import ArrayAddBtn2 from '../demo/array-add-btn2';
import { SwitchCard } from '../demo/switch-card';
import { toJS } from '@formily/reactive';
import { assign, get, isNumber } from 'lodash';

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


const right = {
  type: 'void',
  'x-component': 'Space',
  properties: {
    remove: {
      type: 'void',
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
  },
};

const createArray = (
  customizer: any,
  path = { root: 'labelRule', rules: 'rules', relation: 'relation', type: 'type' },
  hasAddition = true,
): ISchema => {
  const { rules } = path;
  const _customizer = customizer || {} as any;
  const addition = hasAddition ? {
    type: 'void',
    title: '添加条目',
    'x-component': 'ArrayItems.Addition',
  } : {};
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
            ..._customizer,
            right,
          },
        },
        properties: {
          addition,
        },
      },
    },
  };
};

const createSchema = (
  customizer: ISchema,
  path = {
    root: 'labelRule',
    rules: 'rules',
    relation: 'relation',
    type: 'type',
    typeValue: 'rule',
  },
  isSingle = true,
  hasAddition = true,
): ISchema => {
  const { root, type, rules, relation, typeValue } = path;

  const properties = !isSingle ? {
    [type]: {
      type: 'string',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-display': 'hidden',
      default: typeValue,
    },
    ['']: {
      ...createArray(customizer, path, hasAddition),
    },
  } : {
    [root + '.' + type]: {
      type: 'string',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-display': 'hidden',
      default: typeValue,
    },
    [root]: {
      ...createArray(customizer, path, hasAddition),
    },
  };

  return {
    type: 'object',
    properties: {
      space: {
        type: 'void',
        // 'x-decorator': 'FormItem',
        // 'x-decorator-props': {
        //   asterisk: true,
        //   feedbackLayout: 'none',
        // },
        'x-component': 'Space',
        properties,
      },
    },
  };
};

interface ConditionRulesProps {
  customizer: ISchema;
  path?: { root?: string; rules?: string; relation?: string; type?: string };
  isSingle?: boolean;
  hasAddition?: boolean;
}

const ConditionRules: FC<ConditionRulesProps> = observer((props) => {
  const { path: pathBase = {}, isSingle = true, hasAddition = true, customizer} = props;

  const path = assign(
    { root: 'root', rules: 'rules', relation: 'relation', type: 'type', typeValue: 'rule' },
    pathBase,
  );
  const field = useField();
  const form = useForm();
  const values = toJS(form.values);
  const { root, rules, relation } = path;
  const index = ArrayItems.useIndex?.();
  const valuePath = isNumber(index) ? [root, rules, index || 0, rules] : [root, rules];
  const basePath = isNumber(index) ? [root, rules, index || 0] : [root];
  const size = get(values, valuePath)?.length ?? 0;

  return (
    <Form form={form} labelCol={5} wrapperCol={16} onAutoSubmit={console.log}>
      <SwitchCard
        form={form}
        basePath={basePath.join('.')}
        name={relation}
        isShow={isSingle ? size > 0 : size > 1}
        disabled={false}
        key={1}
      >
      <SchemaField schema={createSchema(customizer, path, isSingle, hasAddition)} basePath={field.address}/>
    </SwitchCard>
  </Form>
  );
});

export default ConditionRules;

import React from 'react';
import { Space as AntdSpace, SpaceProps } from 'antd';
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
  useFormLayout,
} from '@formily/antd';
import { createForm, Form } from '@formily/core';
import { FormProvider, createSchemaField, observer } from '@formily/react';
import ConditionRules from './single/condition-rules';
import { delay } from 'lodash';
import { SwitchCard } from './demo/switch-card';
import ConditionRulesDouble from './double/condition-rules-double';

const item = { name: '2323', position: 1, type: 3 };

const data = { condition: { array: [{ appKey: '11' }, { appKey: '22' }] } };

export const SpaceDea: React.FC<React.PropsWithChildren<SpaceProps>> = (props) => {
  const layout = useFormLayout();
  window.console.error('SpaceDea---------------->', props);
  return React.createElement(AntdSpace, {
    size: props.size ?? layout?.spaceGap,
    ...props,
  });
};

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
    ConditionRules,
    ConditionRulesDouble,
    SwitchCard,
    SpaceDea,
  },
});

const form = createForm();

const customizer = {
  id: {
    type: 'string',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
  age: {
    type: 'string',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input',
  },
};

const schema = {
  type: 'object',
  properties: {
    container: {
      type: 'void',
      'x-component': 'ConditionRulesDouble',
      'x-component-props': { customizer }
    },
  },
};

// delay(()=>{
//   // form.setValues({array: [item]});
//   // form.setValuesIn('array.0.container.array.0', item);
//   // form.setValuesIn('array.0.container.array.0.container.array.0', item);

//   form.setValues(data);
// }, 2000);

export default observer(() => {
  const onSubmit = (data) => {
    console.log(data, JSON.stringify(data));
  };

  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
      <FormButtonGroup>
        <Submit onSubmit={onSubmit}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  );
});

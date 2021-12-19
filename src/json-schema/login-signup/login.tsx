import React from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Form, FormItem, Input, Password, Submit } from '@formily/antd';
import { Tabs, Card } from 'antd';
import * as ICONS from '@ant-design/icons';
import { VerifyCode } from './VerifyCode';
import { isNumber } from 'lodash';

window.console.log('ICONS---------------->', ICONS);

const normalForm = createForm({
  validateFirst: true,
});

const phoneForm = createForm({
  validateFirst: true,
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
  },
  scope: {
    icon(name: string) {
      window.console.log('name ---------------->', name, ICONS[name]);
      return React.createElement(ICONS[name]);
    },
    isEmpty(num: number, valid: boolean) {
      window.console.log('isEmpty num, valid---------------->', typeof num, typeof valid);
      if (isNumber(num)) {
        window.console.log('isEmpty isNumber ----------------> true');
        return true;
      }
      return valid;
    },
  },
});

const normalSchema = {
  type: 'object',
  properties: {
    username1111: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: 'string',
      title: '密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
  },
};

const phoneSchema = {
  type: 'object',
  properties: {
    phone: {
      type: 'string',
      title: '手机号',
      required: true,
      'x-validator': 'phone',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('PhoneOutlined')}}",
      },
    },
    verifyCode: {
      type: 'string',
      title: '验证码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'VerifyCode',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
      'x-reactions': [
        {
          dependencies: ['.phone#value', '.phone#valid'],
          fulfill: {
            state: {
              'component[1].readyPost': '{{ isEmpty($deps[0], $deps[1]) }}',
              'component[1].phoneNumber': '{{ $deps[0] }}',
            },
          },
        },
      ],
    },
  },
};

export default () => {
  const onAutoSubmit = (data) => {
    normalForm.validate();
    normalForm.setValuesIn('username1111', 'sdsdsdsd');
    window.console.log('normalForm---------------->', normalForm);
    window.console.log('normalForm.values---------------->', normalForm.values);
    window.console.log('normalForm.fields---------------->', normalForm.fields);
    window.console.log('onAutoSubmit---------->', data);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card style={{ width: 400 }}>
        <Tabs style={{ overflow: 'visible', marginTop: -10 }}>
          <Tabs.TabPane key="1" tab="账密登录">
            <Form form={normalForm} layout="vertical" size="large" onAutoSubmit={onAutoSubmit}>
              <SchemaField schema={normalSchema} />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="手机登录">
            <Form form={phoneForm} layout="vertical" size="large" onAutoSubmit={console.log}>
              <SchemaField schema={phoneSchema} />
              <Submit block size="large">
                登录
              </Submit>
            </Form>
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a href="#新用户注册">新用户注册</a>
          <a href="#忘记密码">忘记密码?</a>
        </div>
      </Card>
    </div>
  );
};

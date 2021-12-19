## 登录

```jsx | pure
  scope: {
    icon(name: string) {
      return React.createElement(ICONS[name])
    },

...

  'x-component-props': {
    prefix: "{{icon('LockOutlined')}}",
  },
  'x-reactions': [
    {
      dependencies: ['.phone#value', '.phone#valid'],
      fulfill: {
        state: {
          'component[1].readyPost': '{{$deps[0] && $deps[1]}}',
          'component[1].phoneNumber': '{{$deps[0]}}',
        },
      },
    },
  ],

```

<code src="./login.tsx" />

## 注册

```jsx | pure
  'x-component-props': {
    checkStrength: true,
  },
  'x-reactions': [
    {
      dependencies: ['.confirm_password'],
      fulfill: {
        state: {
          selfErrors:
            '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
        },
      },
    },
  ],


```

```jsx | pure

  name: {
    type: 'void',
    title: '姓名',
    'x-decorator': 'FormItem',
    'x-decorator-props': {
      asterisk: true,
      feedbackLayout: 'none',
    },
    'x-component': 'FormGrid',
    properties: {
      firstName: {
       ...
      },
      lastName: {
       ...
      },
    },
  },

```

```jsx | pure

  gender: {
  type: 'string',
  title: '性别',
  enum: [
      {
        label: '男',
        value: 1,
      },
      {
        label: '女',
        value: 2,
      },
      {
        label: '第三性别',
        value: 3,
      },
    ],
    'x-decorator': 'FormItem',
    'x-component': 'Select',
  },

```

```jsx | pure

  birthday: {
    type: 'string',
    required: true,
    title: '生日',
    'x-decorator': 'FormItem',
    'x-component': 'DatePicker',
  },
```

```jsx | pure

  contacts: {
      type: 'array',
      required: true,
      title: '联系人信息',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayItems',
      items: {
        type: 'object',
        'x-component': 'ArrayItems.Item',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },
          popover: {
            type: 'void',
            title: '完善联系人信息',
            'x-decorator': 'Editable.Popover',
            'x-component': 'FormLayout',
            'x-component-props': {
              layout: 'vertical',
            },
            'x-reactions': [
              {
                dependencies: ['.popover.name'],
                fulfill: {
                  schema: {
                    title: '{{$deps[0]}}',
                  },
                },
              },
            ],
            properties: {
              name: {
                type: 'string',
                title: '姓名',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              email: {
                type: 'string',
                title: '邮箱',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'email'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              phone: {
                type: 'string',
                title: '手机号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'phone'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
            },
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: '新增联系人',
          'x-component': 'ArrayItems.Addition',
        },
      },
    }

```

<code src="./signup.tsx" />

## 修改密码

```tsx | pure

    confirm_password: {
      type: 'string',
      title: '确认密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        checkStrength: true,
      },
      'x-reactions': [
        {
          dependencies: ['.password'],
          fulfill: {
            state: {
              selfErrors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
            },
          },
        },
      ],
    },

```

<code src="./change-password.tsx" />

## ArrayItems

```tsx | pure

 'x-reactions': '{{(field)=>field.title = field.value && field.value.input || field.title}}',

```

<code src="./index.tsx" />

ArrayItems JSON Schema 联动案例

```tsx | pure
  bb: {
    type: 'string',
    title: 'BB',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-reactions': [
      {
        dependencies: ['.aa'],
        when: "{{$deps[0] != '123'}}",
        fulfill: {
          schema: {
            title: 'BB',
            'x-disabled': true,
          },
        },
        otherwise: {
          schema: {
            title: 'Changed',
            'x-disabled': false,
          },
        },
      },
    ],
  },
```

<code src="./array-items-effects.tsx" />

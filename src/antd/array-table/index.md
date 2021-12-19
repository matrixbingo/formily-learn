## ArrayTable

<code src="./index.tsx" />

JSON Schema 联动案例

```tsx | pure

  column4: {
    type: 'void',
    'x-component': 'ArrayTable.Column',
    'x-component-props': { width: 200, title: 'A2' },
    'x-reactions': [
      {
        dependencies: ['hideFirstColumn'],
        when: '{{$deps[0]}}',
        fulfill: {
          schema: {
            'x-visible': false,
          },
        },
        otherwise: {
          schema: {
            'x-visible': true,
          },
        },
      },
    ],
    properties: {
      a2: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        required: true,
        'x-reactions': [
          {
            dependencies: ['.a1', 'hideFirstColumn'],
            when: '{{$deps[1] || $deps[0]}}',
            fulfill: {
              schema: {
                'x-visible': false,
              },
            },
            otherwise: {
              schema: {
                'x-visible': true,
              },
            },
          },
        ],
      },
    },
  },

```

<code src="./array-table-effects.tsx" />

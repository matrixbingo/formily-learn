## 联动

```tsx | pure
const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('input', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
        state.display = field.value;
      });
    });
  },
});
```

## 一对一联动

<code src="./demo1.tsx" />

## 一对一联动 SchemaReactions

```tsx | pure

  'x-reactions': {
    target: 'input',
    fulfill: {
      state: {
        display: '{{$self.value}}',
      },
    },
  }

```

<code src="./demo2.tsx" />

## 一对多联动

```tsx | pure
const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('*(input1,input2)', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
        state.display = field.value;
      });
    });
  },
});
```

<code src="./demo3.tsx" />

## 一对多联动 SchemaReactions

```tsx | pure

  'x-reactions':{
    target: '*(input1,input2)',
    fulfill: {
      state: {
        display: '{{$self.value}}',
      },
    },
  },

```

<code src="./demo4.tsx" />

## 依赖联动

```tsx | pure
const form = createForm({
  effects() {
    onFieldValueChange('dim_1', (field) => {
      const dim1 = field.value;
      const dim2 = field.query('dim_2').value();
      form.setFieldState('result', (state) => {
        state.value = dim1 * dim2;
      });
    });
    onFieldValueChange('dim_2', (field) => {
      const dim1 = field.query('dim_1').value();
      const dim2 = field.value || 0;
      form.setFieldState('result', (state) => {
        state.value = dim1 * dim2;
      });
    });
  },
});
```

<code src="./demo5.tsx" />

## 依赖联动 SchemaReactions

```tsx | pure
  'x-reactions': {
    dependencies: ['dim_1'],
    target: 'result',
    fulfill: {
      state: {
        value: '{{$self.value * $deps[0]}}',
      },
    },
  },
```

<code src="./demo6.tsx" />

## 链式联动

```tsx | pure
const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('input1', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
        state.visible = !!field.value;
      });
    });
    onFieldValueChange('input1', (field) => {
      form.setFieldState('input2', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
        state.visible = !!field.value;
      });
    });
  },
});
```

<code src="./demo7.tsx" />

## 链式联动 SchemaReactions

```tsx | pure

  'x-reactions': {
    target: 'input2',
    fulfill: {
      state: {
        visible: '{{!!$self.value}}',
      },
    },
  },

```

<code src="./demo8.tsx" />

## 循环联动

```tsx | pure
const form = createForm({
  effects() {
    onFieldInputValueChange('total', (field) => {
      if (field.value === undefined) return;
      form.setFieldState('count', (state) => {
        const price = form.values.price;
        if (!price) return;
        state.value = field.value / price;
      });
      form.setFieldState('price', (state) => {
        const count = form.values.count;
        if (!count) return;
        state.value = field.value / count;
      });
    });
    onFieldInputValueChange('price', (field) => {
      form.setFieldState('total', (state) => {
        const count = form.values.count;
        if (count === undefined) return;
        state.value = field.value * count;
      });
    });
    onFieldInputValueChange('count', (field) => {
      form.setFieldState('total', (state) => {
        const price = form.values.price;
        if (price === undefined) return;
        state.value = field.value * price;
      });
    });
  },
});
```

<code src="./demo9.tsx" />

## 循环联动 SchemaReactions

```tsx | pure
  'x-reactions': [
    {
      target: 'count',
      effects: ['onFieldInputValueChange'],
      dependencies: ['price'],
      fulfill: {
        state: {
          value: '{{$deps[0] ? $self.value / $deps[0] : $target.value}}',
        },
      },
    },
    {
      target: 'price',
      effects: ['onFieldInputValueChange'],
      dependencies: ['count'],
      fulfill: {
        state: {
          value: '{{$deps[0] ? $self.value / $deps[0] : $target.value}}',
        },
      },
    },
  ],

```

<code src="./demo10.tsx" />

## 自身联动

```tsx | pure
const form = createForm({
  effects() {
    onFieldValueChange('color', (field) => {
      field.setComponentProps({
        style: {
          backgroundColor: field.value,
        },
      });
    });
  },
});
```

<code src="./demo11.tsx" />

## 自身联动 SchemaReactions

```tsx | pure

  x-reactions={{
    target: 'color',
    fulfill: {
      state: {
        'component[1].style.backgroundColor': '{{$self.value}}',
      },
      //以下用法也可以
      // schema: {
      //   'x-component-props.style.backgroundColor': '{{$self.value}}',
      // },
    },
  }}

```
## 颜色
<code src="./demo12.tsx" />

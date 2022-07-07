import React, { FC, PropsWithChildren } from 'react';
import { Popconfirm } from 'antd';
import { ArrayItems } from '@formily/antd';
import { cloneDeep, fromPairs, isNumber, replace } from 'lodash';
import { observer, useField, useForm } from '@formily/react';
import { ArrayField } from '@formily/core';

const item = { name: '2323', position: 1, type: 3 };

const ArrayAddBtn2 = observer(({ level }) => {
  const arrayObj = ArrayItems.useArray?.();
  const index = ArrayItems.useIndex?.();
  const form = useForm();
  // const field = form.getFieldState(['array', index]);
  const field = useField<ArrayField>();
  let base = replace(field.address.toString(), '.layout.space.right.add1', '');
  base = replace(base, '.layout', '');

  window.console.log('base---------------->', field.address.toString(), level, base);
  const address = level === 1 ? 'array' : 'array';
  return (
    <div>
      <Popconfirm
        title="are you sure?"
        onConfirm={() => {
          // if (level === 1 && arrayObj?.field && isNumber(index)) {
          //   const path = base + '.container.array';
          //   const arr = form.getValuesIn(path) ?? [];
          //   window.console.log('1111 JSON.parse(JSON.stringify(arr))---------------->', field.address.toString(), index, path, arr);
          //   // const _arr = JSON.parse(JSON.stringify(arr));
          //   // form.setValuesIn(path + '.' + _arr.length, item)
          // }
          if (arrayObj?.field && isNumber(index)) {
            //arrayObj.field.remove(index);
            const path = base + '.container.array.' + index + '.container.array';
            const arr = form.getValuesIn(path) ?? [];
            window.console.log(
              '3333 JSON.parse(JSON.stringify(arr))---------------->',
              field.address.toString(),
              index,
              path,
              arr,
            );
            const _arr = JSON.parse(JSON.stringify(cloneDeep(arr)));
            window.console.log('3333 form.values---------------->', _arr, index);
            // form.setValues({array: [item]});
            form.setValuesIn(path + '.' + _arr.length, cloneDeep(item));
          }
        }}
      >
        <a>add</a>
      </Popconfirm>
    </div>
  );
});

export default ArrayAddBtn2;

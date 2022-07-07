
import React, { FC, PropsWithChildren } from 'react';
import { Button, Popconfirm } from "antd";
import { ArrayItems } from '@formily/antd';
import { cloneDeep, fromPairs, isNumber, replace } from 'lodash';
import { observer, useField, useForm } from '@formily/react';
import { ArrayField, Form } from '@formily/core';
import { toJS } from '@formily/reactive';

const item = {name: "", position: 1, type: 3}

interface ArrayAddBtnProps {
  level: number;
}

const ArrayAddBtn: FC<ArrayAddBtnProps> = observer(({ level }) => {
  const arrayObj = ArrayItems.useArray?.();
  const index = ArrayItems.useIndex?.() || 0;
  const form = useForm();
  // const field = form.getFieldState(['array', index]);
  const field = useField<ArrayField>();
  let base = replace(field.address.toString(), '.layout.space.right.add1', '');
  base = replace(base, '.layout', '');
  // field.query().
  // window.console.log('base1111---------------->',field.address.toString(), level, base, form);
  const values = toJS(form.values);
  const line =  values.array[index];
  if(line.position === 1 && level != 2){
    return null
  }

  const add = () => {
    const path = base + '.container.array';
    window.console.log('1111 path', path);
    form.query(path).take((field) => (field as ArrayField).push( cloneDeep(item) ));

    // if (level === 1) {
    //   const path = base + '.container.array';
    //   window.console.log('1111 path', path);
    //   form.query(path).take((field) => (field as ArrayField).push( cloneDeep(item) ));
    // } else if (level === 2) {
    //   const path = base + '.container.array';
    //   window.console.log('2222 path', path);
    //   form.query(path).take((field) => (field as ArrayField).push( cloneDeep(item) ));
    // }
  }

  return (
    <Button onClick={add}>添加子节点1</Button>
  );
});

export default ArrayAddBtn;


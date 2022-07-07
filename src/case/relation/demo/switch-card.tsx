/* eslint-disable react/require-default-props */
import React, { FC, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import { observer, useField, useForm } from '@formily/react';
import { Form, Field, FormPathPattern } from '@formily/core';

interface SwitchCardProps {
  form: Form;
  basePath?: FormPathPattern;
  children: React.ReactNode;
  name: [index: number, name: string] | string;
  isShow: boolean;
  disabled: boolean;
}

const style: React.CSSProperties = {
  position: 'relative',
  width: 2,
  backgroundColor: '#40a9ff',
  margin: '8px 24px 32px 12px',
  display: 'flex',
  alignItems: 'center',
};

const btnStyle: React.CSSProperties = {
  width: 20,
  height: 20,
  position: 'absolute',
  left: '-9px',
  textAlign: 'center',
  padding: 0,
  borderRadius: 5,
  fontSize: 12,
};

const cardStyle: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap',
  alignContent: 'flexStart',
};

type SwitchValue = 'and' | 'or';

interface SwitchButtonProps {
  form: Form;
  disabled?: boolean;
  defaultValue?: SwitchValue;
  path: string;
  style: React.CSSProperties;
}

const onChange = (form: Form, path: string, value: SwitchValue) => {
  form.setValuesIn(path, value);
}

const SwitchButton = ({form, style, path, disabled = false, defaultValue = 'and'}: SwitchButtonProps) => {

  const value = form.getValuesIn(path);

  const onClick = () => {
    if (value === 'and') {
      onChange(form, path, 'or');
    }
    if (value === 'or' && onChange) {
      onChange(form, path, 'and');
    }
  };

  useEffect(() => {
    onChange(form, path, defaultValue);
  }, []);

  return (
    <Button disabled={disabled} onClick={onClick} style={style} type="primary">
      {value === 'and' ? '且' : '或'}
    </Button>
  );
};

export const SwitchCard: FC<SwitchCardProps> = observer((props) => {
  const { children, form, basePath, name, isShow = true, disabled } = props;
  return (
    <Row className="SwitchCard">
      <Col style={{ ...cardStyle, width: 40 }}>
        <div style={{ ...style, margin: '10px 24px 34px 12px', display: isShow ? 'flex' : 'none' }}>
          <SwitchButton form={form} path={basePath + '.' + name} disabled={disabled} style={btnStyle} />
        </div>
      </Col>
      <Col style={{ width: 'calc(100% - 40px)' }}>{children}</Col>
    </Row>
  );
});

// export const SwitchCardCol: FC<SwitchCardProps> = ({ children, name, isShow, disabled }) => {
//   return (
//     <Row>
//       <Col style={{ ...cardStyle, width: 40 }}>
//         <div style={{ ...style, margin: '10px 24px 34px 12px', display: isShow ? 'flex' : 'none' }}>
//             <SwitchButton disabled={disabled} style={btnStyle} />
//         </div>
//       </Col>
//       <Col style={{ width: 'calc(100% - 40px)' }}>
//         {children}
//       </Col>
//     </Row>
//   );
// };

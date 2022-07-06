/* eslint-disable react/require-default-props */
import React, { FC, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import { observer, useField, useForm } from '@formily/react';
import { Form, Field } from '@formily/core';

interface SwitchCardProps {
  form: Form;
  field: Field;
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
  disabled?: boolean;
  value?: SwitchValue;
  defaultValue?: SwitchValue;
  onChange?: (value: SwitchValue) => void;
  form: Form;
  field: Field;
  style: React.CSSProperties;
}

const SwitchButton = ({
  value,
  onChange,
  style,
  disabled = false,
  defaultValue = 'and',
}: SwitchButtonProps) => {
  const onClick = () => {
    if (value === 'and' && onChange) {
      onChange('or');
    }
    if (value === 'or' && onChange) {
      onChange('and');
    }
  };

  useEffect(() => {
    onChange && onChange(defaultValue);
  }, []);

  return (
    <Button disabled={disabled} onClick={onClick} style={style} type="primary">
      {value === 'and' ? '且' : '或'}
    </Button>
  );
};

export const SwitchCard: FC<SwitchCardProps> = observer((props) => {
  const { children, form, field, name, isShow = true, disabled } = props;
  window.console.log('SwitchCard field ---------------->', field);
  return (
    <Row className="SwitchCard">
      <Col style={{ ...cardStyle, width: 40 }}>
        <div style={{ ...style, margin: '10px 24px 34px 12px', display: isShow ? 'flex' : 'none' }}>
          <SwitchButton form={form} field={field} disabled={disabled} style={btnStyle} />
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

// export const SwitchCard: FC<SwitchCardProps> = ({ children, name, isShow = true, disabled=false }) => {
//   return (
//     <Row className='SwitchCard'>
//       <Col style={{ ...cardStyle, width: 40, height: 100 }}>
//         <div style={{ ...style, margin: '10px 24px 34px 12px', display: 'flex' }}>
//           <SwitchButton disabled={disabled} style={btnStyle} />
//         </div>
//       </Col>
//     </Row>
//   );
// };

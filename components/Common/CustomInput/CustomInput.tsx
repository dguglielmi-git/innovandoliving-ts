import { FormField } from 'semantic-ui-react';
import { CustomInputProps } from './interface';

const CustomInput = ({ label, placeholder, name, onChange, cssClass, value }: CustomInputProps) => {
  const customInputClass = cssClass ?? 'custom-input';

  return (
    <FormField className={customInputClass}>
      <label>{label}</label>
      <input placeholder={placeholder} name={name} onChange={onChange} value={value} />
    </FormField>
  );
};

export default CustomInput;

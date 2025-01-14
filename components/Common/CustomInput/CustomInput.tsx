import { FormField } from 'semantic-ui-react';
interface CustomInputProps {
  label: string;
  placeholder?: string;
  name?: string;
  onChange?: () => void;
  cssClass?: string;
  value?: string;
}
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

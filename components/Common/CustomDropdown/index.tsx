import { Dropdown, FormField } from 'semantic-ui-react';

interface ImageDropdownEntity {
  avatar: boolean;
  src?: string;
}

interface DropdownOptionsEntity {
  key: string;
  text: string;
  value: string;
  image?: ImageDropdownEntity;
}

interface CustomDropdownProps {
  placeholder?: string;
  options: DropdownOptionsEntity[];
  name?: string;
  onChange?: () => void;
}

const CustomDropdown = ({ placeholder, options, name, onChange }: CustomDropdownProps) => {
  return (
    <FormField>
      <Dropdown placeholder={placeholder} fluid selection options={options} name={name} onChange={onChange} />
    </FormField>
  );
};

export default CustomDropdown;

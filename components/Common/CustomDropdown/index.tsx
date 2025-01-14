import { SyntheticEvent } from 'react';
import { Dropdown, DropdownProps, FormField } from 'semantic-ui-react';

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
  onChange?: (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void;
  error?: boolean;
  value?: string;
}

const CustomDropdown = ({ placeholder, options, name, onChange, error, value }: CustomDropdownProps) => {
  return (
    <FormField>
      <Dropdown
        placeholder={placeholder}
        fluid
        selection
        options={options}
        name={name}
        onChange={onChange}
        error={error}
        value={value}
      />
    </FormField>
  );
};

export default CustomDropdown;

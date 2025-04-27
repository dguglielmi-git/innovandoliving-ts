import { Dropdown, FormField } from 'semantic-ui-react';
import { CustomDropdownProps } from './interface';

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

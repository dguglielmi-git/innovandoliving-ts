import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import { FormField } from 'semantic-ui-react';

interface CustomInputCalendarProps {
  value: Nullable<Date>;
  onChange: () => void;
  name: string;
  label: string;
}

const CustomInputCalendar = ({ value, onChange, name, label }: CustomInputCalendarProps) => {
  return (
    <FormField>
      <label>{label}</label>
      <Calendar value={value} onChange={onChange} name={name} showIcon />
    </FormField>
  );
};

export default CustomInputCalendar;

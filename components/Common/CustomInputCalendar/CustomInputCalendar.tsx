import { Calendar } from 'primereact/calendar';
import { FormField } from 'semantic-ui-react';
import { CustomInputCalendarProps } from './interface';

const CustomInputCalendar = ({ value, onChange, name, label }: CustomInputCalendarProps) => {
  const parsedValue = value ? new Date(value) : undefined;
  return (
    <FormField>
      <label>{label}</label>
      <Calendar value={parsedValue} onChange={onChange} name={name} showIcon />
    </FormField>
  );
};

export default CustomInputCalendar;

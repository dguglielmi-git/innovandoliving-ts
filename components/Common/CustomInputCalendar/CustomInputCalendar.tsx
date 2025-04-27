import { Calendar } from 'primereact/calendar';
import { FormField } from 'semantic-ui-react';
import { CustomInputCalendarProps } from './interface';

const CustomInputCalendar = ({ value, onChange, name, label }: CustomInputCalendarProps) => {
  return (
    <FormField>
      <label>{label}</label>
      <Calendar value={value} onChange={onChange} name={name} showIcon />
    </FormField>
  );
};

export default CustomInputCalendar;

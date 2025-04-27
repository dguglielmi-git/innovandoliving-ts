import { Nullable } from 'primereact/ts-helpers';

export interface CustomInputCalendarProps {
  value: Nullable<Date>;
  onChange: (e?: any, d?: any) => void;
  name: string;
  label: string;
}

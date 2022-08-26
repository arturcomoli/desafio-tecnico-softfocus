import { DatePickerProps } from "antd";
import { PickerTimeProps } from "antd/lib/date-picker/generatePicker";

export interface ICustomDatePickerProps {
  label: string;
  // name: string;
  // register: any;
  helperText: string;
  error?: string;
  onChange: any;
}

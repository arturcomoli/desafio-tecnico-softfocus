import { DatePickerProps } from "antd";
import { PickerTimeProps } from "antd/lib/date-picker/generatePicker";

export interface ICustomDatePickerProps {
  label: string;
  helperText: string;
  error?: string;
  onChange: any;
}

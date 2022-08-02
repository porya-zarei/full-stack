import {FC} from "react";
import DatePicker, {DayValue} from "react-modern-calendar-datepicker";

interface DatePickerInputProps {
    value: DayValue;
    onChange: (date: DayValue | null) => void;
}

const DatePickerInput: FC<DatePickerInputProps> = ({onChange, value}) => {
    return (
        <DatePicker
            value={value}
            onChange={onChange}
            inputPlaceholder="Select a day"
            shouldHighlightWeekends
            locale="fa"
        />
    );
};

export default DatePickerInput;

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";

export default function BasicDatePicker({
  onChange,
  value,
}: {
  onChange: (value: Date | null) => void;
  value?: Date;
}) {
  const handleDateChange = (value: PickerValue | null) => {
    onChange(value ? new Date(value.format("YYYY-MM-DD")) : null);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={handleDateChange}
        value={dayjs(value) || null}
        className="bg-[#1e293b]/50 border-[#164e63]/30 w-full rounded-md  focus:border-[#06b6d4]"
        slotProps={{
          textField: {
            InputProps: {
              sx: {
                color: "#fff",
              },
            },
            InputLabelProps: {
              sx: {
                color: "#94a3b8",
                "&.Mui-focused": {
                  color: "#06b6d4",
                },
              },
            },
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#06b6d4",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0ea5e9",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#22d3ee",
              },
              "& .MuiSvgIcon-root": {
                color: "#06b6d4",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}

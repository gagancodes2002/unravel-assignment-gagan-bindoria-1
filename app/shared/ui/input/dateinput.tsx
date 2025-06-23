import { ChangeEvent } from "react";
import { TextInput, TextInputProps } from "./textinput";
import clsx from "clsx";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface DateRange {
    startDate: string;
    endDate: string;
}

interface DateInputProps extends TextInputProps {
    min?: string
    max?: string
}

const DateInput = ({ min, max, ...props }: DateInputProps) => (

    <TextInput
        {...props}
        type="date"
        min={min}
        max={max}
    />
)

interface DateRangeSelectorProps {
    startDate?: string;
    endDate?: string;
    onStartDateChange?: (date: string) => void;
    onEndDateChange?: (date: string) => void;
    onBlur?: () => void
    startPlaceholder?: string
    endPlaceholder?: string
    disabled?: boolean
    className?: string
    minDate?: string
    maxDate?: string
}

export const DateRangeSelector = ({
    startDate = '',
    endDate = '',
    onStartDateChange,
    onEndDateChange,
    onBlur,
    startPlaceholder,
    endPlaceholder,
    disabled = false,
    className,
    minDate,
    maxDate
}: DateRangeSelectorProps) => {

    const today = new Date().toISOString().split('T')[0];
    const actualMinDate = minDate || today

    const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.target.value;
        onStartDateChange?.(newStartDate);

        // if end date is before new start date, clear it
        if (endDate && newStartDate > endDate) {
            onEndDateChange?.('')
        }
    };

    const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        onEndDateChange?.(e.target.value)
    }

    return (
        <div
            className="w-full"
        >
            <div
                className={clsx("grid grid-cols-2 gap-3", className)}
            >
                {/* Start Date Input */}
                <div>
                    <DateInput
                        value={startDate}
                        onChange={handleStartDateChange}
                        onBlur={onBlur}
                        placeholder={startPlaceholder}
                        disabled={disabled}
                        className="!bg-neutral-0"
                        min={actualMinDate}
                        max={endDate || maxDate}
                    />
                </div>

                {/* End Date Input */}
                <div>
                    <DateInput
                        value={endDate}
                        onChange={handleEndDateChange}
                        onBlur={onBlur}
                        placeholder={startPlaceholder}
                        className="!bg-neutral-0"
                        disabled={disabled}
                        min={actualMinDate}
                        max={endDate || maxDate}
                    />
                </div>
            </div>

            {/* Show count if both selected */}
            {/* {startDate && endDate && (
                <div
                    className="mt-2 text-sm text-subtext-color"
                >
                    {calculateDiff(startDate, endDate)}
                </div>
            )} */}
        </div>
    )

}

// Calculate diff count 
const calculateDiff = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate)
    const diffTime = end.getTime() - start.getTime();
    const divideTimeBy = 1000 * 60 * 60 * 24
    const diffDays = Math.ceil(diffTime / divideTimeBy)
    return Math.max(0, diffDays);
}

// Controlled version 
interface ControlledDateRangeSelectorProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends DateRangeSelectorProps {
    name: TName
    control: Control<TFieldValues>
}

export const ControlledDateRangeSelector = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    control,
    ...dateRangeProps
}: ControlledDateRangeSelectorProps<TFieldValues, TName>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
                const dateRange = value || { startDate: '', endDate: '' };

                const handleRangeChange = (updates: Partial<DateRange>) => {
                    onChange({ ...dateRange, ...updates })
                }

                return (
                    <DateRangeSelector
                        {...dateRangeProps}
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        onStartDateChange={(startDate) => handleRangeChange({ startDate })}
                        onEndDateChange={(endDate) => handleRangeChange({ endDate })}
                        onBlur={onBlur}
                    />
                )
            }}
        />
    )
}

// Individual controlled date inputs (if you need them separately)
interface ControlledDateInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends DateInputProps {
    name: TName
    control: Control<TFieldValues>
}

export const ControlledDateInput = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, ...dateInputProps }: ControlledDateInputProps<TFieldValues, TName>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <DateInput
                    {...dateInputProps}
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            )}
        />
    )
}
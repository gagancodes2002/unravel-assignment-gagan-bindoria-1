import clsx from "clsx";
import { forwardRef, HTMLAttributes, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues, PathValue } from "react-hook-form";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string
}


const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ icon, className, ...props }, ref) => (


    <div
        className={clsx(
            "relative flex flex-row w-full",
            props.placeholder && "mt-6"
        )}
    >
        {props?.placeholder &&
            <div
                className="absolute -top-6 text-sm text-neutral-700"
            >
                {props.placeholder && <span>{props.placeholder}</span>}
            </div>}


        <div
            className="flex items-center flex-row space-x-2 relative w-full"
        >

            <div
                className="absolute left-3 "
            >{icon}
            </div>

            <input
                ref={ref}
                type="text"
                // Had to use inline class of the calendar icon that webkit offers :|
                className={clsx("flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2",
                    icon && "pl-10"
                    , className)}
                {...props}
            />
        </div>
    </div>

));

interface ControlledTextInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends TextInputProps {
    name: TName;
    control: Control<TFieldValues>;
}

const ControlledTextInput = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, ...textInputProps }: ControlledTextInputProps<TFieldValues, TName>) => {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, onBlur, name: fieldName }, fieldState: { error } }) => (
                <TextInput
                    {...textInputProps}
                    name={fieldName}
                    value={value ?? ""}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            )}

        />

    )

}

export { TextInput, ControlledTextInput }
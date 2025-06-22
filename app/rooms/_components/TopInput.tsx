import { useForm } from "react-hook-form";
import { ControlledTextInput } from '@/shared/ui/input/textinput'
import { LocateIcon, LocationEdit, MapPin, Users } from "lucide-react";
import { ControlledDateRangeSelector } from "@/shared/ui/input/dateinput";

interface TopInputForm {
    location: string
    guest_number: number
    date_range: {
        startDate: Date
        endDate: Date
    }
}

export default function () {


    // Won't be applying validations for now, if had to I would have used zod schema validations

    const { control, } = useForm<TopInputForm>();


    return (
        <div
            className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-0 "
        >
            <ControlledTextInput
                name="location"
                control={control}
                placeholder="Where To?"
                icon={<MapPin size={20} />}
            />


            <ControlledTextInput
                name="guest_number"
                control={control}
                placeholder="Guests"
                icon={<Users size={20} />}
                type="number"
            />

            <div
                className="max-w-xs"
            >
                <ControlledDateRangeSelector
                    name="date_range"
                    control={control}
                    startPlaceholder="Check-in date"
                    endPlaceholder="Check-out date"
                />
            </div>

        </div>
    )

}
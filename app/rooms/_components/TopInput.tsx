import { useForm } from "react-hook-form";
import { ControlledTextInput } from '@/app/shared/ui/input/textinput'
import { LocateIcon, LocationEdit, MapPin, Users } from "lucide-react";
import { ControlledDateRangeSelector } from "@/app/shared/ui/input/dateinput";

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
            className="w-full grid grid-cols-3 gap-2 "
        >

            <div
                className="col-span-3 md:col-span-1"
            >
                <ControlledTextInput
                    className="!bg-neutral-0 w-full"
                    name="location"
                    control={control}
                    placeholder="Where To?"
                    icon={<MapPin size={20} />}
                />
            </div>


            <div
                className="col-span-3 md:col-span-1"
            >
                <ControlledTextInput
                    className="!bg-neutral-0 w-full"
                    name="guest_number"
                    control={control}
                    placeholder="Guests"
                    icon={<Users size={20} />}
                    type="number"
                />
            </div>

            <div
                className="col-span-3 md:col-span-1 w-full"
            >
                <ControlledDateRangeSelector
                    className="w-fit"
                    name="date_range"
                    control={control}
                    startPlaceholder="Check-in date"
                    endPlaceholder="Check-out date"
                />
            </div>

        </div>
    )

}
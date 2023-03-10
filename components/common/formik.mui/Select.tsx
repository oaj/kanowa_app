import {FormControl, InputLabel, MenuItem, Select} from "@mui/material"
import {ReactNode} from "react";
import {ColonyWebTypes} from "@/types/colony.type";

type SelectProps = {
    name: string,
    label: string,
    formik: any,
    className?: string,
    children: ReactNode,
}
export default function SelectFormikMui({name, label, formik, className, children}: SelectProps) {
    const labelId: string = 'select-lbl-' + name
    return (
        <FormControl fullWidth >
            <InputLabel id={labelId}>Type</InputLabel>
            <Select
                fullWidth
                id={name}
                name={name}
                labelId={labelId}
                label={label}
                value={formik.values[name]}
                onChange={formik.handleChange}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                // helperText={formik.touched[name] && formik.errors[name]}
                className={className}
            >{children}</Select>
        </FormControl>

    )
}


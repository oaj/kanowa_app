import {Select} from "@mui/material"
import {ReactNode} from "react";

type SelectProps = {
    labelId: string,
    name: string,
    label: string,
    formik: any,
    className?: string,
    children: ReactNode,
}
export default function SelectFormikMui({name, labelId, label, formik, className, children}: SelectProps) {
    return (
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
    )
}


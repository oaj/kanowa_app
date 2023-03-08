import {TextField} from "@mui/material"

type TextFieldProps = {
    name: string,
    label: string,
    formik: any,
    multiline?: boolean,
    rows?: string,
}
export default function TextFieldFormikMui({name, label, multiline, rows, formik}: TextFieldProps) {
    return (
        <TextField
            fullWidth
            multiline={multiline}
            rows={rows}
            id={name}
            name={name}
            label={label}
            value={formik.values[name]}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
        />
    )
}


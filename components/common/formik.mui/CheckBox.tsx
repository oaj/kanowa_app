import {Checkbox, FormControlLabel, TextField} from "@mui/material"

type TextFieldProps = {
    name: string,
    label: string,
    formik: any,
    className?: string,
}
export default function CheckboxFormikMui({name, label, formik, className}: TextFieldProps) {
    return (
        <FormControlLabel
            // value="start"
            label={label}
            labelPlacement="end"
            className="mx-2"
            control={
                <Checkbox
                    title={label}
                    // fullWidth
                    id={name}
                    name={name}
                    // label={label}
                    value={formik.values[name]}
                    checked={formik.values[name]}
                    onChange={formik.handleChange}
                    // error={formik.touched[name] && Boolean(formik.errors[name])}
                    // helperText={formik.touched[name] && formik.errors[name]}
                    className={className}
                />
            }
        />

    )
}


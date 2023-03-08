import {Autocomplete, Chip, TextField} from "@mui/material";
import * as React from "react";

type MultiSelectProps = {
    name: string,
    label: string,
    options: string[],
    formik: any,
}

export default function MultiSelectFormikMui({name, label, options, formik}: MultiSelectProps) {
    return (
        <Autocomplete
            multiple
            options={options}
            id={name}
            value={formik.values[name]}
            onChange={(_, value) => {
                formik.setFieldValue(name, value);
            }}
            fullWidth={true}
            renderTags={(value: readonly string[], getTagProps) => {
                return value.map((option: string, index: number) => {
                    const props = getTagProps({index})
                    const key = props.key
                    // @ts-ignore
                    delete props["key"]
                    return <Chip variant="outlined" label={option} {...props} key={key}/>
                })
            }}
            filterSelectedOptions
            renderOption={(props, option, {selected}) => {
                // @ts-ignore
                const key = props.key
                // @ts-ignore
                delete props["key"]
                return <li key={key} {...props}>
                    {option}
                </li>
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={name}
                    label={label}
                    helperText={formik.touched[name] && formik.errors[name]}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                />
            )}
        />
    )
}
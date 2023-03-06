import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

type Props = {
    id?: string,
    options: string[],
    onChange?: any,
    value: string[],
}
export default function MuiSelect({id, options, value, onChange}: Props) {

    return (
        <Autocomplete
            multiple
            id={id || undefined}
            options={options}
            onChange={onChange}
            defaultValue={[]}
            fullWidth={true}
            renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => {
                    const props = getTagProps({index})
                    const key = props.key
                    // @ts-ignore
                    delete props["key"]
                    return <Chip variant="outlined" label={option} {...props} key={key}/>
                })
            }
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
                    label="Tag filter"
                />
            )}
        />
    )
}


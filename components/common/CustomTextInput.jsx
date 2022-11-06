import TextField from '@mui/material/TextField';

const CustomTextInput = ({ errorMethod, value, setValue, label, name, sx, ...props }) => {

    const nonBlankError = value != '' && errorMethod(value);

    return (
        <TextField
            color="primary"
            error={nonBlankError}
            required
            fullWidth
            label={label}
            name={name}
            onChange={(ev) => setValue(ev.target.value)}
            value={value}
            variant="outlined"
            sx={sx}
            {...props}
        />
    )
}

export default CustomTextInput
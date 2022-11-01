import TextField from '@mui/material/TextField';

const CustomTextInput = ({ errorMethod, value, setValue, label, name, sx, ...props }) => {

    // const { errorMethod, value, setValue, label, name, sx } = props;

    return (
        <TextField
            color="primary"
            error={errorMethod(value)}
            required
            fullWidth
            label={label}
            name={name}
            onChange={(ev) => setValue(ev.target.value)}
            value={value}
            variant="outlined"
            sx={sx}
        />
    )
}

export default CustomTextInput
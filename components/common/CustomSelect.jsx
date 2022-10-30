import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const CustomSelect = ({value, changeHandler, idText, labelText, children }) => {


    return (
        <Grid item xs={12} sm={6} md={4}>
            <FormControl
                variant="standard"
                sx={{ pb: 2, minWidth: '95%' }}
            >
                <InputLabel id={`${idText}-label`}>{labelText}</InputLabel>
                <Select
                    labelId={`${idText}-label`}
                    id={idText}
                    value={value}
                    onChange={changeHandler}
                    label={labelText}
                >
                    {children}
                </Select>
            </FormControl>
        </Grid>
    )
}

export default CustomSelect;

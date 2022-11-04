import { CALENDAR_WIDTH, TIME_WIDTH } from '../../lib/constants';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import CalendarColumn from './CalendarColumn';
import CustomFab from '../common/CustomFab';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SkeletonColumn from './SkeletonColumn';
import TimeColumn from './TimeColumn';
import { useSession } from 'next-auth/react';

const ScheduleAbstract = (props) => {

    const {
        columnCount,
        formControlId,
        formValue,
        setFormValue,
        formLabel,
        formData,
        columnInfo,
        columnData,
        addButtonHandler,
        isLoading,
        isError,
        scheduleWeek,
        setScheduleWeek,
        ...other
    } = props;

    const { data: session } = useSession();

    const handleChange = (event) => {
        setFormValue(event.target.value);
    };

    const handleWeekChange = (event) => {
        setScheduleWeek(event.target.value);
    };

    return (
        <>
            {/* FAB if in Admin mode */}
            {session && session.user.name == 'Admin' && (
                <CustomFab addButtonHandler={addButtonHandler} variant="left" />
            )}
            <Box sx={{ width: '100%' }}>
                {/* Week / "other" selections */}
                <Box sx={{ pl: 3, width: '100%' }}>
                    <FormControl
                        variant="standard"
                        sx={{ marginLeft: `${TIME_WIDTH}px`, pb: 2, minWidth: 100 }}
                    >
                        <InputLabel id={'week-select-label'}>Week</InputLabel>
                        <Select
                            labelId={'week-select-label'}
                            id={'week-select'}
                            value={scheduleWeek}
                            onChange={handleWeekChange}
                            label="Week"
                        >
                            <MenuItem key='Week A' value='Week A'>Week A</MenuItem>
                            <MenuItem key='Week B' value='Week B'>Week B</MenuItem>
                            
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{ ml: 4, pb: 2, minWidth: 180 }}
                    >
                        <InputLabel id={`${formControlId}-label`}>{formLabel}</InputLabel>
                        <Select
                            labelId={`${formControlId}-label`}
                            id={`${formControlId}`}
                            value={formValue}
                            onChange={handleChange}
                            label={formLabel}
                        >
                            {(formData && formData.length > 0) ? (
                                formData.map(item => (
                                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                ))
                            ) : (
                                <MenuItem key='loading' value=''>loading</MenuItem>
                            )})
                        </Select>
                    </FormControl>
                </Box>
                {/* Calendar */}
                <Box sx={{ overflow: 'scroll' }}>
                    <Grid
                        container
                        sx={{
                            width: `${CALENDAR_WIDTH * columnCount + TIME_WIDTH}px`,
                            mr: 3,
                        }}
                    >
                        <TimeColumn key={`column-time`} />
                        {!isLoading && !isError && columnInfo && columnInfo.map((item, idx) => (
                            <Grid item key={`column-${item._id}`}>
                                <CalendarColumn
                                    key={`column-${item._id}`}
                                    label={`${item.name}`}
                                    schedule={columnData(item._id)}
                                    final={idx == (columnCount - 1)}
                                    {...other}
                                />
                            </Grid>
                        ))}
                        {isLoading && (
                            <Grid item key={`column-skeleton`}>
                                <SkeletonColumn />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default ScheduleAbstract;

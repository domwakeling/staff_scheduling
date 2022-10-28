import { CALENDAR_WIDTH, HOUR_HEIGHT, DAY_START, DAY_END, ALT_BG_COL, colors } from '../../lib/constants';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import ScheduleItem from './ScheduleItem';
import Typography from '@mui/material/Typography';

const CalendarColumn = (props) => {

    const hourIndices = Array.from({ length: (DAY_END - DAY_START) }, (_, i) => i + DAY_START);

    const { label, schedule } = props;

    return (
        <Box sx={{ width: `${CALENDAR_WIDTH}px`}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', borderLeft: `1px solid ${blue[100]}`}}>
                <Typography noWrap sx={{py: 1}}>
                    {label}
                </Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
                {schedule && schedule.map(item => (
                    <ScheduleItem
                        key={item._id}
                        start={item.start}
                        end={item.end}
                        bg={item.bg}
                        fg={item.fg}
                        value1={item.value1}
                        value2={item.value2}
                    />
                ))}
            </Box>
            {hourIndices.map(hour => (
                <Box
                    key={hour}
                    sx={{
                        height: `${HOUR_HEIGHT}px`,
                        width: '100%',
                        backgroundColor: hour % 2 == 0 ? blue[50] : ALT_BG_COL,
                        borderTop: `1px solid ${blue[200]}`,
                        borderLeft: `1px solid ${blue[100]}`
                    }}
                />
            ))}
        </Box>
    )

}

export default CalendarColumn;

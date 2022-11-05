import { HOUR_HEIGHT, DAY_START, DAY_END } from '../../lib/constants';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import ScheduleItem from './ScheduleItem';
import Typography from '@mui/material/Typography';

const CalendarColumn = (props) => {

    const hourIndices = Array.from({ length: (DAY_END - DAY_START) }, (_, i) => i + DAY_START);

    const { label, schedule, final, columnWidth, ...other } = props;

    return (
        <Box sx={{ width: `${columnWidth}px`}}>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <Typography noWrap sx={{py: 1}}>
                    {label}
                </Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
                {schedule && schedule.map(item => (
                    <ScheduleItem
                        key={`${item._id}-${label}`}
                        start={item.start}
                        end={item.end}
                        bg={item.bg}
                        fg={item.fg}
                        value1={item.value1}
                        value2={item.value2}
                        item={item.item}
                        columnWidth={columnWidth}
                        {...other}
                    />
                ))}
            </Box>
            <Box sx={{ borderBottom: `1px solid ${blue[200]}` }}>
                {hourIndices.map(hour => (
                    <Box
                        key={hour}
                        sx={{
                            height: `${HOUR_HEIGHT.sm}px`,
                            width: '100%',
                            backgroundColor: hour % 2 == 0 ? blue[50] : 'white',
                            borderTop: `1px solid ${blue[200]}`,
                            borderLeft: `1px solid ${blue[100]}`,
                            borderRight: final ? `1px solid ${blue[100]}` : `0px`
                        }}
                    />
                ))}
            </Box>
        </Box>
    )

}

export default CalendarColumn;

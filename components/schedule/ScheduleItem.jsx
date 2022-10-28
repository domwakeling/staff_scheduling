import { CALENDAR_WIDTH, HOUR_HEIGHT, DAY_START, SCHEDULE_SPACING } from '../../lib/constants';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ScheduleItem = (props) => {

    const { start, end, bg, fg, value1, value2, showMenu, item, prepareModal } = props;

    const duration = end - start;

    const twoDigits = (num) => num.toLocaleString(undefined, { minimumIntegerDigits: 2 })

    const timeString = (num) => {
        const hours = twoDigits(Math.floor(num));
        const minutes = twoDigits(Math.ceil(60 * (num - Math.floor(num))));
        return `${hours}:${minutes}`
    }

    const clickHandler = (event) => {
        console.log(item);
        prepareModal(item);
        showMenu(event);
    }

    return (
        <Paper
            sx={{
                width: `${CALENDAR_WIDTH - 2 * SCHEDULE_SPACING}px`,
                height: `${duration * HOUR_HEIGHT -  2 * SCHEDULE_SPACING}px`,
                position: 'absolute',
                left: `${SCHEDULE_SPACING}px`,
                top: `${(start - DAY_START) * HOUR_HEIGHT + SCHEDULE_SPACING}px`,
                backgroundColor: bg,
                zIndex: '500',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            elevation={3}
        >
            <IconButton
                sx={{
                    color: fg,
                    position: 'absolute',
                    right: '0px',
                    top: '5px'
                }}
                size="small"
                onClick={clickHandler}
            >
                <MoreVertIcon color={fg} />
            </IconButton>
            {(duration > 0.5 && (
                <Typography noWrap variant='body2' color={fg}>
                    {timeString(start)} &mdash; {timeString(end)}
                </Typography>
            ))}
            <Typography noWrap variant='body2' color={fg}>
                {value1}
            </Typography>
            <Typography noWrap variant='body2' color={fg}>
                {value2}
            </Typography>
        </Paper>
    )
}

export default ScheduleItem;

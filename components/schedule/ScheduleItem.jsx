import { HOUR_HEIGHT, DAY_START, CELL_SPACE } from '../../lib/constants';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';

const ScheduleItem = (props) => {

    const { start, end, bg, fg, value1, value2, showMenu, item, prepareModal, prepareDialog, columnWidth } = props;

    const { data: session } = useSession();

    const duration = end - start;

    const twoDigits = (num) => num.toLocaleString(undefined, { minimumIntegerDigits: 2 })

    const timeString = (num) => {
        const hours = twoDigits(Math.floor(num));
        const minutes = twoDigits(Math.ceil(60 * (num - Math.floor(num))));
        return `${hours}:${minutes}`
    }

    const clickHandler = (event) => {
        prepareModal(item);
        prepareDialog(item);
        showMenu(event);
    }

    const dragStartHandler = (event) => {
        console.log('drag started');
        event.dataTransfer.setData('text', JSON.stringify(item));
    }

    const dragEndHandler = (event) => {
        event.preventDefault();
        const dataOut = event.dataTransfer.getData('text')
        console.log('drag ended:', dataOut)
    }

    return (
        <Paper
            // draggable
            sx={{
                width: `${columnWidth - 2 * CELL_SPACE}px`,
                height: `${duration * HOUR_HEIGHT.sm -  2 * CELL_SPACE}px`,
                position: 'absolute',
                left: `${CELL_SPACE}px`,
                top: `${(start - DAY_START) * HOUR_HEIGHT.sm + CELL_SPACE}px`,
                backgroundColor: bg,
                zIndex: '500',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                justifyContent: 'center'
            }}
            elevation={3}
            // onDragStart={dragStartHandler}
            // onDragEnd={dragEndHandler}
        >
            { session && session.user.name == 'Admin' && (
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
            )}
            {(duration > 0.5 && (
                <Typography
                    sx={{ width: '90%', margin: '0 auto', textAlign: 'center', display: 'box' }}
                    noWrap
                    variant='body2'
                    color={fg}
                >
                    {timeString(start)} &mdash; {timeString(end)}
                </Typography>
            ))}
            <Typography
                sx={{ width: '90%', margin: '0 auto', textAlign: 'center', display: 'box' }}
                noWrap
                variant='body2'
                color={fg}
            >
                {value1}
            </Typography>
            <Typography
                sx={{ width: '90%', margin: '0 auto', textAlign: 'center', display: 'box' }}
                noWrap
                variant='body2'
                color={fg}
            >
                {value2}
            </Typography>
        </Paper>
    )
}

export default ScheduleItem;

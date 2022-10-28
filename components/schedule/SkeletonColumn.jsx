import { CALENDAR_WIDTH, HOUR_HEIGHT, DAY_START, DAY_END, ALT_BG_COL, colors, SCHEDULE_SPACING } from '../../lib/constants';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

const SkeletonColumn = (props) => {

    const hourIndices = Array.from({ length: (DAY_END - DAY_START) }, (_, i) => i + DAY_START);

    const label = "loading ...";

    return (
        <Box sx={{ width: `${CALENDAR_WIDTH}px` }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', borderLeft: `1px solid ${blue[100]}` }}>
                <Typography noWrap sx={{ py: 1 }}>
                    {label}
                </Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
                {hourIndices.map(hour => (
                    <Skeleton key={hour} sx={{
                        width: `${CALENDAR_WIDTH - 2 * SCHEDULE_SPACING}px`,
                        height: `${HOUR_HEIGHT + 13 * SCHEDULE_SPACING}px`,
                        position: 'absolute',
                        left: `${SCHEDULE_SPACING}px`,
                        top: `${(hour - DAY_START) * HOUR_HEIGHT - 7 * SCHEDULE_SPACING}px`,
                        zIndex: '500'
                    }} />
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

export default SkeletonColumn;

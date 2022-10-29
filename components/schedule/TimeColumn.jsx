import { TIME_WIDTH, HOUR_HEIGHT, DAY_START, DAY_END } from '../../lib/constants';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TimeColumn = (props) => {

    const hourIndices = Array.from({ length: (DAY_END - DAY_START) }, (_, i) => i + DAY_START);

    return (
        <Box sx={{ width: `${TIME_WIDTH}px` }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography noWrap sx={{ py: 1 }}>
                    &nbsp;
                </Typography>
            </Box>
            {hourIndices.map(hour => (
                <Box
                    key={hour}
                    sx={{
                        height: `${HOUR_HEIGHT}px`,
                        width: '100%'
                    }}
                >
                    <Typography
                        sx={{ pr: 1, textAlign: 'right', position: 'relative', top: '-0.5rem' }}
                        variant="body2"
                    >
                        {hour}:00
                    </Typography>
                </Box>
            ))}
        </Box>
    )

}

export default TimeColumn;

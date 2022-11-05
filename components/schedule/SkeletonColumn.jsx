import { HOUR_HEIGHT, DAY_START, DAY_END, CELL_SPACE } from '../../lib/constants';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

const SkeletonColumn = (props) => {

    const { columnWidth } = props;

    const hourIndices = Array.from({ length: (DAY_END - DAY_START) }, (_, i) => i + DAY_START);

    const label = "loading ...";

    return (
        <Box sx={{ width: `${columnWidth}px` }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography noWrap sx={{ py: 1 }}>
                    {label}
                </Typography>
            </Box>
            <Box sx={{ position: 'relative' }}>
                {hourIndices.map(hour => (
                    <Skeleton key={hour} sx={{
                        width: `${columnWidth - 2 * CELL_SPACE}px`,
                        height: `${HOUR_HEIGHT.sm + 13 * CELL_SPACE}px`,
                        position: 'absolute',
                        left: `${CELL_SPACE}px`,
                        top: `${(hour - DAY_START) * HOUR_HEIGHT.sm - 7 * CELL_SPACE}px`,
                        zIndex: '500'
                    }} />
                ))}
            </Box>
            {hourIndices.map(hour => (
                <Box
                    key={hour}
                    sx={{
                        height: `${HOUR_HEIGHT.sm}px`,
                        width: '100%',
                        backgroundColor: hour % 2 == 0 ? blue[50] : 'white',
                        borderTop: `1px solid ${blue[200]}`,
                        borderLeft: `1px solid ${blue[100]}`
                    }}
                />
            ))}
        </Box>
    )

}

export default SkeletonColumn;

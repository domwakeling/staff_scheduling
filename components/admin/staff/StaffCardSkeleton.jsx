import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

const StaffCardSkeleton = (props) => {

    return (
        <Card elevation={4}>
            <CardContent>
                <Box sx={{ mt: -2 }}>
                    <Skeleton variant="text" sx={{ fontSize: '2.5rem'}} />
                </Box>
                <Box sx ={{mt: 2}}>
                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                </Box>
            </CardContent>
            <CardActions>
                <Box sx={{ px: 1 }} >
                    <Skeleton variant="rectangular" width={160} height={31} />
                </Box>
            </CardActions>
        </Card>
    );
}

export default StaffCardSkeleton;

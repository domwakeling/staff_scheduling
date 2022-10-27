import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

const LessonCardSkeleton = (props) => {

    return (
        <Card elevation={4}>
            <CardContent>
                <Box sx={{ mt: -2 }}>
                    <Skeleton variant="text" sx={{ fontSize: '2.5rem'}} />
                </Box>
            </CardContent>
            <CardActions>
                <Box sx={{ px: 1, mt:-1 }} >
                    <Skeleton variant="rectangular" width={160} height={28} />
                </Box>
            </CardActions>
        </Card>
    );
}

export default LessonCardSkeleton;

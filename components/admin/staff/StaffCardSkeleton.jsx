import { CARD_ALIGN_1, CARD_ALIGN_2, ALT_BG_COL } from '../../../lib/constants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

const StaffCardSkeleton = (props) => {

    return (
        <Card elevation={4} sx={{ backgroundColor: ALT_BG_COL }}>
            <CardContent>
                <Box sx={{ mt: -1 }}>
                    <Skeleton variant="text" sx={{ fontSize: '1.9rem'}} />
                </Box>
                <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
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

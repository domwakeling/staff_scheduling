import { CARD_ALIGN_1, CARD_ALIGN_2, ALT_BG_COL } from '../../../lib/constants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import Typography from '@mui/material/Typography';

const StaffCard = (props) => {

    const { name, email, telephone } = props.member;

    return (
        <Card elevation={4} sx={{ backgroundColor: ALT_BG_COL }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Box sx={{ pb: 1 }}>
                    <Typography noWrap variant="body1" sx={CARD_ALIGN_1}>
                        <MailIcon sx={CARD_ALIGN_2}/>&nbsp;{email}
                    </Typography>
                </Box>
                <Box>
                    <Typography noWwrap variant="body1" sx={CARD_ALIGN_1}>
                        <PhoneIcon sx={CARD_ALIGN_2}/>&nbsp;{telephone}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default StaffCard;

import { CARD_ALIGN_1, CARD_ALIGN_2, ALT_BG_COL, MODE_EDIT } from '../../../lib/constants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import Typography from '@mui/material/Typography';

const StaffCard = (props) => {

    const { name, email, telephone, _id } = props.member;
    const { setMode, openModal, setName, setEmail, setTel, setId, showDialog } = props;

    const editHandler = (event) => {
        event.preventDefault();
        setMode(MODE_EDIT);
        setName(name);
        setEmail(email);
        setTel(telephone);
        setId(_id);
        openModal();
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        setId(_id);
        showDialog();
    }

    return (
        <Card elevation={4} sx={{ backgroundColor: ALT_BG_COL }}>
            <CardHeader
                title={
                    <Typography noWrap gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                }
                noWrap
                sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    display: "block",
                    overflow: "hidden"
                }}
            />
            <CardContent>
                <Box sx={{ pb: 1 }}>
                    <Typography noWrap variant="body1" sx={CARD_ALIGN_1}>
                        <MailIcon sx={CARD_ALIGN_2}/>&nbsp;{email}
                    </Typography>
                </Box>
                <Box>
                    <Typography noWrap variant="body1" sx={CARD_ALIGN_1}>
                        <PhoneIcon sx={CARD_ALIGN_2}/>&nbsp;{telephone}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={editHandler}>Edit</Button>
                <Button size="small" color="error" onClick={deleteHandler}>Delete</Button>
            </CardActions>
        </Card>
    );
}

export default StaffCard;

import { MODE_EDIT } from '../../../lib/constants';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

const RoomCard = (props) => {

    const { name, _id } = props.room;
    const { setMode, openModal, setName, setId, showDialog } = props;

    const editHandler = (event) => {
        event.preventDefault();
        setMode(MODE_EDIT);
        setName(name);
        setId(_id);
        openModal();
    }

    const deleteHandler = (event) => {
        event.preventDefault();
        setId(_id);
        showDialog();
    }

    return (
        <Card elevation={4}>
            <CardHeader
                title={
                    <Typography noWrap variant="h5" component="h2">
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
            <CardActions>
                <Button size="small" onClick={editHandler}>Edit</Button>
                <Button size="small" color="error" onClick={deleteHandler}>Delete</Button>
            </CardActions>
        </Card>
    );
}

export default RoomCard;

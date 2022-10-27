import { colors, colorKeys, MODE_EDIT } from '../../../lib/constants';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

const LessonCard = (props) => {

    const { name, color, _id } = props.lesson;
    const { setMode, openModal, setName, setColor, setId, showDialog } = props;

    const editHandler = (event) => {
        event.preventDefault();
        setMode(MODE_EDIT);
        setName(name);
        setColor(color);
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
                    backgroundColor: colors[color].bg,
                    color: colors[color].fg,
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

export default LessonCard;

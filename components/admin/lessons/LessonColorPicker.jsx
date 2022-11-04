import { colors, colorKeys } from '../../../lib/colors';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const ColorSquare = ({fg, bg, active, colorName, setColor}) => {

    const clickHandler = (e) => {
        e.preventDefault();
        setColor(colorName);
    }

    return (
        <Grid item>
            <Box
                onClick={clickHandler}
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    color: fg,
                    backgroundColor: bg,
                    border: active ? `2px solid ${fg}` : '0px'
                    
                }}
            >
                    { active && <DoneIcon sx={{ margin: 'auto'}} /> }
            </Box>
        </Grid>
    )
}

const LessonColorPicker = (props) => {

    const { activeColor, setColor } = props;

    return (
        <Box sx={{pl: 1.5, pb: 2, pt: 0, mt: -1}}>
            <Typography color={activeColor=='' ? 'error' : 'inherit'}>
                Color{activeColor == '' ? '*' : ''}
            </Typography>
            <Grid container sx={{width: '200px'}}>
                {colorKeys.map(color => (
                    <ColorSquare
                        key={color}
                        fg={colors[color].fg}
                        bg ={colors[color].bg}
                        active={activeColor == color}
                        colorName={color}
                        setColor={setColor}
                    />
                ))

                }
            </Grid>
        </Box>
    )
};

export default LessonColorPicker;
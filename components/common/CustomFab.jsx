import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { blue } from '@mui/material/colors';
import Fab from '@mui/material/Fab';

const CustomFab = (props) => {

    const { addButtonHandler, variant } = props;

    let posnFormat = {};
    
    switch (variant) {
        case 'right': 
            posnFormat = {
                position: 'fixed',
                top: `${96 + 8 * 1.5}px`,
                right: `${8 * 1}px`
            }
            break;
        default: 
            posnFormat = {
                position: 'fixed',
                top: `${96 + 8 * 1.5}px`,
                left: `${8 * 1}px`
            };
            break;
    }

    return (
        <Box>
            <Fab
                aria-label='Add'
                onClick={addButtonHandler}
                sx={{
                    position: 'fixed',
                    top: `${96 + 8 * 1.5}px`,
                    right: `${8 * 1}px`,
                    backgroundColor: blue['A200'],
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: blue['A400'],
                    },
                    ...posnFormat
                }}
            >
                <AddIcon />
            </Fab>
        </Box>
    )
}

export default CustomFab;
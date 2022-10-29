import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';

const CustomModal = ({ ariaD, ariaL, children, modalCloseHandler, openState }) => (
    <Modal
        aria-describedby={ariaD}
        aria-labelledby={ariaL}
        closeAfterTransition
        disableScrollLock
        onClose={modalCloseHandler}
        open={openState}
        sx={{ overflowY: 'scroll' }}
    >
        <Slide
            in={openState}
            transition={750}
        >
            <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                margin: '30px auto',
                maxWidth: '800px',
                outline: 0,
                width: '80%'
            }}
            >
                {children}
            </div>
        </Slide>
    </Modal>
);

export default CustomModal;

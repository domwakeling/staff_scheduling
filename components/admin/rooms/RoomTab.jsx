import { MODE_ADD } from '../../../lib/constants';
import Alert from '@mui/material/Alert';
import CustomFab from '../../common/CustomFab';
import Grid from '@mui/material/Grid';
import RoomCard from './RoomCard';
import RoomCardSkeleton from './RoomCardSkeleton';
import RoomModal from './RoomModal';
import RoomRemoveDialog from './RoomRemoveDialog';
import useRooms from '../../../hooks/rooms';
import { useState } from 'react';

const RoomTab = (props) => {

    const { rooms, isLoading, isError } = useRooms()
    const [modalOpen, setModalOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [modalMode, setModalMode] = useState(MODE_ADD);
    const [dialogOpen, setDialogOpen] = useState(false);

    const { messageSnackbar } = props;

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setRoomName('');
        setRoomId('');
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setRoomId('');
    }

    const addButtonHandler = (e) => {
        e.preventDefault();
        setModalMode(MODE_ADD);
        handleModalOpen();
    }

    if (isError) return (
        <Alert severity='error' variant='filled' sx={{ width: '200px' }}>
            Loading error
        </Alert>
    )

    return (
        <>
            <CustomFab addButtonHandler={addButtonHandler} variant="right" />
            <Grid container spacing={2}>
                { isLoading ? (
                    <Grid item key='skeleton_id' xs={12} md={6} lg={4} xl={3}>
                        <RoomCardSkeleton key="skeleton_id" />
                    </Grid>
                ) : rooms.map((room) => (
                    <Grid item key={room._id} xs={12} md={6} lg={4} xl={3}>
                        <RoomCard
                            key={room._id}
                            room={room}
                            setMode={setModalMode}
                            openModal={handleModalOpen}
                            setName={setRoomName}
                            setId ={setRoomId}
                            showDialog={handleDialogOpen}
                        />
                    </Grid>
                ))}
            </Grid>
            <RoomModal
                closeHandler={handleModalClose}
                modalOpen={modalOpen}
                modalMode={modalMode}
                messageSnackbar={messageSnackbar}
                roomName={roomName}
                setName={setRoomName}
                id={roomId}
            />
            <RoomRemoveDialog
                dialogCloseHandler={handleDialogClose}
                dialogOpen={dialogOpen}
                messageSnackbar={messageSnackbar}
                id={roomId}
            />
        </>
    )
}

export default RoomTab;

import { useState } from 'react';
import { MODE_ADD, MODE_EDIT } from '../../../lib/constants';
import fetcher from '../../../lib/fetcher';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import RoomCard from './RoomCard';
import RoomCardSkeleton from './RoomCardSkeleton';
import RoomModal from './RoomModal';
import RoomRemoveDialog from './RoomRemoveDialog';
import useSWR from 'swr';

const useRooms = () => {
    const { data, error } = useSWR(`/api/room/getAll`, fetcher)

    return {
        rooms: data,
        isLoading: !error && !data,
        isError: error
    }
}

const RoomTab = (props) => {

    const { rooms, isLoading, isError } = useRooms()
    const [modalOpen, setModalOpen] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [modalMode, setModalMode] = useState(MODE_ADD);
    const [dialogOpen, setDialogOpen] = useState(false);

    const { snackbarUse } = props;

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

    if (isError) return <p>Error: {isError.message}</p>

    return (
        <>
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
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Fab color='primary' aria-label='Add' onClick={addButtonHandler}>
                    <AddIcon />
                </Fab>
            </Box>
            <RoomModal
                closeHandler={handleModalClose}
                modalOpen={modalOpen}
                modalMode={modalMode}
                snackbarUse={snackbarUse}
                roomName={roomName}
                setName={setRoomName}
                id={roomId}
            />
            <RoomRemoveDialog
                dialogCloseHandler={handleDialogClose}
                dialogOpen={dialogOpen}
                snackbarUse={snackbarUse}
                id={roomId}
            />
        </>
    )
}

export default RoomTab;

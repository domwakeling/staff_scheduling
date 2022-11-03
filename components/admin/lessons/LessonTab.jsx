import { MODE_ADD } from '../../../lib/constants';
import Alert from '@mui/material/Alert';
import CustomFab from '../../common/CustomFab';
import Grid from '@mui/material/Grid';
import LessonCard from './LessonCard';
import LessonCardSkeleton from './LessonCardSkeleton';
import LessonModal from './LessonModal';
import LessonRemoveDialog from './LessonRemoveDialog';
import useLessons from '../../../lib/db_lessons';
import { useState } from 'react';

const LessonTab = (props) => {

    const { lessons, isLoading, isError } = useLessons()
    const [modalOpen, setModalOpen] = useState(false);
    const [lessonName, setLessonName] = useState("");
    const [lessonColor, setLessonColor] = useState('');
    const [lessonId, setLessonId] = useState("");
    const [modalMode, setModalMode] = useState(MODE_ADD);
    const [dialogOpen, setDialogOpen] = useState(false);

    const { snackbarUse } = props;

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setLessonName('');
        setLessonColor('');
        setLessonId('');
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setLessonId('');
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
            <Grid container spacing={2}>
                { isLoading ? (
                    <Grid item key='skeleton_id' xs={12} md={6} lg={4} xl={3}>
                        <LessonCardSkeleton key="skeleton_id" />
                    </Grid>
                ) : lessons.map((lesson) => (
                    <Grid item key={lesson._id} xs={12} md={6} lg={4} xl={3}>
                        <LessonCard
                            key={lesson._id}
                            lesson={lesson}
                            setMode={setModalMode}
                            openModal={handleModalOpen}
                            setName={setLessonName}
                            setColor={setLessonColor}
                            setId ={setLessonId}
                            showDialog={handleDialogOpen}
                        />
                    </Grid>
                ))}
            </Grid>
            <CustomFab addButtonHandler={addButtonHandler} variant="right" />
            <LessonModal
                closeHandler={handleModalClose}
                modalOpen={modalOpen}
                modalMode={modalMode}
                snackbarUse={snackbarUse}
                lessonName={lessonName}
                color={lessonColor}
                setName={setLessonName}
                setColor={setLessonColor}
                id={lessonId}
            />
            <LessonRemoveDialog
                dialogCloseHandler={handleDialogClose}
                dialogOpen={dialogOpen}
                snackbarUse={snackbarUse}
                id={lessonId}
            />
        </>
    )
}

export default LessonTab;

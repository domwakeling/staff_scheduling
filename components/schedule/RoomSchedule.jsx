import { colors, weekdaysArray } from '../../lib/constants';
import ScheduleAbstract from './ScheduleAbstract';
import useLessons from '../../lib/db_lessons';
import useRooms from '../../lib/db_rooms';
import { useRegularRooms } from '../../lib/db_schedule_regular';
import useStaff from '../../lib/db_staff';
import { useState } from 'react';

const RoomSchedule = (props) => {

    const { ...other } = props;

    const [room, setRoom] = useState('');

    const { lessons } = useLessons();
    const { regularRooms } = useRegularRooms(room);
    const { rooms } = useRooms();
    const { staff } = useStaff();

    const columnData = (weekday) => {
        
        if (regularRooms) {
            return regularRooms
                .filter(item => item.day == weekday)
                .reduce((prev, item) => {
                    // use reduce to guard against looking up an entity that has been deleted
                    if (lessons.filter(obj => obj._id == item.lesson).length == 0) return prev;
                    if (staff.filter(obj => obj._id == item.staff).length == 0) return prev;
                    // protected succesfully so add to the return
                    const newEntry = {
                        _id: item._id,
                        start: item.start,
                        end: item.end,
                        bg: colors[lessons.filter(obj => obj._id == item.lesson)[0].color].bg,
                        fg: colors[lessons.filter(obj => obj._id == item.lesson)[0].color].fg,
                        value1: lessons.filter(obj => obj._id == item.lesson)[0].name,
                        value2: staff.filter(obj => obj._id == item.staff)[0].name,
                        item: item
                    }
                    return prev.concat(newEntry);
                }, []);
        }
        return [];
    }

    const columnCount = 7;

    return (
        <ScheduleAbstract
            columnCount={columnCount}
            formControlId='room-select-standard'
            formLabel='Room'
            formData={rooms}
            formValue={room}
            setFormValue={setRoom}
            columnInfo={weekdaysArray}
            columnData={columnData}
            isLoading={false}
            isError={false}
            {...other}
        />
    )
}

export default RoomSchedule;

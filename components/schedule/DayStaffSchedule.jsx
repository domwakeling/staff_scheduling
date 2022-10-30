import { colors, weekdaysArray } from '../../lib/constants';
import ScheduleAbstract from './ScheduleAbstract';
import useLessons from '../../lib/db_lessons';
import useRooms from '../../lib/db_rooms';
import { useRegularDays } from '../../lib/db_schedule_regular';
import useStaff from '../../lib/db_staff';
import { useState } from 'react';

const DayStaffSchedule = (props) => {

    const { ...other } = props;

    const [day, setDay] = useState('Monday');

    const { lessons } = useLessons();
    const { regularDays } = useRegularDays(day);
    const { rooms } = useRooms();
    const { staff, isLoading, isError } = useStaff();

    const columnData = (staffid) => {
        if (regularDays) {
            return regularDays
                .filter(item => item.staff == staffid)
                .reduce((prev, item) => {
                    // use reduce to guard against looking up an entity that has been deleted
                    if (lessons.filter(obj => obj._id == item.lesson).length == 0) return prev;
                    if (rooms.filter(obj => obj._id == item.room).length == 0) return prev;
                    // protected succesfully so add to the return
                    const newEntry = {
                        id: item._id,
                        start: item.start,
                        end: item.end,
                        bg: colors[lessons.filter(obj => obj._id == item.lesson)[0].color].bg,
                        fg: colors[lessons.filter(obj => obj._id == item.lesson)[0].color].fg,
                        value1: lessons.filter(obj => obj._id == item.lesson)[0].name,
                        value2: rooms.filter(obj => obj._id == item.room)[0].name,
                        item: item
                    }
                    return prev.concat(newEntry)
                }, []);
        }
        return [];
    }

    const columnCount = (!isLoading && !isError) ? staff.length : 1;

    return (
        <ScheduleAbstract
            columnCount={columnCount}
            formControlId='day-select-standard'
            formLabel='Day'
            formData={weekdaysArray}
            formValue={day}
            setFormValue={setDay}
            columnInfo={staff}
            columnData={columnData}
            isLoading={isLoading}
            isError={isError}
            {...other}
        />
    )
}

export default DayStaffSchedule;

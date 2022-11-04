import { weekdaysArray } from '../../lib/weekdays';
import { colors } from '../../lib/colors';
import ScheduleAbstract from './ScheduleAbstract';
import useLessons from '../../lib/db_lessons';
import useRooms from '../../lib/db_rooms';
import { useRegularStaff } from '../../lib/db_schedule_regular';
import useStaff from '../../lib/db_staff';
import { useState } from 'react';

const StaffSchedule = (props) => {

    const { scheduleStaff, setScheduleStaff, scheduleWeek, ...other } = props;

    const [staffMember, setStaffMember] = useState('');

    const { lessons } = useLessons();
    const { regularStaff } = useRegularStaff(scheduleStaff);
    const { rooms } = useRooms();
    const { staff } = useStaff();

    const columnData = (weekday) => {
        if (regularStaff) {
            return regularStaff
                .filter(item => item.day == weekday)
                .filter(item => item.week == scheduleWeek)
                .reduce((prev, item) => {
                    // use reduce to guard against looking up an entity that has been deleted
                    if (lessons.filter(obj => obj._id == item.lesson).length == 0) return prev;
                    if (rooms.filter(obj => obj._id == item.room).length == 0) return prev;
                    // protected succesfully so add to the return
                    const newEntry = {
                        _id: item._id,
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

    const columnCount = 7;

    return (
        <ScheduleAbstract
            columnCount={columnCount}
            formControlId='staff-select-standard'
            formLabel='Staff'
            formData={staff}
            formValue={scheduleStaff}
            setFormValue={setScheduleStaff}
            columnInfo={weekdaysArray}
            columnData={columnData}
            isLoading={false}
            isError={false}
            scheduleWeek={scheduleWeek}
            {...other}
        />
    )
}

export default StaffSchedule;

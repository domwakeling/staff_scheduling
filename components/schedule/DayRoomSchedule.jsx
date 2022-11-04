import { weekdaysArray } from '../../lib/weekdays';
import { colors } from '../../lib/colors';
import ScheduleAbstract from './ScheduleAbstract';
import useLessons from '../../lib/db_lessons';
import useRooms from '../../lib/db_rooms';
import { useRegularDays } from '../../lib/db_schedule_regular';
import useStaff from '../../lib/db_staff';

const DayRoomSchedule = (props) => {

    const { scheduleDay, setScheduleDay, scheduleWeek, ...other } = props;

    const { lessons } = useLessons();
    const { regularDays } = useRegularDays(scheduleDay);
    const { rooms, isLoading, isError } = useRooms();
    const { staff } = useStaff();

    const columnData = (roomid) => {
        if (regularDays) {
            return regularDays
                .filter(item => item.room == roomid)
                .filter(item => item.week == scheduleWeek)
                .reduce((prev, item) => {
                    // use reduce to guard against looking up an entity that has been deleted
                    if (lessons.filter(obj => obj._id == item.lesson).length == 0) return prev;
                    if (staff.filter(obj => obj._id == item.staff).length == 0) return prev;
                    // protected succesfully so add to the return
                    const newEntry ={
                        _id: item._id,
                        start: item.start,
                        end: item.end,
                        bg: colors[lessons.filter(obj => obj._id == item.lesson)[0].color].bg,
                        fg: colors[lessons.filter(obj => obj._id == item.lesson)[0].color].fg,
                        value1: lessons.filter(obj => obj._id == item.lesson)[0].name,
                        value2: staff.filter(obj => obj._id == item.staff)[0].name,
                        item: item
                    }
                    return prev.concat(newEntry)
                }, []);
        }
        return [];
    }

    const columnCount = (!isLoading && !isError) ? rooms.length : 1;

    return (
        <ScheduleAbstract
            columnCount={columnCount}
            formControlId='day-select-standard'
            formLabel='Day'
            formData={weekdaysArray}
            formValue={scheduleDay}
            setFormValue={setScheduleDay}
            columnInfo={rooms}
            columnData={columnData}
            isLoading={isLoading}
            isError={isError}
            scheduleWeek={scheduleWeek}
            {...other}
        />
    )
}

export default DayRoomSchedule;

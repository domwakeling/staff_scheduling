import { colors, weekdaysArray } from '../../lib/constants';
import ScheduleAbstract from './ScheduleAbstract';
import useLessons from '../../lib/db_lessons';
import useRooms from '../../lib/db_rooms';
import { useRegularDays } from '../../lib/db_schedule_regular';
import useStaff from '../../lib/db_staff';

const DayStaffSchedule = (props) => {

    const { scheduleDay, setScheduleDay, scheduleWeek, ...other } = props;

    const { lessons } = useLessons();
    const { regularDays } = useRegularDays(scheduleDay);
    const { rooms } = useRooms();
    const { staff, isLoading, isError } = useStaff();

    const columnData = (staffid) => {
        if (regularDays) {
            return regularDays
                .filter(item => item.staff == staffid)
                .filter(item => item.week == scheduleWeek)
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
            formValue={scheduleDay}
            setFormValue={setScheduleDay}
            columnInfo={staff}
            columnData={columnData}
            isLoading={isLoading}
            scheduleWeek={scheduleWeek}
            {...other}
        />
    )
}

export default DayStaffSchedule;

export class ScheduleMessage {
    constructor(data) {
        this.staff = data.staff || false;
        this.room = data.room || false;
        this.lesson = data.lesson || false;
        this.regular = {
            getAll: data.regular && data.regular.getAll || false,
            staff: data.regular && data.regular.staff || [],
            days: data.regular && data.regular.daysl || [],
            rooms: data.regular && data.regular.rooms || []
        }
    }
}

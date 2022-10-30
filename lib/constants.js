// DATABASE
export const MAIN_DB_NAME = "Main";
export const STAFF_COLLECTION_NAME = "Staff";
export const ROOM_COLLECTION_NAME = "Rooms";
export const LESSON_COLLECTION_NAME = "Lessons";
export const REGULAR_SCHEDULE_COLLECTION_NAME = "RegularSchedule";

// HTML CODES
export const RESPONSE_OK = 200;
export const RESPONSE_ERROR = 400;

// FORMATTING
export const CARD_ALIGN_1 = {
    verticalAlign: 'middle'
}
export const CARD_ALIGN_2 = {
    position: 'relative',
    top: 8
}
export const ALT_BG_COL = '#fbfdff';
export const HOUR_HEIGHT = 110;
export const CALENDAR_WIDTH = 200;
export const TIME_WIDTH = 60;
export const SCHEDULE_SPACING = 4;

// EDITING MODES
export const MODE_ADD = 'add';
export const MODE_EDIT = "edit";

// CALENDAR INFO - START AND END OF SCHEDULE
export const DAY_START = 13;
export const DAY_END = 23; 

// WEEKDAY STUFF
export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const weekdaysArray = [
    {
        name: 'Monday',
        _id: 'Monday'
    }, {
        name: 'Tuesday',
        _id: 'Tuesday'
    }, {
        name: 'Wednesday',
        _id: 'Wednesday'
    }, {
        name: 'Thursday',
        _id: 'Thursday'
    }, {
        name: 'Friday',
        _id: 'Friday'
    }, {
        name: 'Saturday',
        _id: 'Saturday'
    }, {
        name: 'Sunday',
        _id: 'Sunday'
    }
];

// COLOR PALETTE
export const colors = {
    'red': {
        bg: '#f44336',
        fg: '#fff'
    },
    'pink': {
        bg: '#e91e63',
        fg: '#fff'
    },
    'purple': {
        bg: '#9c27b0',
        fg: '#fff'
    },
    'deepPurple': {
        bg: '#673ab7',
        fg: '#fff'
    },
    'indigo': {
        bg: '#3f51b5',
        fg: '#fff'
    },
    'blue': {
        bg: '#2196f3',
        fg: '#fff'
    },
    'lightBlue': {
        bg: '#03a9f4',
        fg: '#000'
    },
    'cyan': {
        bg: '#00bcd4',
        fg: '#000'
    },
    'teal': {
        bg: '#009688',
        fg: '#fff'
    },
    'green': {
        bg: '#4caf50',
        fg: '#000'
    },
    'lightGreen': {
        bg: '#8bc34a',
        fg: '#000'
    },
    'lime': {
        bg: '#cddc39',
        fg: '#000'
    },
    'yellow': {
        bg: '#ffeb3b',
        fg: '#000'
    },
    'amber': {
        bg: '#ffc107',
        fg: '#000'
    },
    'orange': {
        bg: '#ff9800',
        fg: '#000'
    },
    'deepOrange': {
        bg: '#ff5722',
        fg: '#fff'
    }
}
export const colorKeys = [
    'red',
    'pink',
    'purple',
    'deepPurple',
    'indigo',
    'blue',
    'lightBlue',
    'cyan',
    'teal',
    'green',
    'lightGreen',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deepOrange'
];

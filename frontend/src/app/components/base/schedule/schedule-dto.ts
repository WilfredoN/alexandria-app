export class ScheduleItem {
    day_of_week: string;
    lessonId: {
        lesson_name: string;
        lesson_type: string;
        start_time: string;
        end_time: string;
    };
    groupId: {
        name: string;
    };
    teacherId: {
        full_name: string;
    };
}

export interface Schedule {
    id: number;
    day_of_week: string;
    lesson_num: number;
    week_type: number;
    lesson_id: number;
    lessonName?: string;
    groupId: number;
    teacher_id: number;
    teacherName?: string;
}

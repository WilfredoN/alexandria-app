export interface Schedule {
    id: number;
    dayOfWeek: string;
    lessonNumber: number;
    week_type: number;
    lessonId: number;
    lessonName?: string;
    groupId: number;
    teacherId: number;
    teacherName?: string;
}

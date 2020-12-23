import { LessonDto } from "./lesson.dto";

export class GroupDto {
    id: number
    name: string
    lessons: LessonDto[]
}
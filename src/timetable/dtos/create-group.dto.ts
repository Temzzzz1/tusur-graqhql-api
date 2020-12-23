import { LessonDto } from "./lesson.dto";

export class CreateGroupDto {
    id: number
    name: string
    lessons: LessonDto[]
}
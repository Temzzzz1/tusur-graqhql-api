import { GroupDto } from "./group.dto"

export class NoteByDateDto {
    date?: string
    note?: string
}

export class TeacherDto {
    name?: string
}

export class AudienceDto {
    name?: string
    addr?: string
    lonlat?: string
}

export class TimeDto {
    start?: string
    end?: string
}

export class LessonDto {
    subject: string
    type?: string
    time?: TimeDto
    date: string
    note_by_date?: NoteByDateDto[]
    audiences?: AudienceDto[]
    teachers?: TeacherDto[]
}
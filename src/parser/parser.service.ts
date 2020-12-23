import http from "https";
import schedule from 'node-schedule';

import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { GroupEntity } from "./entities/group.entity";
import { getConnection, getRepository, Repository } from "typeorm";
import { GroupDto } from "src/timetable/dtos/group.dto";
import { LessonEntity } from "./entities/lesson.entity";
import { CreateGroupDto } from "src/timetable/dtos/create-group.dto";
import { TimeEntity } from "./entities/time.entity";
import { TeacherEntity } from "./entities/teacher.entity";
import { AudienceEntity } from "./entities/audience.entity";
import { NoteByDateDto } from "src/timetable/dtos/lesson.dto";
import { NoteByDateEntity } from "./entities/note-by-date.entity";

@Injectable()
export class ParserService {
    private _logger = new Logger(ParserService.name)

    constructor(
        @InjectRepository(GroupEntity)
        private readonly _groupRepository: Repository<GroupEntity>,
        @InjectRepository(LessonEntity)
        private readonly _lessonRepository: Repository<LessonEntity>,
        @InjectRepository(TimeEntity)
        private readonly _timeRepository: Repository<TimeEntity>,
        @InjectRepository(TeacherEntity)
        private readonly _teacherRepository: Repository<TeacherEntity>,
        @InjectRepository(AudienceEntity)
        private readonly _audienceRepository: Repository<AudienceEntity>,
        @InjectRepository(NoteByDateEntity)
        private readonly _notebydateRepository: Repository<NoteByDateEntity>,
    ) { }

    async start(): Promise<void> {
        this._parseTable()

        // node-shedule перестал работать

        // if (hour < 0 || hour > 23) return
        // var rule = new schedule.RecurrenceRule();
        // rule.hour = hour
        // schedule.scheduleJob(rule, () => {
        //     this._parseTable()
        //         .then(() => {
        //             console.log("Timetable parsed at", hour + ":00")
        //         })
        //         .catch((err) => {
        //             throw err
        //         })
        // })
    }

    private async _parseTable(): Promise<void> {
        const url = "https://timetable.tusur.ru/api/v2/raspisanie_vuzov"

        http.get(url, (res: any) => {
            let body: string = "";
            res.setEncoding("utf8");
            res.on("data", (data: string) => {
                body += data;
            });

            res.on("end", () => {
                this._makeGroup(body);
            });
        })
    }

    private _makeGroup(data: string) {
        try {
            const table = JSON.parse(data)

            const groups = []

            table.faculties.forEach(faculty => {
                faculty.groups.forEach(group => {
                    groups.push(this._createGroup(group))
                })
            })

            Promise.all(groups).then(() => {
                this._logger.log("All groups saved/updated in database")
            }).catch(() => {
                throw new Error('Cant parse group')
            })

        } catch (err) {
            if (err.code == "ENOENT")
                throw new Error(`TUSUR Timetable doesn't exist. You should use Parser.parseTable() or Parser.start() for everyday table parsing`)
        }
    }

    private async _createGroup(createdGroup: CreateGroupDto) {
        await this.clearDb()

        let newGroup = new GroupEntity()
        newGroup.name = createdGroup.name
        newGroup = await newGroup.save()

        const allLessons: LessonEntity[] = []
        const allTeachers: TeacherEntity[] = []
        const allAudiences: AudienceEntity[] = []
        const allNoteByDates: NoteByDateEntity[] = []

        createdGroup.lessons.forEach(async lesson => {

            const teachers: TeacherEntity[] = []
            const audiences: AudienceEntity[] = []
            const noteByDates: NoteByDateEntity[] = []


            let newTime = new TimeEntity()
            newTime.start = lesson.time.start
            newTime.end = lesson.time.end
            newTime = await newTime.save()

            let newLesson = new LessonEntity()
            newLesson.subject = lesson.subject
            newLesson.type = lesson.type
            newLesson.date = lesson.date
            newLesson.time = newTime
            newLesson.group = newGroup

            lesson.teachers.forEach(teacher => {
                let newTeacher = new TeacherEntity()
                newTeacher.name = teacher.name
                newTeacher.lessons = newLesson
                teachers.push(newTeacher)
            })

            lesson.audiences.forEach(audience => {
                let newAudience = new AudienceEntity() 
                newAudience.name = audience.name
                newAudience.addr = audience.addr
                newAudience.lonlat = audience.lonlat
                newAudience.lessons = newLesson
                audiences.push(newAudience)
            })

            lesson.note_by_date.forEach(note_by_date => {
                let newNoteByDate = new NoteByDateEntity()
                newNoteByDate.date = note_by_date.date
                newNoteByDate.note = note_by_date.note
                newNoteByDate.lessons = newLesson
                noteByDates.push(newNoteByDate)
            })
            allLessons.push(newLesson)
            allAudiences.concat(audiences)
            allNoteByDates.concat(noteByDates)
            allTeachers.concat(teachers)

        })

        this._lessonRepository.save(allLessons, {
            chunk: 300
        })

        this._teacherRepository.save(allTeachers, {
            chunk: 300
        })

        this._notebydateRepository.save(allNoteByDates, {
            chunk: 300
        })

        return  this._audienceRepository.save(allAudiences, {
            chunk: 300
        })
    }

    // private async _createTeacher(lesson) {
    //     const teachers: TeacherEntity[] = []

    //     lesson.teachers.forEach(teacher => {
    //         const newTeacher = this._teacherRepository.create({
    //             lessons: newLesson
    //         })

    //         teachers.push(newTeacher)
    //     })
    // }

    async clearDb(): Promise<boolean> {
        try {
            const entities = getConnection().entityMetadatas

            for (const entity of entities) {
                const repo = getConnection().getRepository(entity.name)
                await repo.delete({})
            }

            return true
        } catch (error) {
            throw new InternalServerErrorException(error, 'server-error')
        }
    }

}

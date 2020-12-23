import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from 'src/parser/entities/group.entity';
import { LessonEntity } from 'src/parser/entities/lesson.entity';
import { Any, FindConditions, In, Like, Repository } from 'typeorm';
import { FilterDto } from './dtos/filter.dto';
import { GetByTeacherDTo } from './dtos/get-by-teacher.dto';
import { LessonDto, TeacherDto } from './dtos/lesson.dto';
import { TeacherType } from './types/teacher.type';


@Injectable()
export class TimetableService {

    constructor(
        @InjectRepository(GroupEntity)
        private _groupRepository: Repository<GroupEntity>,
        @InjectRepository(LessonEntity)
        private _lessonRepository: Repository<LessonEntity>,
    ) {}

    async getGroups(input: FilterDto) {
        const { name, limit: take, skip } = input || { skip: 0, limit: 20 }

        const commonWhereCondition: FindConditions<GroupEntity> = {}

        if (name) {
            commonWhereCondition.name = name
        }

        const queryBuilder = this._groupRepository.createQueryBuilder()

        queryBuilder
            .where(commonWhereCondition)
            .take(take)
            .skip(skip)

        console.log(commonWhereCondition)

        return await queryBuilder.getMany()
    }

    async getByTeacherName(input: TeacherDto) {
        const { name } = input

        return await this._lessonRepository.find({ where: {
            teachers: Like(`%${name}%`)
        }})
    }
}

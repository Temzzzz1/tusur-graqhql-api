
import { Args, Query, Resolver } from '@nestjs/graphql';
import { FilterInput } from './inputs/filter.input';
import { GetByTeacherInput } from './inputs/get-by-teacher.input';
import { TimetableService } from './timetable.service';
import { GroupType } from './types/group.type';
import { LessonType } from './types/lesson.type';

@Resolver()
export class TimetableResolver {

    constructor(private readonly _timetableService: TimetableService) { }

    @Query(() => [GroupType], {
        nullable: 'items',
        description: '[Groups] Get groups.',
    })
    async groups(
        @Args('input') input: FilterInput,
    ): Promise<GroupType[]> {
        return await this._timetableService.getGroups(input)
    }


    @Query(() => [LessonType], {
        nullable: 'items',
        description: '[Groups] Get teacher lessons.',
    })
    async getTeacherLesson(
        @Args('input') input: GetByTeacherInput,
    ): Promise<LessonType[]> {
        return await this._timetableService.getByTeacherName(input)
    }


}

import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableResolver } from './timetable.resolver';
import { GroupEntity } from 'src/parser/entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from 'src/parser/entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    GroupEntity,
    LessonEntity,
      ])],
  providers: [TimetableService, TimetableResolver]
})
export class TimetableModule { }

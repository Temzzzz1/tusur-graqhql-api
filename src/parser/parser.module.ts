import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudienceEntity } from './entities/audience.entity';
import { GroupEntity } from './entities/group.entity';
import { LessonEntity } from './entities/lesson.entity';
import { NoteByDateEntity } from './entities/note-by-date.entity';
import { TeacherEntity } from './entities/teacher.entity';
import { TimeEntity } from './entities/time.entity';
import { ParserService } from './parser.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    GroupEntity,
    LessonEntity,
    TimeEntity,
    AudienceEntity,
    TeacherEntity,
    NoteByDateEntity,
  ])],
  providers: [ParserService],
  exports: [ParserService]
})
export class ParserModule { }

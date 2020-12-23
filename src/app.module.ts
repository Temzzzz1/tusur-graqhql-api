import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { config } from './config/config';
import { TimetableModule } from './timetable/timetable.module';
import { ParserModule } from './parser/parser.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    TimetableModule,
    ParserModule,
  ],
})
export class AppModule {}

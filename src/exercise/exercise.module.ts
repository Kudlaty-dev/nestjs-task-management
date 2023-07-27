import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { Exercise } from './exercise.entity';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { customExerciseRepository } from './exercise.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  controllers: [ExerciseController],
  providers: [
    ExerciseService,
    {
      provide: getRepositoryToken(Exercise),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource
          .getRepository(Exercise)
          .extend(customExerciseRepository);
      },
    },
  ],
})
export class ExerciseModule {}

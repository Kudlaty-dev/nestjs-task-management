import { DataSource, Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';

export interface ExerciseRepository extends Repository<Exercise> {
  this: Repository<Exercise>;
  getAll(): Promise<Exercise>;
  createExercise(createExerciseDto: CreateExerciseDto): Promise<Exercise>;
}

export const customExerciseRepository: Pick<ExerciseRepository, any> = {
  getAll(this: Repository<Exercise>) {
    return { title: 'Returned all from Exercise repository' };
  },

  async createExercise(
    createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise> {
    const { title, description } = createExerciseDto;

    console.log('To be created: ');
    console.log(title, description);
    const task = this.create({
      title,
      description,
    });

    await this.save(task);
    return task;
  },
};

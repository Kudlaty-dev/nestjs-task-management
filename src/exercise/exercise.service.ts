import { Injectable } from '@nestjs/common';
import { Exercise } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseRepository } from './exercise.repository';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: ExerciseRepository, //Repository<Exercise>, // private exerciseRepository = new ExerciseRepository(Exercise),
  ) {}

  async getExercises() {
    return await this.exerciseRepository.getAll();
  }

  async createExercise(createExerciseDto: CreateExerciseDto) {
    return await this.exerciseRepository.createExercise(createExerciseDto);
  }

  //   getExercises() {
  //     console.log('Service fired');

  //     return this.exerciseRepository.getAll();
  //   }

  //Create a task, called from service

  //   async createExercise(createExercise: CreateExerciseDto): Promise<Exercise> {
  //     const { title, description } = createExercise;

  //     console.log('To be created: ');
  //     console.log(title, description);
  //     const task = this.exerciseRepository.create({
  //       title,
  //       description,
  //     });

  //     await this.exerciseRepository.save(task);
  //     return task;
  //   }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('exercise')
//@UseGuards(AuthGuard())
export class ExerciseController {
  //private logger = new Logger('TasksController');
  constructor(private exerciseService: ExerciseService) {}

  @Get()
  getExercises() {
    return this.exerciseService.getExercises();
  }

  @Post()
  postExercise(@Body() createExercise: CreateExerciseDto) {
    return this.exerciseService.createExercise(createExercise);
  }
}

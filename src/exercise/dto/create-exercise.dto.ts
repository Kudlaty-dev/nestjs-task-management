import { IsNotEmpty } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}

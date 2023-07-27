import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

const mockTasksRepository = () => ({});
describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: Repository<Task>;

  beforeEach(async () => {
    // Initialize a NestJs module with tasksService and tasksModule
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: Repository<Task>, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get(TasksService);
  });
});

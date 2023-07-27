import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { use } from 'passport';
import { userInfo } from 'os';

@Injectable()
export class TasksService {
  private logger = new Logger('TasksService', { timestamp: true });
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository, //private tasksRepository: Repository<Task>,
  ) {}

  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getTaskById(id, user);
  }

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    return this.tasksRepository.deleteTask(id, user);
  }
  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    return this.tasksRepository.updateTaskStatus(id, updateTaskStatusDto, user);
  }
}

// const query = this.tasksRepository.createQueryBuilder('task');
// const { status, search } = filterDto;
// query.where({ user });
// // const userId = user.id;
// // query.andWhere('task.userId = :userId', { userId });

// if (status) {
//   query.andWhere('task.status = :status', { status });
// }
// if (search) {
//   query.andWhere(
//     '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
//     { search: `%{search}%` },
//   );
// }

// try {
//   const tasks = await query.getMany();
//   return tasks;
// } catch (error) {
//   this.logger.error(
//     `Failed to get tasks for user ${
//       user.username
//     }. Filters: ${JSON.stringify(filterDto)}`,
//     error.stack,
//   );
//   throw new InternalServerErrorException();

// async findAll(): Promise<Task[]> {
//   return await this.tasksRepository.find();
// }

// getTaskById(id: string, user: User): Promise<Task> {
//   return this.tasksRepository.getTaskById(id, user);
// }

// async getTaskById(id: string, user: User): Promise<Task> {
//   const task = await this.tasksRepository.findOneBy({ id: id, user: user });
//   // This works too!
//   // const query = this.tasksRepository.createQueryBuilder('task');
//   // query.where({ user });
//   // query.andWhere('task.id = :id', { id });
//   // const task: Task = await query.getOne();
//   if (!task) {
//     throw new NotFoundException(`Task with ${id} was not found.`);
//   }
//   return task;
// }

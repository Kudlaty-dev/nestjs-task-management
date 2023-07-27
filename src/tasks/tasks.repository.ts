import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

export interface TasksRepository extends Repository<Task> {
  this: Repository<Task>;
  getTaskById(id, user): Promise<Task>;
  getTasks(filterDto: GetTasksFilterDto, user: User);
  createTask(createTaskDto: CreateTaskDto, user: User);
  deleteTask(id: string, user: User);
  updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  );
}

export const customTasksRepository: Pick<Task, any> = {
  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.findOneBy({ id: id, user: user });
    if (!task) {
      throw new NotFoundException(`Task with ${id} was not found.`);
    }
    return task;
  },

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const { status, search } = filterDto;
    query.where({ user });
    // const userId = user.id;
    // query.andWhere('task.userId = :userId', { userId });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%{search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${
          user.username
        }. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  },
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  },

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} was not found.`);
    }
    return;
  },

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    if (await this.getTaskById(id, user)) {
      return await this.save({
        id: id,
        status: status,
      });
    }
  },
};

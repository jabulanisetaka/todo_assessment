import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}
  async getTasks(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  findOne(id: string): Promise<Task> {
    return this.tasksRepository.findOne(id);
  }

  async createTask(task: Task) {
    this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async updateTask(id: number, task: Task): Promise<Task> {
    const updatedTask = await this.tasksRepository.findOne(id);
    if (!updatedTask) {
      throw new NotFoundException('Task is not found');
    }
    updatedTask.description = task.description;
    updatedTask.title = task.title;
    await updatedTask.save();
    return updatedTask;
  }
}

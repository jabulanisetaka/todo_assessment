import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.tasksService.findOne(id);
  }

  @Post() create(@Body() task: Task) {
    return this.tasksService.createTask(task);
  }

  @Patch(':id')
  async updateTask(@Body() task: Task, @Param('id') id: number): Promise<Task> {
    const taskUpdated = await this.tasksService.updateTask(id, task);
    return taskUpdated;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    this.tasksService.remove(id);
  }
}

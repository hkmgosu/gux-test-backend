// src/tasks/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Request } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(@Body() body: any, @Req() req: Request) {
    const user = { userId: 369 };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newTask = await this.tasksService.create({
      ...body,
      user_id: user.userId,
    });
    return newTask;
  }

  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(@Req() req: Request) {
    const user = { userId: 369 };
    return this.tasksService.findAll(user.userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Req() req: Request,
  ) {
    const user = { userId: 369 };
    const task = await this.tasksService.findOne(+id);
    if (!task || task.user_id !== user.userId) {
      throw new ForbiddenException('No tienes acceso a esta tarea');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.tasksService.update(+id, body);
  }

  @Delete(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = { userId: 369 };
    const task = await this.tasksService.findOne(+id);
    if (!task || task.user_id !== user.userId) {
      throw new ForbiddenException('No tienes acceso a esta tarea');
    }
    await this.tasksService.remove(+id);
    return { message: 'Tarea eliminada' };
  }
}

// src/tasks/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Task } from './task.entity';
import { PermissionsGuard } from 'src/guards/permisssions.guard';
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(
    @Body() body: Partial<Task>,
    @Req() req: { user: { userId: number } },
  ) {
    if (!body || (!body?.titulo && body?.descripcion))
      throw new BadRequestException();
    const user = req.user;
    const newTask = await this.tasksService.create({
      ...body,
      user_id: user.userId,
    });
    return newTask;
  }

  @Get()
  async findAll(@Req() req: { user: { userId: number } }) {
    const user = req.user;
    return this.tasksService.findAll(user.userId);
  }

  @UseGuards(PermissionsGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<Task>) {
    return this.tasksService.update(+id, body);
  }

  @UseGuards(PermissionsGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tasksService.remove(+id);
    return { message: 'Tarea eliminada' };
  }
}

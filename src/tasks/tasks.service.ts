import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  create(taskDto: Partial<Task>): Promise<Task> {
    const task = this.tasksRepository.create(taskDto);
    return this.tasksRepository.save(task);
  }

  findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { user_id: userId } });
  }

  findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDto: Partial<Task>): Promise<Task | null> {
    await this.tasksRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}

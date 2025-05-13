// src/permissions/permissions.service.ts
import { Injectable } from '@nestjs/common';
import { Task } from '../tasks/task.entity'; // tu entidad de tareas

@Injectable()
export class PermissionsService {
  // Verifica si el usuario puede modificar o eliminar una tarea
  canModifyTask(user: { userId: number }, task: Task): boolean {
    return task.user_id === user.userId;
  }
}

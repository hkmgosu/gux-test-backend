import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Task } from '../tasks/task.entity';
import { PermissionsService } from '../permissions/permissions.service';

interface Permission {
  user?: { userId: number }; // o el tipo que corresponda
  task: Task;
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionsService: PermissionsService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Permission>();
    const user = request.user; // user está en request tras autenticación
    const task: Task = request.task; // La tarea se cargó en el middleware al req

    if (!task || !user) {
      throw new ForbiddenException(
        'No tienes permisos para realizar esta acción',
      );
    }

    const permitido = this.permissionsService.canModifyTask(user, task);
    if (!permitido) {
      throw new ForbiddenException(
        'No tienes permisos para modificar esta tarea',
      );
    }
    return permitido;
  }
}

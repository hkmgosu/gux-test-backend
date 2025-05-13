import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class AclMiddleware implements NestMiddleware {
  constructor(private readonly tareasService: TasksService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // se creo este middleware que se activa solo ruta task/:id, la validacion de permisos lo hace un guard.
    const taskId = +req.params.id;
    const task = await this.tareasService.findOne(taskId);
    if (!task) {
      throw new UnauthorizedException();
    }
    req['task'] = task; // guardar en la request para el permissions guard
    next();
  }
}

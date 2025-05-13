import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from 'src/permissions/permissions.service';
import { AclMiddleware } from 'src/middleware/acl.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, PermissionsService],
  exports: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AclMiddleware)
      .forRoutes({ path: 'tasks/:id', method: RequestMethod.ALL });
  }
}

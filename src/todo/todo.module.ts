import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsrTodoList } from "@/entities/usr-todo-list.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UsrTodoList])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}

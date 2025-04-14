import { UsrTodoList } from "@/entities/usr-todo-list.entity";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UsrTodoListDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  contents: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  constructor(todo: UsrTodoList) {
    this.id = todo.id;
    this.contents = todo.contents;
    this.createdAt = todo.createdAt;
  }
}

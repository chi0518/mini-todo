import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UsrTodoList } from "@/entities/usr-todo-list.entity";
import { Between, Repository } from "typeorm";
import { UsrTodoListDto } from "./dto/usr-todo-list.dto";
import dayjs from "dayjs";

@Injectable()
export class TodoService {
  @InjectRepository(UsrTodoList)
  private readonly todoRepository: Repository<UsrTodoList>;

  async findTodos(type: "day" | "week", date: Date): Promise<UsrTodoListDto[]> {
    const base = date ? dayjs(date) : dayjs();
    let start = dayjs();
    let end = dayjs();

    if (type === "day") {
      start = base.startOf("day");
      end = base.endOf("day");
    } else if (type === "week") {
      start = base.startOf("week");
      end = base.endOf("week");
    }

    const todos = await this.todoRepository.find({
      where: { createdAt: Between(start.toDate(), end.toDate()) },
      order: { createdAt: "ASC" },
    });
    return todos.map((todo) => new UsrTodoListDto(todo));
  }

  async saveTodo(createTodo: CreateTodoDto): Promise<{ message: string }> {
    const { contents } = createTodo;
    const todo: UsrTodoList = new UsrTodoList();
    todo.contents = contents;
    todo.isCompleted = false;

    await this.todoRepository.save(todo);
    return { message: "할 일이 성공적으로 저장되었습니다!" };
  }
}

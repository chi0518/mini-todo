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
    let start: Date = new Date();
    let end: Date = new Date();

    if (type === "day") {
      start = base.startOf("day").toDate();
      end = base.endOf("day").toDate();
    } else if (type === "week") {
      start = base.startOf("week").toDate();
      end = base.endOf("week").toDate();
    }

    const todos = await this.todoRepository.find({
      where: { createdAt: Between(start, end) },
      order: { createdAt: "ASC" },
      relations: ["createdBy", "updatedBy"],
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

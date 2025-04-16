import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * Get all todo items
   * @returns All todo items
   **/
  @Get()
  async getTodos(
    @Query("type") type: "day" | "week",
    @Query("date") dateStr: string,
  ) {
    const date = new Date(dateStr);
    return await this.todoService.findTodos(type, date);
  }

  /**
   * Create a new todo item
   * @param createTodo - The todo item to create
   * @returns The created todo item
   **/

  @Post()
  async createTodo(@Body() createTodo: CreateTodoDto) {
    return await this.todoService.saveTodo(createTodo);
  }

  @Put()
  async updateTodo(@Body() UpdateTodoDto: UpdateTodoDto) {
    return await this.todoService.updateTodo(UpdateTodoDto);
  }
}

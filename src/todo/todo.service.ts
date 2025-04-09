import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsrTodoList } from '@/entities/usr-todo-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  @InjectRepository(UsrTodoList)
  private readonly todoRepository: Repository<UsrTodoList>;

  async saveTodo(createTodo: CreateTodoDto): Promise<{ message: string }> {
    const { contents } = createTodo;
    const todo: UsrTodoList = new UsrTodoList();
    todo.contents = contents;
    todo.isCompleted = false;

    await this.todoRepository.save(todo);
    return { message: '할 일이 성공적으로 저장되었습니다!' };
  }
}

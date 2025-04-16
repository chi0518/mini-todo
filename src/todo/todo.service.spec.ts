import { Test, TestingModule } from "@nestjs/testing";
import { TodoService } from "./todo.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UsrTodoList } from "../entities/usr-todo-list.entity";
import { Repository } from "typeorm";

describe("TodoService", () => {
  let service: TodoService;
  let todoRepository: Repository<UsrTodoList>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(UsrTodoList),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<UsrTodoList>>(
      getRepositoryToken(UsrTodoList),
    );
  });

  it("할일 등록", async () => {
    const mockCreateTodoDto = { id: 1, contents: "Test Todo" };
    const saveSpy = jest.spyOn(todoRepository, "save").mockResolvedValue({
      id: 1,
      contents: "Test Todo",
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as UsrTodoList);

    const result = await service.saveTodo(mockCreateTodoDto);
    expect(saveSpy).toHaveBeenCalledWith(
      expect.objectContaining({ contents: "Test Todo" }),
    );
    expect(result).toEqual({ message: "할 일이 성공적으로 저장되었습니다!" });
  });

  it("할일 조회 (day)", async () => {
    const type = "day";
    const date = new Date();
    const mockTodos = [
      {
        id: 1,
        contents: "Test Todo",
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const findSpy = jest
      .spyOn(todoRepository, "find")
      .mockResolvedValue(mockTodos as UsrTodoList[]);

    const result = await service.findTodos(type, date);
    expect(findSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.any(Object),
        order: { createdAt: "ASC" },
      }),
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(
      expect.objectContaining({ contents: "Test Todo" }),
    );
  });

  it("할일 조회 (week)", async () => {
    const type = "week";
    const date = new Date();
    const mockTodos = [
      {
        id: 1,
        contents: "Test Todo",
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const findSpy = jest
      .spyOn(todoRepository, "find")
      .mockResolvedValue(mockTodos as UsrTodoList[]);

    const result = await service.findTodos(type, date);
    expect(findSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.any(Object),
        order: { createdAt: "ASC" },
      }),
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(
      expect.objectContaining({ contents: "Test Todo" }),
    );
  });
});

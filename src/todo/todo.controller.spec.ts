import { Test, TestingModule } from "@nestjs/testing";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";

describe("TodoController", () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const mockTodoService = {
      findTodos: jest.fn(),
      saveTodo: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getTodos", () => {
    it("should call TodoService.findTodos with correct parameters", async () => {
      const type = "day";
      const dateStr = "2023-10-01";
      const date = new Date(dateStr);
      const mockResult = [
        { id: 1, contents: "Test Todo", createdAt: new Date() },
      ];

      // 여기서 직접 mock을 설정
      (service.findTodos as jest.Mock).mockResolvedValue(mockResult);

      const result = await controller.getTodos(type, dateStr);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findTodos).toHaveBeenCalledWith(type, date);
      expect(result).toEqual(mockResult);
    });
  });

  describe("createTodo", () => {
    it("should call TodoService.saveTodo with correct parameters", async () => {
      const createTodoDto: CreateTodoDto = {
        contents: "Test description",
      };
      const mockResult = { message: "할 일이 성공적으로 저장되었습니다!" };

      jest.spyOn(service, "saveTodo").mockResolvedValue(mockResult);

      const result = await controller.createTodo(createTodoDto);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.saveTodo).toHaveBeenCalledWith(createTodoDto);
      expect(result).toEqual(mockResult);
    });
  });
});

import { IsNotEmpty, IsString } from "class-validator";
export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  contents: string;
}

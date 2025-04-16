import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class UpdateTodoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  contents: string;
}

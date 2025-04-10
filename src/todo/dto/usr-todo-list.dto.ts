import { IsNotEmpty, IsString } from "class-validator";

export class UsrTodoListDto {
  @IsNotEmpty()
  @IsString()
  contents: string;

  id: number;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UsrTodoListDto>) {
    Object.assign(this, partial);
  }
}

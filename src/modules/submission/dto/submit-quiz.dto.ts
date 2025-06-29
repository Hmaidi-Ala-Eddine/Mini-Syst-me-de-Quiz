import { IsArray, ValidateNested, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsInt()
  questionId: number;

  @IsString()
  givenAnswer: string;
}

export class SubmitQuizDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}


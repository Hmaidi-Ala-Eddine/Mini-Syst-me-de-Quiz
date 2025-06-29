import { IsString, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class CreateQuestionDto {
  @IsString()
  content: string;

  @IsString({ each: true })
  choices: string[];

  @IsString()
  correctAnswer: string;
}

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsString()
  subject: string;

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}

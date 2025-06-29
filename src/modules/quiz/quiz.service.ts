import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>
  ) {}

  create(createQuizDto: CreateQuizDto) {
    return this.quizRepository.save(createQuizDto);
  }

  findAll() {
    return this.quizRepository.find({ relations: ['questions'] });
  }

  findOne(id: number) {
    return this.quizRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
  }
}

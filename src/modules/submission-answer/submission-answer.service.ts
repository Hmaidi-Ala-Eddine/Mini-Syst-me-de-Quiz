import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubmissionAnswer } from './entities/submission-answer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubmissionAnswerService {
  constructor(
    @InjectRepository(SubmissionAnswer)
    private readonly submissionAnswerRepo: Repository<SubmissionAnswer>,
  ) {}

  
}

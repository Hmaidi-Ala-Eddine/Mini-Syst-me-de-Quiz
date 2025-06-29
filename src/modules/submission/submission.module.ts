import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { Submission } from './entities/submission.entity';
import { SubmissionAnswer } from '../../modules/submission-answer/entities/submission-answer.entity';
import { Quiz } from '../quiz/entities/quiz.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission, SubmissionAnswer, Quiz, User]),
  ],
  providers: [SubmissionService],
  controllers: [SubmissionController],
})
export class SubmissionModule {}






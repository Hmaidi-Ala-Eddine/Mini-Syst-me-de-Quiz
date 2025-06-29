import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionAnswer } from './entities/submission-answer.entity';
import { SubmissionAnswerService } from './submission-answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubmissionAnswer])],
  providers: [SubmissionAnswerService],
  exports: [SubmissionAnswerService],
})
export class SubmissionAnswerModule {}

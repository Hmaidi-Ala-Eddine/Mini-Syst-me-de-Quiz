import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { Submission } from './entities/submission.entity';
import { SubmissionAnswer } from '../../modules/submission-answer/entities/submission-answer.entity';
import { Quiz } from '../quiz/entities/quiz.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepo: Repository<Submission>,

    @InjectRepository(SubmissionAnswer)
    private answerRepo: Repository<SubmissionAnswer>,

    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async submitQuiz(userId: number, quizId: number, dto: SubmitQuizDto) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const quiz = await this.quizRepo.findOne({
      where: { id: quizId },
      relations: ['questions'],
    });
    if (!quiz) throw new NotFoundException('Quiz not found');

    // calc score
    let score = 0;
    const answersToSave: SubmissionAnswer[] = [];

    for (const question of quiz.questions) {
      const userAnswer = dto.answers.find(a => a.questionId === question.id);

      if (userAnswer) {
        if (userAnswer.givenAnswer === question.correctAnswer) {
          score++;
        }
        const answerEntity = this.answerRepo.create({
          question,
          givenAnswer: userAnswer.givenAnswer,
        });
        answersToSave.push(answerEntity);
      }
    }

    // creation et save submition
    const submission = this.submissionRepo.create({
      user,
      quiz,
      score,
      submittedAt: new Date(),
    });

    const savedSubmission = await this.submissionRepo.save(submission);

    // Link answers 
    for (const answer of answersToSave) {
      answer.submission = savedSubmission;
    }
    await this.answerRepo.save(answersToSave);

    // feedback
    let feedback = 'Good effort! Keep practicing!';
    const percentage = (score / quiz.questions.length) * 100;

    if (percentage === 100) {
      feedback = 'Perfect score! Excellent job!';
    } else if (percentage >= 75) {
      feedback = 'Great job! You passed with flying colors.';
    } else if (percentage >= 50) {
      feedback = 'Not bad, but you can do better.';
    } else {
      feedback = 'Needs improvement. Keep studying!';
    }

    return {
      score,
      totalQuestions: quiz.questions.length,
      submissionId: savedSubmission.id,
      feedback,
    };
  }

  async getUserHistory(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    return this.submissionRepo.find({
      where: { user: { id: userId } },
      relations: ['quiz'],
      order: { submittedAt: 'DESC' },
    });
  }
}









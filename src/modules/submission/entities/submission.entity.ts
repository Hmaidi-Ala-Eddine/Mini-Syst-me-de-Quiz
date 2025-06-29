import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { SubmissionAnswer } from '../../submission-answer/entities/submission-answer.entity';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.submissions)
  user: User;

  @ManyToOne(() => Quiz, quiz => quiz.submissions)
  quiz: Quiz;

  @Column()
  score: number;

  @CreateDateColumn()
  submittedAt: Date;

  @OneToMany(() => SubmissionAnswer, answer => answer.submission)
  answers: SubmissionAnswer[];
}



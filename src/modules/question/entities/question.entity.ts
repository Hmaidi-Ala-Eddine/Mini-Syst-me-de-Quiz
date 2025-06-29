import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
 import { SubmissionAnswer } from '../../submission-answer/entities/submission-answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column("simple-array")
  choices: string[];

  @Column()
  correctAnswer: string;

  @ManyToOne(() => Quiz, quiz => quiz.questions, { onDelete: 'CASCADE' })
  quiz: Quiz;
 

  @OneToMany(() => SubmissionAnswer, sa => sa.question)
  submissionAnswers: SubmissionAnswer[];

}

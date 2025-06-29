
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Submission } from '../../submission/entities/submission.entity';
import { Question } from '../../question/entities/question.entity';

@Entity()
export class SubmissionAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Submission, submission => submission.answers)
  submission: Submission;

  @ManyToOne(() => Question)
  question: Question;

  @Column()
  givenAnswer: string;
}


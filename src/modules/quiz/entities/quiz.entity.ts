import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from 'src/modules/question/entities/question.entity';
import { Submission } from '../../submission/entities/submission.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subject: string;

  @OneToMany(() => Question, question => question.quiz /* no cascade here! */)
  questions: Question[];

  @OneToMany(() => Submission, submission => submission.quiz)
  submissions: Submission[];

}


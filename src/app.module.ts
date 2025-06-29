import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { SubmissionModule } from './modules/submission/submission.module';
import { SubmissionAnswerModule } from './modules/submission-answer/submission-answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    AuthModule,
    UserModule,
    QuizModule,
    SubmissionModule,
    SubmissionAnswerModule,
  ],
})
export class AppModule {}




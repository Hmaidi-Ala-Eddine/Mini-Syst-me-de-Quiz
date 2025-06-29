import { Controller, Post, Body, Param, Request, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { SubmissionService } from './submission.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Submissions')
@ApiBearerAuth()
@Controller()
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('quizzes/:id/submit')
  async submitQuiz(
    @Request() req,
    @Param('id') quizId: number,
    @Body() dto: SubmitQuizDto,
  ) {

    return this.submissionService.submitQuiz(req.user.userId, quizId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/history')
  async getUserHistory(@Request() req) {

    return this.submissionService.getUserHistory(req.user.userId);
  }
}






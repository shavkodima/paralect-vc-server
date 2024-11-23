import { ExceptionFilter } from '@nestjs/common';
import { HandingError } from 'src/HandindError/HandingError';
import { Jobs } from 'src/schemas/jobs.schema';

export class JobsListEntity {
  listJobs: Jobs[];
  counterJobs: number;
}

export class CreateJobEntity {
  createJob: Jobs;
  counterJobs: number;
}

export class ResponseMessage {
  status: number;
  message: string;
}

import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Jobs, JobsShema } from 'src/schemas/jobs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jobs.name, schema: JobsShema }]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}

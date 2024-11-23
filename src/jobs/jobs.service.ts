import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Jobs, JobsDocument } from 'src/schemas/jobs.schema';
import { Model } from 'mongoose';
import { JobsListEntity, ResponseMessage } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Jobs.name) private jobsModel: Model<JobsDocument>) {}

  async findJob(id: string) {
    try {
      await this.jobsModel.findById(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async create(createJobDto: CreateJobDto): Promise<ResponseMessage> {
    try {
      const createJobs = await this.jobsModel.create(createJobDto);
      await createJobs.save();
      return { status: 200, message: 'Запись успешно добавлена' };
    } catch (error) {
      throw new HttpException(
        'Ошибка при добавлении отклика',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findAllJobs(page): Promise<JobsListEntity> {
    const count = await this.jobsModel.countDocuments({}).exec();
    const objPagination = {
      limit: 4,
    };

    const jobs = await this.jobsModel
      .find()
      .skip(+page === 1 ? 0 : +page * objPagination.limit - objPagination.limit)
      .limit(objPagination.limit)
      .exec();

    return { listJobs: jobs, counterJobs: +count };
  }

  async update(
    id: string,
    updateJobDto: UpdateJobDto,
  ): Promise<ResponseMessage> {
    try {
      const checkJob = await this.findJob(id);
      if (checkJob) {
        await this.jobsModel.findByIdAndUpdate(id, updateJobDto);
        return { status: 200, message: 'Запись успешно обновлена' };
      }
      throw new HttpException(
        'Отклик не найден в базе данных',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при обновлении. ' + error.message,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async remove(id: string): Promise<ResponseMessage> {
    try {
      const checkJob = await this.findJob(id);
      if (checkJob) {
        await this.jobsModel.findByIdAndDelete(id);
        return { status: 200, message: 'Запись успешно удалена' };
      }
      throw new HttpException(
        'Отклик не найден в базе данных',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при удалении ' + error.message,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}

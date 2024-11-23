import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'jobs_db' }),
    MongooseModule.forRoot(
      'mongodb://mongo:ayNEnzTUSFGZcdHpsBlKUUbHhEvxmnwA@autorack.proxy.rlwy.net:15781',
    ),
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

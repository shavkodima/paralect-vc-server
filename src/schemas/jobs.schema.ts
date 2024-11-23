import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Jobs {
  @Prop()
  id: number;
  @Prop({ required: true })
  nameCompany: string;
  @Prop({ required: true })
  nameVacancy: string;
  @Prop({ required: true })
  salary: string;
  @Prop({ required: true })
  status: boolean;
  @Prop()
  desc: string;
}

export type JobsDocument = Jobs & Document;

export const JobsShema = SchemaFactory.createForClass(Jobs);

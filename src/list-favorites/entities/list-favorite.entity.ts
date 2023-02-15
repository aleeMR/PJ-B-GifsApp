import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ListFavorite extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  id: string;

  @Prop({ default: '' })
  url: string;

  @Prop({ default: '' })
  title: string;
}

export const ListFavoriteSchema = SchemaFactory.createForClass(ListFavorite);

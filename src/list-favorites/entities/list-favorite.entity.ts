import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ListFavorite extends Document {
  @Prop({
    unique: false,
    index: true,
  })
  id: string;

  @Prop({ default: '' })
  url: string;

  @Prop({ default: '' })
  title: string;

  @Prop()
  userEmail: string;
}

export const ListFavoriteSchema = SchemaFactory.createForClass(ListFavorite);

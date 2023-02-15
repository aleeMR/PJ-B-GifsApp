import { Type } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ListFavorite } from '../../list-favorites';

@Schema()
export class User extends Document {

  @Prop({
    unique: true,
    index: true,
  })
  email: string;

  @Prop({})
  password: string;

  @Prop({})
  firstName: string;

  @Prop({})
  lastName: string;

  @Prop({ default: '' })
  image: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: ListFavorite.name }],
    default: [],
  })
  @Type(() => ListFavorite)
  listFavorites: ListFavorite[];
}

export const UserSchema = SchemaFactory.createForClass(User);

import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { Events } from '../interfaces';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Events[];
}

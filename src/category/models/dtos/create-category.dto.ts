import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;
}

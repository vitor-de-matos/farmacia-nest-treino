import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDTO {
  @ApiProperty({
    required: true,
    example: 'Bebidas',
    description: 'Nome da categoria do produto',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

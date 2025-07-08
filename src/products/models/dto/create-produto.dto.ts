import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMidiaJobDTO } from 'src/media/models/dtos/create-midia-others.dto';
import { TipoTarja } from '../entity/product.entity';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';

export class CreateProductDTO extends CreateMidiaJobDTO {
  @ApiPropertyOptional({
    example: 1,
    description: 'Id da categoria do produto',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'ID do fabricante do produto',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  manufacturerId?: number;

  @ApiProperty({
    required: true,
    example: 'Dipirona 500mg',
    description: 'Nome do produto',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Medicamento para dor e febre',
    description: 'Descrição do produto',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: true,
    example: 19.99,
    description: 'Preço do produto em reais',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({
    enum: TipoTarja,
    description:
      'Tipo de tarja do medicamento (ex: VERMELHA, PRETA, SEM_TARJA)',
  })
  @IsOptional()
  @IsEnum(TipoTarja)
  labelType?: TipoTarja;

  @ApiProperty({
    required: true,
    example: 'true',
    description: 'Indica se o produto é controlado',
  })
  @IsNotEmpty()
  @IsString()
  controlled: string;
}

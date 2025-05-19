import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

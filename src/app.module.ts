import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './shared/config/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: [__dirname + '/../.env'],
    }),
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

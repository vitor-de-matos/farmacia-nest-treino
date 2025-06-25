import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './shared/config/config';
import { Module } from '@nestjs/common';
import { BatchModule } from './batch/batch.module';
import { ItemSaleModule } from './itemSale/item-sale.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { MidiaModule } from './media/media.module';
import { PaymentModule } from './payment/payment.module';
import { PersonModule } from './person/person.module';
import { ProductModule } from './products/product.module';
import { SalesModule } from './sales/sales.module';
import { BatchPromotionModule } from './batchPromotion/batch-promotion.module';
import { CategoryModule } from './category/category.module';
import { EmployeeLoginModule } from './employee-login/employee-login.module';
import { AuthModule } from './auth/auth.module';
import { StockModule } from './stock/stock.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: [__dirname + '/../.env'],
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    SharedModule,
    AuthModule,
    EmployeeLoginModule,
    BatchModule,
    BatchPromotionModule,
    CategoryModule,
    ItemSaleModule,
    ManufacturerModule,
    MidiaModule,
    PaymentModule,
    PersonModule,
    ProductModule,
    StockModule,
    SalesModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}

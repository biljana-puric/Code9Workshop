import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import {Order} from "./order/order.entity";
@Module({
  imports: [OrderModule,
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [Order]
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

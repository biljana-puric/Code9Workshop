import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CartItem} from './cart.entity';

@Module({
  imports: [CartModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [CartItem]
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

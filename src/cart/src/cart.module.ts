import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', // Specify the path to your SQLite database file
      entities: [Cart], // Add your entity classes here
      synchronize: true // Automatically create database schema
    }),
    TypeOrmModule.forFeature([Cart])
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}

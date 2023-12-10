import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite', // Specify the path to your SQLite database file
      entities: [Product], // Add your entity classes here
      synchronize: true // Automatically create database schema
    }),
    TypeOrmModule.forFeature([Product])
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}

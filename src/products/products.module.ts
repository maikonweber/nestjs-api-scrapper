import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'prisma/PrismaModule';

@Module({
  controllers: [ProductsController],
  imports: [PrismaModule],
  providers: [ProductsService],
})
export class ProductsModule { }

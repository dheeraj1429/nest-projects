import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthguard } from 'src/auth/jwt-auth.guard';

@Controller('product')
export class ProductController {
   constructor(private readonly productService: ProductService) {}

   @UseGuards(JwtAuthguard)
   @Get('/')
   async getAllProducts(): Promise<string> {
      return this.productService.getAllProducts();
   }
}

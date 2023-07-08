import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
   constructor(private readonly productService: ProductService) {}

   @Get('/')
   async getAllProducts(): Promise<string> {
      return this.productService.getAllProducts();
   }
}

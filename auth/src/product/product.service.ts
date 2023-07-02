import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
   constructor() {}

   async getAllProducts(): Promise<string> {
      return 'this is working now';
   }
}

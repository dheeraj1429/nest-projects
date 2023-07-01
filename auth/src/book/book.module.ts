import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [AuthModule, BookService],
  controllers: [BookController],
})
export class BookModule {}

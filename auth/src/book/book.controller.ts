import { Controller, Get, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  getAllBooks() {
    return this.bookService.getAllBooks();
  }
}

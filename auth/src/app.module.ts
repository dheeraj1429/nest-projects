import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    AuthModule,
    BookModule,
  ],
  controllers: [],
  providers: [PassportModule],
  exports: [PassportModule],
})
export class AppModule {
  constructor() {}
}

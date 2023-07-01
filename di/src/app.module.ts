import {  Module } from '@nestjs/common';
import { DiModule } from './di/di.module';

// stander providers.
// @Injectable

// custom providers
// custom object save in ioc container
// object
// unique id: string.

@Module({
  imports: [DiModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(@Inject('APP_CONSTAINS') private readonly constains: any) {
    console.log(constains);
  }
}

import { Inject, Module } from '@nestjs/common';
import { LogginProvider } from './providers/login.provider';

// custom providers
const constains = {
  dbName: 'Mongodb',
  dbPassword: 'DbDHEXjhasnAs23A@!3S',
};

const constainsProvider = { useValue: constains, provide: 'APP_CONSTAINS' };

@Module({
  imports: [],
  controllers: [],
  providers: [LogginProvider, constainsProvider],
  exports: [LogginProvider, constainsProvider],
})
export class DiModule {
  constructor(private readonly login: LogginProvider) {
    // login.logError('ohh this is some error!');
    // login.logSuccess('This is new login');
    // login.logInfo('This is new login');
  }
}

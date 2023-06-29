import { Injectable } from '@nestjs/common';
import { red, green, blue } from 'chalk';

@Injectable()
export class LogginProvider {
  logError(message: string) {
    console.log(red(message));
  }

  logSuccess(message: string) {
    console.log(green(message));
  }

  logInfo(message: string) {
    console.log(blue(message));
  }
}

import {
   CallHandler,
   ExecutionContext,
   Injectable,
   NestInterceptor,
   UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { TransformInterceptorInterface } from '../shared/interfaces/common.interface';

@Injectable()
export class TransformInterceptor<T>
   implements NestInterceptor<T, TransformInterceptorInterface<T>>
{
   intercept(
      context: ExecutionContext,
      next: CallHandler,
   ): Observable<TransformInterceptorInterface<T>> {
      console.log(context);
      return next.handle().pipe(
         map((item) => {
            return item;
         }),
      );
   }
}

export function SerializeInterceptor() {
   return UseInterceptors(new TransformInterceptor());
}

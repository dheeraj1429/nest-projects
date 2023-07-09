import { Observable } from 'rxjs';
export type jwtGuardResponse = boolean | Promise<boolean> | Observable<boolean>;

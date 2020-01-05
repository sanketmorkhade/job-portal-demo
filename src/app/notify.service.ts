import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class NotifyService {

  private subject = new Subject<any>();

    notifyOther(message: boolean) {
        this.subject.next({ isLogin: message });
    }

    channel(): Observable<any> {
        return this.subject.asObservable();
    }

}
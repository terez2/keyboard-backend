import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {
  /**
   * An RXJS Subject that may act as a bridge, e.g. between Controller(s) and Gateway(s)
   */
  private readonly messageSubject = new Subject<{ command: string }>();

  /**
   * An RxJS Observable that anyone can subscribe to
   */
  readonly message$ = this.messageSubject.asObservable();

  /**
   * Send a message to all connected subscribers
   * @param value The message
   */
  sendMessage(value: string): void {
    this.messageSubject.next({ command: value });
  }

  getHello(): string {
    return 'Hello World!';
  }
}

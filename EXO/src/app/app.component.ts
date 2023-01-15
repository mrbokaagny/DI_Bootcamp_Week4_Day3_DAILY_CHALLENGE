import { Component , ElementRef , ViewChild , OnInit} from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EXO';

  @ViewChild("my_element")
  my_element!: ElementRef;

  obs : Observable<any>  | undefined ;

  tracker(element: HTMLElement) {
    return new Observable(observer => {
      const onfocus$ = fromEvent(element, 'focus');
      const onblur$ = fromEvent(element, 'blur');
      const onfocussubscription = onfocus$.subscribe(event => observer.next(event));
      const onblursubscription = onblur$.subscribe(event => observer.next(event));
      return () => {
        onfocussubscription.unsubscribe();
        onblursubscription.unsubscribe();
      }
    });
  }

  constructor() {

  }
  ngOnInit(): void {
      this.obs = this.tracker(this.my_element.nativeElement)
      console.log(this.my_element)
      this.obs!.subscribe(event => console.log(event));
  }


}

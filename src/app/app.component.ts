import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fd-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  //
}

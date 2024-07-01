import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fd-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}

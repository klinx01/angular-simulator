import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IUserCD } from '../IUserCD';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {

  @Input({ required: true }) user!: IUserCD;

}

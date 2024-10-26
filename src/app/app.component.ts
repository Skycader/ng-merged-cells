import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzDemoTableGroupingColumnsComponent } from './table/table.component';
import { SuperTableComponent } from './super-table/super-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NzDemoTableGroupingColumnsComponent,SuperTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-zorro-merged-cells';
}

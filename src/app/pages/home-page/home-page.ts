
import { Navbar } from '../../components/navbar/navbar';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableRoute } from "../../components/table-route/table-route";

@Component({
  selector: 'app-home-page',
  imports: [
    Navbar,
    TableRoute
],
  standalone: true,
  templateUrl: './home-page.html',
  styleUrl: './home-page.less'
})
export class HomePage {
}


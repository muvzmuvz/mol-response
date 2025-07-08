
import { Navbar } from '../../components/navbar/navbar';
import { BrowserModule } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableRoute } from "../../components/table-route/table-route";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  imports: [
    Navbar,
    HttpClientModule,
    TableRoute,
],
  standalone: true,
  templateUrl: './home-page.html',
  styleUrl: './home-page.less'
})
export class HomePage {
}


import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected title = 'mol-response';
}

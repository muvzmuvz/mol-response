import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

import { TuiTable } from '@taiga-ui/addon-table';
import { TuiStatus } from '@taiga-ui/kit';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import {
  TuiInputDateRange,
  TuiCalendarRange,
} from '@taiga-ui/kit';
import { TuiTextfield } from '@taiga-ui/core';

import { HistoryService } from '../../service/historyService/history-service';
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    TuiTable,
    TuiStatus,
    TuiTextfield,
    TuiInputDateRange,
    TuiCalendarRange,
    Navbar
],
  templateUrl: './history-page.html',
  styleUrl: './history-page.less',
})
export class HistoryPage implements OnInit {
  constructor(private historyService: HistoryService) {}

  protected data: any[] = [];
  protected routeOptions: { id: string; name: string }[] = [];
  protected size: 's' | 'm' | 'l' = 'm';

  protected route = 'all';
  protected dateRange: TuiDayRange | null = null;

  protected minDate = new TuiDay(2023, 0, 1); // Январь 2023
  protected maxDate = TuiDay.currentLocal(); // Сегодня

  ngOnInit(): void {
    this.loadHistory();
  }

  private loadHistory(): void {
    this.historyService.getAll().subscribe((history) => {
      this.data = history.map((h) => ({
        routeTitle: h.client.routeTitle,
        organization: h.client.organization,
        name: h.client.name,
        phone: h.client.phone,
        status: h.status,
        date: h.date,
      }));

      const routeNames = Array.from(
        new Set(
          this.data.map((d) => d.routeTitle?.split('-')[0]).filter(Boolean)
        )
      );
      this.routeOptions = [
        { id: 'all', name: 'Все маршруты' },
        ...routeNames.map((n) => ({ id: n, name: n })),
      ];
    });
  }

  protected get filteredData() {
    return this.data.filter((item) => {
      const routeMatch =
        this.route === 'all' ||
        item.routeTitle.toLowerCase().startsWith(this.route.toLowerCase());

      const date = new Date(item.date);
      const dateMatch =
        !this.dateRange ||
        (date >= this.dateRange.from.toLocalNativeDate() &&
          date <= this.dateRange.to.toLocalNativeDate());

      return routeMatch && dateMatch;
    });
  }

  protected getStatusColor(status: string): string {
    switch (status) {
      case 'Выполнено':
        return 'var(--tui-status-positive)';
      case 'Не выполнено':
        return 'var(--tui-status-negative)';
      default:
        return 'var(--tui-status-warning)';
    }
  }
}

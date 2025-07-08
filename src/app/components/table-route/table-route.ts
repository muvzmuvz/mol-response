import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { OperatorService, Operator } from '../../service/operator';

import {
  TuiAutoColorPipe,
  TuiButton,
  TuiDropdown,
  TuiIcon,
  TuiInitialsPipe,
  TuiLink,
  TuiTitle,
  tuiItemsHandlersProvider,
  TuiTextfield,
  TuiLabel,
  TuiDialog,
} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiCheckbox,
  TuiChip,
  TuiItemsWithMore,
  TuiProgressBar,
  TuiRadioList,
  TuiStatus,
} from '@taiga-ui/kit';
import { TuiCell } from '@taiga-ui/layout';
import { TuiTable, TuiTableFilters } from '@taiga-ui/addon-table';

interface RouteOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-table-route',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NgIf,
    TuiAutoColorPipe,
    TuiAvatar,
    TuiBadge,
    TuiButton,
    TuiCell,
    TuiCheckbox,
    TuiChip,
    TuiDropdown,
    TuiIcon,
    TuiInitialsPipe,
    TuiItemsWithMore,
    TuiLink,
    TuiProgressBar,
    TuiRadioList,
    TuiStatus,
    TuiTable,
    TuiTableFilters,
    TuiTitle,
    TuiLabel,
    TuiTextfield,
    TuiDialog,
  ],
  templateUrl: './table-route.html',
  styleUrls: ['./table-route.less'],
  providers: [
    tuiItemsHandlersProvider<RouteOption>({
      stringify: signal((item) => item.name),
      identityMatcher: signal((a, b) => a.id === b.id),
    }),
  ],
})
export class TableRoute implements OnInit {
  data: Operator[] = [];

  protected readonly sizes = ['l', 'm', 's'] as const;
  protected size = this.sizes[0];

  protected search = '';

  protected readonly form = new FormGroup({
    route: new FormControl<string>('all'),
  });

  get routeControl(): FormControl<string> {
    return this.form.get('route') as FormControl<string>;
  }

  routeOptions: RouteOption[] = [];

  isAddModalOpen = false;
  isEditModalOpen = false;
  editingRouteId: number | null = null;

  addForm = new FormGroup({
    routeTitle: new FormControl('', { nonNullable: true }),
    organization: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    status: new FormControl('В процессе', { nonNullable: true }),
  });

  editForm = new FormGroup({
    routeTitle: new FormControl('', { nonNullable: true }),
    organization: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    status: new FormControl('', { nonNullable: true }),
  });

  constructor(private operatorService: OperatorService) {}

  ngOnInit() {
    this.loadOperators();
  }

  loadOperators() {
    this.operatorService.getOperators().subscribe({
      next: (operators) => {
        this.data = operators;
        this.updateRouteOptions();
      },
      error: (err) => console.error('Ошибка загрузки операторов', err),
    });
  }

  updateRouteOptions() {
    const routes = this.data
      .map((item) => item.checkbox.title.split('-')[0])
      .filter(Boolean);

    const uniqueRoutes = Array.from(new Set(routes));

    this.routeOptions = [
      { id: 'all', name: 'Все маршруты' },
      ...uniqueRoutes.map((name) => ({ id: name, name })),
    ];
  }

  get filteredData() {
    const selectedRouteId = this.routeControl.value;
    const searchTerm = this.search ? this.search.toLowerCase().trim() : '';

    let filtered = this.data;
    if (selectedRouteId !== 'all') {
      filtered = filtered.filter((item) =>
        item.checkbox.title.toLowerCase().startsWith(selectedRouteId.toLowerCase()),
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          this.isMatch(item.checkbox.title, searchTerm) ||
          this.isMatch(item.title.title, searchTerm) ||
          this.isMatch(item.cell.name, searchTerm) ||
          this.isMatch(item.cell.phone, searchTerm) ||
          this.isMatch(item.status.value, searchTerm),
      );
    }

    return filtered;
  }

  private isMatch(value: string | undefined, searchTerm: string): boolean {
    return value?.toLowerCase().includes(searchTerm) ?? false;
  }

  protected get checked(): boolean | null {
    const every = this.data.every(({ selected }) => selected);
    const some = this.data.some(({ selected }) => selected);
    return every || (some && null);
  }

  protected onCheck(checked: boolean): void {
    this.data.forEach((item) => {
      item.selected = checked;
    });
  }

  addRoute() {
    this.isAddModalOpen = true;
  }

  submitAddForm() {
    const { routeTitle, organization, name, phone, email, status } = this.addForm.value;
    const newOperator: Partial<Operator> = {
      checkbox: { title: routeTitle! },
      title: { icon: '@tui.user', title: organization!, subtitle: 'Дополнительная информация' },
      cell: { phone: phone!, name: name!, email: email! },
      status: { value: status!, color: this.getStatusColor(status!) },
    };

    this.operatorService.createOperator(newOperator).subscribe({
      next: () => {
        this.loadOperators();
        this.isAddModalOpen = false;
        this.addForm.reset();
      },
      error: (err) => {
        console.error('Ошибка добавления оператора', err);
      },
    });
  }

  editRoute(id: number) {
    const item = this.data.find((d) => d.id === id);
    if (!item) return;

    this.editingRouteId = id;
    this.editForm.setValue({
      routeTitle: item.checkbox.title,
      organization: item.title.title,
      name: item.cell.name,
      phone: item.cell.phone,
      email: item.cell.email,
      status: item.status.value,
    });

    this.isEditModalOpen = true;
  }

  submitEditForm() {
    if (this.editingRouteId === null) return;

    const { routeTitle, organization, name, phone, email, status } = this.editForm.value;
    const updatedOperator: Partial<Operator> = {
      checkbox: { title: routeTitle! },
      title: { icon: '@tui.user', title: organization! },
      cell: { phone: phone!, name: name!, email: email! },
      status: { value: status!, color: this.getStatusColor(status!) },
    };

    this.operatorService.updateOperator(this.editingRouteId, updatedOperator).subscribe({
      next: () => {
        this.loadOperators();
        this.isEditModalOpen = false;
        this.editingRouteId = null;
      },
      error: (err) => {
        console.error('Ошибка обновления оператора', err);
      },
    });
  }

  deleteRoute(id: number) {
    this.operatorService.deleteOperator(id).subscribe({
      next: () => this.loadOperators(),
      error: (err) => console.error('Ошибка удаления', err),
    });
  }

  cancelModals() {
    this.isAddModalOpen = false;
    this.isEditModalOpen = false;
  }

  private getStatusColor(status: string): string {
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

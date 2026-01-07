import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  cell?: (row: T) => string | number | boolean | null | undefined;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T = any> {
  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];
  @Input() loading = false;
  @Input() showIndex = false;
  @Input() rowActions: Array<{ id: string; label: string }> = [];

  // pagination inputs
  @Input() page = 1;
  @Input() pageSize = 10;
  // Optional: supply server total. Defaults to data length for client-side.
  @Input() total?: number;

  @Output() action = new EventEmitter<{ actionId: string; row: T }>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  onAction(id: string, row: T): void {
    this.action.emit({ actionId: id, row });
  }

  valueOf(row: T, col: TableColumn<T>) {
    return col.cell ? col.cell(row) : (row as any)[col.key];
  }

  trackByIndex(i: number): number {
    return i;
  }

  // pagination helpers
  get effectiveTotal(): number {
    return this.total ?? this.data.length;
  }

  get startIndex(): number {
    return Math.max(0, (this.page - 1) * this.pageSize);
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.effectiveTotal);
  }

  get pageCount(): number {
    if (this.pageSize <= 0) return 1;
    return Math.max(1, Math.ceil(this.effectiveTotal / this.pageSize));
  }

  get pagedData(): T[] {
    // If using client-side pagination, slice locally
    if (this.total === undefined) {
      return this.data.slice(this.startIndex, this.endIndex);
    }
    // If total is supplied (server-side), assume parent feeds current page data
    return this.data;
  }

  goToPage(page: number): void {
    const next = Math.min(Math.max(1, page), this.pageCount);
    if (next !== this.page) {
      this.page = next;
      this.pageChange.emit(this.page);
    }
  }

  prev(): void {
    this.goToPage(this.page - 1);
  }

  next(): void {
    this.goToPage(this.page + 1);
  }

  changePageSize(size: number): void {
    const normalized = Math.max(1, Math.floor(size));
    if (normalized !== this.pageSize) {
      this.pageSize = normalized;
      // Reset to first page when page size changes
      this.page = 1;
      this.pageSizeChange.emit(this.pageSize);
      this.pageChange.emit(this.page);
    }
  }

  changePageSizeFromEvent(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const parsed = target ? Number(target.value) : this.pageSize;
    this.changePageSize(parsed);
  }
}



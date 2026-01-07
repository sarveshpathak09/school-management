import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn } from '../../../shared/components/table/table';

@Component({
  standalone: true,
  selector: 'app-teachers',
  imports: [CommonModule, TableComponent],
  templateUrl: './teachers.html',
  styleUrls: ['./teachers.scss'],
})
export class Teachers {

  columns: TableColumn<{ name: string; subject: string; phone: string }>[] = [
    { key: 'name', header: 'Name',align: 'center' },
    { key: 'subject', header: 'Subject', align: 'center' },
    { key: 'phone', header: 'Phone', align: 'center' },
  ];

  rows = [
    { name: 'Meera Sharma', subject: 'Mathematics', phone: '98765 43210' },
    { name: 'Arun Verma', subject: 'Science', phone: '98765 11111' },
    { name: 'Nisha Gupta', subject: 'English', phone: '98765 22222' },
    { name: 'Vikram Singh', subject: 'Chemistry', phone: '98765 33333' },
    { name: 'Priya Nair', subject: 'Biology', phone: '98765 44444' },
    { name: 'Rohit Das', subject: 'Physics', phone: '98765 55555' },
    { name: 'Kavita Rao', subject: 'History', phone: '98765 66666' },
    { name: 'Sanjay Kumar', subject: 'Geography', phone: '98765 77777' },
    { name: 'Anita Jain', subject: 'Civics', phone: '98765 88888' },
    { name: 'Mohit Suri', subject: 'Computer', phone: '98765 99999' },
  ];

  actions = [
    { id: 'view', label: 'View' },
    { id: 'edit', label: 'Edit' },
  ];

  // pagination state (client-side demo)
  page = 1;
  pageSize = 5;

  onAction(e: { actionId: string; row: any }) {
    // handle UI action (open modal / navigate)
    // keeping it minimal as per "design UI" request
    console.log('Teacher action:', e);
  }

  onPageChange(page: number) {
    this.page = page;
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.page = 1;
  }
}

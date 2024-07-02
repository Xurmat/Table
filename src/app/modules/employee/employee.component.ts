import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee, EmployeeRequest } from '../../interfaces/employee';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  employees: Employee[] = [];
  globalFilter = '';
  request: EmployeeRequest = {
    first: 0,
    rows: 10,
    sortField: '',
    sortOrder: 1,
    filter: {
      firstName: ''
    }
  }
  constructor(private employeeService: EmployeeService) { }



  getEmployeeList() {
    this.employeeService.getEmployees(this.request).subscribe(
      data => this.employees = data
    )
  }

  loadEmployees($event: TableLazyLoadEvent) {
    console.log($event);
    this.request.sortField = $event.sortField || '';
    this.request.sortOrder = $event.sortOrder || 1;
    this.request.first = $event.first || 0
    this.getEmployeeList();
  }

  filterEmployee() {
    this.request = {
      ...this.request,
      first: 0,
      filter: {
        firstName: this.globalFilter
      }
    }
    this.getEmployeeList();
  }
}

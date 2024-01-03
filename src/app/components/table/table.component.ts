import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { LocalStorageService } from 'src/app/local-storage.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('paginator',{static:true}) paginator!: MatPaginator;

  constructor(private localStorage:LocalStorageService) {}

  displayedColumns: string[]=[] ;
  dataSource : any;
  originalData = new Map<number, User>();

  ngOnInit(): void {
    this.displayedColumns =  ['id', 'firstname', 'secondname', 'lastname', 'age','action'];
    this.loadDataFromIndexedDB();

  }

  async loadDataFromIndexedDB() {
    try {
      const allData = await this.localStorage.getAllData();
      this.dataSource = new MatTableDataSource(allData);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  deleteRow(rowId: number) {
    const itemIndex = this.dataSource.data.findIndex((obj: { id: number; }) => obj.id === rowId);
    if (itemIndex >= 0) {
      this.localStorage.deleteUserById(rowId);
      this.loadDataFromIndexedDB();
    }
  }

  updateRow(rowData: any) {
    this.originalData.set(rowData.id, { ...rowData })
    this.dataSource.data.forEach((element: {"isEdit": boolean;}) => {
      element.isEdit = false;
      this.localStorage.editUser(element);
    });

    rowData.isEdit = true;
    const itemIndex = this.dataSource.data.findIndex((obj: { id: number;}) =>obj.id === rowData.id);
    if (itemIndex >= 0) {
      this.localStorage.editUser(rowData);
      this.loadDataFromIndexedDB();
    }
  }

  saveRow(row: any) {
      this.originalData.delete(row.id);
      row.isEdit = false;
      this.localStorage.editUser(row);
      this.loadDataFromIndexedDB();
  }

  cancelEdit(row: any){
    if (this.originalData.has(row.id)) {
      const user : any= this.originalData.get(row.id);

      // Update the property
      user.isEdit = false;

      // Put the updated user object back in the map
      this.originalData.set(row.id, user);
      this.localStorage.editUser(this.originalData.get(row.id));
      this.loadDataFromIndexedDB();
    }
  }
}

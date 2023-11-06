import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/Core/core.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  title = 'pretest-angular';
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'address',
    'phone',
    'website',
    'company',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _dialog: MatDialog,
    private _userService: UserService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
      this.getUserList();
  }

  getUserList() {
    this._userService.getUserList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }

  openAddForm() {
    const dialogRef = this._dialog.open(FormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(FormComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('User Delete', 'Done')
      },
      error: console.log,
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/Core/core.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.userForm = this._fb.group({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
    });
  }

  ngOnInit(): void {
      this.userForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.userForm.valid) {
      if(this.data) {
        this._userService
          .updateData(this.data.id, this.userForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('User Succesfully Update!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._userService.addUser(this.userForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('User Successfully Addes!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

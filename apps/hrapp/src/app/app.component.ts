/* eslint-disable quotes */
import { ApiService } from './service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './model/user';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'hrapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  @ViewChild(AlertComponent) alert: AlertComponent;
  title = 'HR app';
  postUserForm : FormGroup;
  users: User[] = [];
  toggleBtn = false;

  constructor (private fb: FormBuilder, private service: ApiService) { }

  ngOnInit(): void{
   this.getUsers();
   this.postUserForm = this.fb.group({
    userId: [],
    firstName : ['', Validators.required],
    lastName : ['', Validators.required],
    address : ['', Validators.required],
    mobilePhone : ['', Validators.required],
    email : ['', Validators.required]
   });
  }

  get uForm() {
    return this.postUserForm.controls;
  }

  get userId() {
    return this.postUserForm.get('userId');
  }

  postUser(){
    console.log(this.postUserForm.value);
    if (this.postUserForm.valid){
    this.service.postUser(this.postUserForm.value).subscribe(
      null,
      err => {
        this.alert.onError(err.error.errors);
      },
      () => {
        this.getUsers();
        alert('Posted successfully!')
        this.postUserForm.reset();
      });
    }
  }

  getUsers(){
    return this.service.getUsers().subscribe(res => {
      this.users = res;
    })
  }

  resetUserForm() {
    this.toggleBtn = false;
    this.postUserForm.reset();
  }

  updateUser() {
     this.service.putUser(this.postUserForm.value).subscribe(null,
      err => {
        this.alert.onError(err.error.errors);
      }, () => {
        this.getUsers();
        alert('Updated Successfully');
        this.postUserForm.reset();
        this.toggleBtn = false;
      });
  }

  editUser(user: User){
    this.toggleBtn = true;
    this.postUserForm.setValue({
      userId : user.id,
      firstName : user.firstName,
      lastName : user.lastName,
      address : user.address,
      mobilePhone : user.mobilePhone,
      email : user.email
   })
  }

}

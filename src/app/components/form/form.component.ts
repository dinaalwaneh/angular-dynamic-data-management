import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private builder:FormBuilder, private localStorage:LocalStorageService) {}

  customerform = this.builder.group({
    id: this.builder.control('',Validators.required),
    firstName: this.builder.control('',Validators.required),
    secondName: this.builder.control('',Validators.required),
    finalName: this.builder.control('',Validators.required),
    age: this.builder.control('',Validators.required),
    isEdit:this.builder.control(false)
  });

  ngOnInit(): void {}

  saveCustomer(){
    this.localStorage.addNewUser(this.customerform.value);
  }

  clearform(){
    this.customerform.reset();
  }

}

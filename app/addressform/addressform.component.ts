import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addressform',
  templateUrl: './addressform.component.html',
  styleUrls: ['./addressform.component.css']
})
export class AddressformComponent {
submit() {
console.log(this.addressForm.value);
}
  addressForm=new FormGroup({
    doorNo:new FormControl('',[Validators.required,Validators.pattern(/^\d{1,2}\/\d{1,2}$/)]),
    street:new FormControl(''),
    area:new FormControl(''),
    city:new FormControl(''),
    state:new FormControl(''),
    zipcode:new FormControl('')
  })
  get doorNo(){
    return this.addressForm.get('doorNo');
  }
  get street(){
    return this.addressForm.get('street');
  }
  get area(){
    return this.addressForm.get('area');
  }
  get city(){
    return this.addressForm.get('city');
  }
  get state(){
    return this.addressForm.get('state');
  }
  get zipcode(){
    return this.addressForm.get('zipcode');
  }
}

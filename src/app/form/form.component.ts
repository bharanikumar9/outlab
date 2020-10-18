import { Component ,OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import {Data} from '../dataformat'
import {DataService} from '../data.service'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  constructor(private dataservice: DataService) { }
  data: Data={name: '', email: '', feedback: '', comment: ''};
  public errormsg: string;
  
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email,Validators.required]),
    feedback: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
  });


  ngOnInit() {
    this.getdata();
    
  }
  getdata(): void {
    this.dataservice.getdata()
      .subscribe(heroes =>{ this.data = heroes;
            this.registrationForm.get('name').setValue(heroes.name); 
            this.registrationForm.get('email').setValue(heroes.email);
            this.registrationForm.get('feedback').setValue(heroes.feedback);
            this.registrationForm.get('comment').setValue(heroes.comment);
          }, 
          error => {this.errormsg = error.message ;
      console.log(this.errormsg)});
              
  }
  // Submit Registration Form
  onSubmit() {
    if (this.registrationForm.valid) {
     this.dataservice.postdata(this.registrationForm.value)
        .subscribe(dat =>{
          this.data.name=dat.name;
          this.data.comment=dat.comment;
          this.data.email=dat.email;
          this.data.feedback=dat.feedback;
          alert("form submitted");},
         error => {this.errormsg=error.message;
                    alert("Form not submitted"+'\n'+this.errormsg);} );
      

    } else 
      alert("invalid form please enter valid details");
    
    }
 
}

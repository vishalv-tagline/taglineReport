import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/common';
import { CommonService } from 'src/app/services/common.service';
// import Swal from 'sweetalert2';


@Component({
  selector: 'app-tagline-leavereport',
  templateUrl: './tagline-leavereport.component.html',
  styleUrls: ['./tagline-leavereport.component.scss']
})
export class TaglineLeavereportComponent implements OnInit {

  public btnName: string = "Submit";
  public currentEditId: any;
  public userData: Users[] = [];
  public addUserForm!: FormGroup;
  public photos: any = []


  constructor(private commonService: CommonService) {
    this.addUserForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.commonService.getUser().subscribe((data: any) => {
      this.userData = data
      // console.log('data :>> ', data);
    })

    // this.commonService.getPhotos().subscribe((d) => {
    //   this.photos = d
    //   console.log('d :>> ', d);
    // })
  }

  saveUser(data: any) {
    if (this.btnName === "Submit") {
      this.commonService.postUser(this.addUserForm.value).subscribe((data: any) => {
        this.userData.push({
          userId: data.userId,
          id: data.id,
          title: data.title,
          body: data.body
        });
      })
      this.addUserForm.reset();
      console.log('Recored inserted');
    }
    else if (this.currentEditId > -1) {
      console.log('Updated Part comming');
      this.commonService.updateUser(this.userData[this.currentEditId].id, this.addUserForm.value).subscribe((responseData: any) => {
        this.userData[this.currentEditId] = responseData;
        console.log('this.currentEditId :>> ', this.currentEditId);
        console.log('responseData :>> ', responseData);
        console.log('Update recoered');
      });
      this.addUserForm.reset();
      this.btnName = "Submit";
    }
  }

  updateUser(i: number) {
    console.log('i :>> ', i);
    this.currentEditId = i;
    this.addUserForm.patchValue({
      ...this.userData[i]
    })
    this.btnName = "Update"
    console.log('index of recored :>> ', i);
    console.log('this.userData[i] :>> ', this.userData[i]);
  }

  deleteUser(data: any) {
    this.commonService.deleteUser(data).subscribe((d) => {
      let ind = this.userData.indexOf(data);
      this.userData.splice(ind, 1)
      console.log('Delete recored');
    })
  }

  viewuser(i: number) {
    this.currentEditId = i;
    console.log('i :>> ', i);
    this.commonService.patchUser(this.userData[this.currentEditId].id, this.userData[i]).subscribe((data) => {
      console.log(' this.userData[this.currentEditId].id:>> ', this.userData[this.currentEditId].id);
      console.log(' this.userData[i] :>> ', this.userData[i]);
    })
    console.log("View Profile")
  }

  // deleteUser(i: number) {
  //   console.log('User deleted');
  //   this.userData.splice(i, 1)
  // }

}

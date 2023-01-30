import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/common';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';



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
  public allUserList: number = 0;
  public pagination: number = 1;

  public photos: any = []
  public ownData: any = []

  public searchText: any;
  public fillterData: Users[] = [];

  public newUsers: any = []

  public productList: any = []

  submitted: boolean = false;
  public deleteUserId!: number;


  constructor(private commonService: CommonService, private fb: FormBuilder, private toastrService: ToastrService) {

    this.addUserForm = this.fb.group({
      userId: ["", [Validators.required]],
      title: ["", [Validators.required]],
      body: ["", [Validators.required]]
    })


  }

  get frmControl() {
    return this.addUserForm.controls;
  }


  ngOnInit(): void {
    this.fetchUserData();
    // this.fetchProduct();


    this.commonService.getOwnapi().subscribe((data) => {
      console.log('data :>> ', data);
      this.ownData = data
    })

    this.commonService.newgetUsers().subscribe((response) => {
      // console.log('response :>> ', response);
      this.newUsers = response
      console.log('this.newUsers.data :>> ', this.newUsers.data);
    })
  }

  fetchUserData() {
    this.commonService.getUser().subscribe((response: any) => {
      this.userData = response
      // this.allUserList = response.total
      // console.log('response.total :>> ', response.total);
      // console.log('data :>> ', data);
    })
  }

  renderPageUsers(event: number) {
    this.pagination = event;
    this.fetchUserData();
  }

  ownDataDelete(data: any) {
    this.commonService.deleteOwnDataDelete(data).subscribe((d) => {
      let ind = this.ownData.indexOf(data);
      this.ownData.splice(ind, 1)
      console.log('Delete recored');
    })
  }

  saveUser(data: any) {
    if (this.addUserForm.invalid) {
      this.toastrService.error('Please fill all details', 'Error', { closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      return
    }
    if (this.btnName === "Submit") {
      // delete this.addUserForm.value.id
      this.commonService.postUser(this.addUserForm.value).subscribe((data: any) => {
        this.userData.push({
          userId: data.userId,
          id: data.id,
          title: data.title,
          body: data.body
        });
      })
      this.addUserForm.reset();
      this.toastrService.success('Recored insert successfully', 'Success', { closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
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
      this.toastrService.success('Recored update successfully', 'Update', { closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
    }
  }

  updateUser(i: number) {
    this.currentEditId = i;
    const currentValue = this.userData.find((user: any) => {
      if (user.id === i) {
        return user;
      }
    })
    this.addUserForm.patchValue({
      ...currentValue
    })
    this.btnName = "Update"
    console.log('index of recored :>> ', i);
    console.log('this.userData[i] :>> ', this.userData[i]);
  }

  findId(id: number) {
    this.deleteUserId = id
    console.log('id :>> ', id);
    return id;
  }

  deleteUser() {
    console.log('this.deleteUserId :>> ', this.deleteUserId);
    this.commonService.deleteUser(this.deleteUserId).subscribe((d) => {
      const deleteId = this.userData.filter((data) => {
        return data.id !== this.deleteUserId;
      })
      console.log('deleteId :>> ', deleteId);
      this.userData = deleteId;
      this.toastrService.success('Recored delete successfully', 'Deleted', { closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
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
}

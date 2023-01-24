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
  public allUserList: number = 0;
  public pagination: number = 1;

  public photos: any = []
  public ownData: any = []

  public searchText: any;
  public fillterData: Users[] = [];

  public newUsers: any = []

  public productList: any = []


  constructor(private commonService: CommonService) {
    this.addUserForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
    this.fetchProduct();

    // this.commonService.getPhotos().subscribe((d) => {
    //   this.photos = d
    //   console.log('d :>> ', d);
    // })

    this.commonService.getOwnapi().subscribe((data) => {
      console.log('data :>> ', data);
      this.ownData = data
    })

    this.commonService.newgetUsers().subscribe((response) => {
      // console.log('response :>> ', response);
      this.newUsers = response
      console.log('this.newUsers.data :>> ', this.newUsers.data);
    })

    // console.log('this.searchText :>> ', this.searchText);
  }

  fetchUserData() {
    this.commonService.getUser(this.pagination).subscribe((response: any) => {
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
      return
    }
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

  // updateResults() {
  //   this.fillterData = (this.searchByValue(this.userData));
  // }

  // searchByValue(userData: any) {
  //   return userData.filter((user: any) => {
  //     if (this.searchText.trim() === '') {
  //       return true;
  //     } else {
  //       return user.userId.toLowerCase().includes(this.searchText.trim().toLocaleLowerCase()) || user.body.toLowerCase().includes(this.searchText.trim().toLocaleLowerCase());
  //     }
  //   })
  // }

  deleteNewUser(i: number) {
    this.commonService.newUserDelete(i).subscribe((data) => {
      let deleteId = this.newUsers.indexOf(i);
      this.newUsers.splice(this.newUsers.data.id, 1)
    })
  }

  fetchProduct() {
    this.commonService.getProduct().subscribe((response) => {
      console.log('response :>> ', response);
      this.productList = response
    })
  }

  onedeleteProduct(i: number) {
    this.commonService.deleteProduct(i).subscribe((data) => {
      let checkId = this.productList.indexOf(i);
      this.productList.splice(checkId, 1)
    })
  }
}

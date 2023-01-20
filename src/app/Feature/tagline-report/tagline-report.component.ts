import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-tagline-report',
  templateUrl: './tagline-report.component.html',
  styleUrls: ['./tagline-report.component.scss'],
})
export class TaglineReportComponent implements OnInit {

  public reportForm!: FormGroup;
  public myDate = new Date();
  public getDate = this.myDate.getDate()
  public months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  public getMonth = this.months[this.myDate.getMonth()]
  public getFullYear = this.myDate.getFullYear()

  // public errorMsg: string = "Please fill first"

  public showError: boolean = false;
  public showError2: boolean = false;
  public showError3: boolean = false;
  public showError4: boolean = false;
  public showError5: boolean = false;


  formControl() {
    return this.fb.control(null, [Validators.required])
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private commonService: CommonService) {

    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
    //   console.log("Api Data :>> ", data);
    // });

    this.reportForm = this.fb.group({
      clientName: ["", [Validators.required]],
      projectName: ["", [Validators.required]],
      listCompletedTasks: this.fb.array([
        this.formControl()
      ]),
      listRunningTasks: this.fb.array([
        this.formControl()
      ]),
      listPendingTasks: this.fb.array([
        this.formControl()
      ]),
      listQuieries: this.fb.array([
        this.formControl()
      ]),
      listNotes: this.fb.array([
        this.formControl()
      ]),
      yourName: ["", [Validators.required]]
    })

  }

  ngOnInit(): void {
    // this.commonService.getUser().subscribe((response: any) => {
    //   console.log('response :>> ', response);
    // })
  }

  get frmControl() {
    return this.reportForm.controls;
  }

  get listCompletedTasks() {
    return (this.frmControl['listCompletedTasks'] as FormArray);
  }

  get listRunningTasks() {
    return (this.frmControl['listRunningTasks'] as FormArray);
  }

  get listPendingTasks() {
    return (this.frmControl['listPendingTasks'] as FormArray);
  }

  get listQuieries() {
    return (this.frmControl['listQuieries'] as FormArray);
  }

  get listNotes() {
    return (this.frmControl['listNotes'] as FormArray);
  }

  addCompletedTask(groupName: string) {



    switch (groupName) {
      case 'completed':
        this.showError = true;
        if (this.listCompletedTasks.invalid) {
          console.log('Please fill first...')
          // let errorMsg = "Please fill first";
          // (document.getElementById('errMsg') as HTMLInputElement).innerText = errorMsg
        }
        else {
          this.listCompletedTasks.push(this.formControl());
          this.showError = false;
          console.log('this.listCompletedTasks.value :>> ', this.listCompletedTasks.value);
        }
        break;
      case 'running':
        this.showError2 = true;
        if (this.listRunningTasks.invalid) {
          console.log("please");
        }
        else {

          this.listRunningTasks.push(this.formControl());
          this.showError2 = false;
        }
        break;
      case 'pending':
        this.showError3 = true;
        if (this.listPendingTasks.invalid) {
          console.log('dsffd');
        }
        else {
          this.listPendingTasks.push(this.formControl())
          this.showError3 = false;
        }
        break;
      case 'query':
        this.showError4 = true;
        if (this.listQuieries.invalid) {
          console.log('asaasf :>> ');
        }
        else {
          this.listQuieries.push(this.formControl())
          this.showError4 = false;
        }
        break;
      case 'note':
        this.showError5 = true;
        if (this.listNotes.invalid) {
          console.log("safasf");
        }
        else {
          this.listNotes.push(this.formControl())
          this.showError5 = false;
        }
        break;
    }
  }

  deleteTasks(groupName: string, i: number) {
    switch (groupName) {
      case 'completed':
        this.listCompletedTasks.removeAt(i)
        break;
      case 'running':
        this.listRunningTasks.removeAt(i)
        break;
      case 'pending':
        this.listPendingTasks.removeAt(i)
        break;
      case 'query':
        this.listQuieries.removeAt(i)
        break;
      case 'note':
        this.listNotes.removeAt(i)
        break;
    }
  }

  copyText() {
    let textCollect = (document.getElementById('copyBoard') as HTMLElement).innerText;
    // console.log('textCollect :>> ', textCollect)
    navigator.clipboard.writeText(textCollect)
    let btnCopied = (document.getElementById('btnCopy') as HTMLElement);
    btnCopied.innerText = "Copied!"
    // btnCopied.innerText = `<i class="fa-duotone fa-check"></i>`
  }
}

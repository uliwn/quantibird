import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit, OnChanges {
  @Input() modalid: string;
  @Input() editValue: any;

  editModalForm: FormGroup;
  editControl = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder) {
    this.editModalForm = this.formBuilder.group({
      title: this.editControl
    });
  }

  ngOnInit() {
    if (this.editValue) {
      this.editModalForm.setValue({title: this.editValue.title});
    }
  }

  ngOnChanges() {
    if (this.editValue) {
      this.editModalForm.setValue({title: this.editValue.title});
    }
  }

  setValue() {
    this.editValue.title = this.editModalForm.value.title;
    $(`#${this.modalid}`).modal('hide');
  }

}

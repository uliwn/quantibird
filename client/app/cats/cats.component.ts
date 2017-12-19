import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CatService } from '../services/cat.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Cat } from '../shared/models/cat.model';
import { AuthService } from '../services/auth.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {

  survey = new Cat();
  cats: Cat[] = [];
  questions = [];
  answers = [];
  isLoading = true;
  isEditing = false;

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  addQuestionForm: FormGroup;
  questionTitle = new FormControl('', Validators.required);

  addAnswerForm: FormGroup;
  answerTitle = new FormControl('', Validators.required);

  constructor(private catService: CatService,
              private auth: AuthService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getCats();
    this.addCatForm = this.formBuilder.group({
      name: this.name,
      description: this.description
    });
    this.addQuestionForm = this.formBuilder.group({
      title: this.questionTitle
    });
    this.addAnswerForm = this.formBuilder.group({
      title: this.answerTitle
    });
  }

  getCats() {
    this.catService.getCats(this.auth.currentUser).subscribe(
      data => this.cats = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCat() {
    const body = this.addCatForm.value;
    body.userId = this.auth.currentUser._id;
    body.questions = this.questions;

    this.catService.addCat(body).subscribe(
      res => {
        this.cats.push(res);
        this.questions = [];
        this.addCatForm.reset();
        this.toast.setMessage('Survey added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  addQuestion() {
    const question = this.addQuestionForm.value;
    question.key = this.questions.length;
    question.answers = _.clone(this.answers);
    this.questions.push(question);

    this.addQuestionForm.reset();
  }

  addAnswer() {
    const answer = this.addAnswerForm.value;
    answer.key = this.answers.length;
    this.answers.push(answer);

    this.addAnswerForm.reset();
  }

  enableEditing(cat: Cat) {
    this.isEditing = true;
    this.survey = cat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.survey = new Cat();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat: Cat) {
    this.catService.editCat(cat).subscribe(
      () => {
        this.isEditing = false;
        this.survey = cat;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCat(cat: Cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.catService.deleteCat(cat).subscribe(
        () => {
          const pos = this.cats.map(elem => elem._id).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  deleteQuestion(question) {
    _.remove(this.questions, q => q.key === question.key);
  }

  deleteAnswer(answer) {
    _.remove(this.answers, a => a.key === answer.key);
  }

}

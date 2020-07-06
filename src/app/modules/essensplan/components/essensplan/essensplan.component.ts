import {Component, OnInit} from '@angular/core';
import {Essensplan} from '../../model/classes/essensplan';
import {EssensplanService} from '../../services/essensplan.service';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-essensplan',
  templateUrl: './essensplan.component.html',
  styleUrls: ['./essensplan.component.scss']
})

export class EssensplanComponent implements OnInit {
  addEssensplanForm: FormGroup;
  submitted = false;
  successful = false;

  private essensplan: Essensplan[];

  constructor(
    private essensplanService: EssensplanService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getEssensplan();

    this.addEssensplanForm = this.formBuilder.group({
      kalenderwoche: ['', Validators.required]
    });
  }

  getEssensplan(): void {
    this.essensplanService.getEssensplan().subscribe(essensplan => {
      this.essensplan = essensplan;
    });
  }

  // disable default keyvalue sort
  returnZero() {
    return 0;
  }

  /* addEssensplan() FORM METHODS */

  addEssensplan(essensplan): void {
    this.submitted = true;

    if (this.addEssensplanForm.invalid) {
      this.successful = false;
      return;
    }

    this.essensplanService.addEssensplan(this.addEssensplanForm.value).subscribe(() => {
      this.essensplan.push(essensplan);
      this.successful = true;
      this.addEssensplanForm.reset();
      this.submitted = false;
      this.getEssensplan();
    });
  }

  get kalenderwoche() {
    return this.addEssensplanForm.get('kalenderwoche');
  }
}

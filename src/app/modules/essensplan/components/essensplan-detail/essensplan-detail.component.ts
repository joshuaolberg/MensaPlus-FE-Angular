import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Essensplan} from '../../model/classes/essensplan';
import {EssensplanService} from '../../services/essensplan.service';
import {Essen} from '../../../essen/model/classes/essen';
import {EssenService} from '../../../essen/services/essen.service';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Wochentag} from '../../model/enums/wochentag';

@Component({
  selector: 'app-essensplan-detail',
  templateUrl: './essensplan-detail.component.html',
  styleUrls: ['./essensplan-detail.component.scss']
})
export class EssensplanDetailComponent implements OnInit {
  updateEssensplanForm: FormGroup;
  updateEssensplanSubmitted = false;
  updateEssensplanSucessful = false;

  addEssenToEssensplanForm: FormGroup;
  addEssenSubmitted = false;
  addEssenSuccessful = false;

  deleteEssenFromEssensplanForm: FormGroup;
  deleteEssenSubmitted = false;
  deleteEssenSucessful = false;

  private speisekarte: Essen[];
  private essensplan: Essensplan;
  private essen: Essen;

  private wochentag = Wochentag;
  private wochentagOptions = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private essenService: EssenService,
    private essensplanService: EssensplanService,
    private authenticationService: AuthenticationService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getSpeisekarte();
    this.getEssensplan();
    // do not display numbers of enum
    this.wochentagOptions = Object.keys(this.wochentag).filter(k => !isNaN(Number(k)));

    this.updateEssensplanForm = this.formBuilder.group({
      kalenderwoche: ['', Validators.required]
    });

    this.addEssenToEssensplanForm = this.formBuilder.group({
      essen: ['', Validators.required],
      wochentag: ['', Validators.required],
    });

    this.deleteEssenFromEssensplanForm = this.formBuilder.group({
      essen: ['', Validators.required]
    });
  }

  getSpeisekarte(): void {
    this.essenService.getSpeisekarte().subscribe(data => {
      this.speisekarte = data;
    });
  }

  getEssensplan(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.essensplanService.getEssensplanById(id)
      .subscribe(essensplan => {
        this.essensplan = essensplan;
        this.updateFormValues(essensplan);
      });
  }

  deleteEssensplanById(): void {
    this.essensplanService.deleteEssensplanById(this.essensplan).subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }

  returnZero(): number {
    return 0;
  }

  // updateEssensplan() FORM METHODS //

  updateEssensplan(): void {
    this.updateEssensplanSubmitted = true;

    if (this.updateEssensplanForm.invalid) {
      this.updateEssensplanSucessful = false;
      return;
    }

    this.essensplan.kalenderwoche = this.updateEssensplanForm.value.kalenderwoche;
    this.essensplanService.updateEssen(this.essensplan).subscribe(() => this.updateEssensplanSucessful = true);
  }

  updateFormValues(essensplan: Essensplan) {
    this.updateEssensplanForm.setValue({
      kalenderwoche: this.essensplan.kalenderwoche
    });
  }

  get kalenderwoche() {
    return this.updateEssensplanForm.get('kalenderwoche');
  }

  // addEssenToEssensplan() FORM METHODS //
  addEssenToEssensplan(): void {

    if (this.addEssenToEssensplanForm.invalid) {
      this.addEssenSuccessful = false;
      return;
    }

    this.essensplanService.addEssenToEssensplan(this.essensplan, this.selectedEssen.value, this.selectedWochentag.value)
      .subscribe(() => {
        this.essensplan.essenProWoche[Wochentag[this.selectedWochentag.value]] = this.selectedEssen.value;
        this.getEssensplan();
        this.addEssenSuccessful = true;
      });

  }

  get selectedEssen() {
    return this.addEssenToEssensplanForm.get('essen');
  }

  get selectedWochentag() {
    return this.addEssenToEssensplanForm.get('wochentag');
  }

  // deleteEssenFromEssensplan() FORM METHODS //

  deleteEssenFromEssensplan(): void {
    const wochentagId = +Wochentag[this.deletedEssen.value.wochentag];

    if (this.deleteEssenFromEssensplanForm.invalid) {
      this.deleteEssenSucessful = false;
      return;
    }

    this.essensplanService.deleteEssenFromEssensplan(this.essensplan, this.deletedEssen.value.essen, wochentagId)
      .subscribe(() => {
        delete this.essensplan.essenProWoche[this.deletedEssen.value.wochentag];
        this.deleteEssenSucessful = true;
      });
  }

  get deletedEssen() {
    return this.deleteEssenFromEssensplanForm.get('essen');
  }
}

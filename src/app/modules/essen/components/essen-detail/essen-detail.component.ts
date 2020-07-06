import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Essen} from '../../model/classes/essen';
import {ActivatedRoute} from '@angular/router';
import {EssenService} from '../../services/essen.service';
import {essenArt} from '../../model/enums/essenArt';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-essen-detail',
  templateUrl: './essen-detail.component.html',
  styleUrls: ['./essen-detail.component.scss']
})
export class EssenDetailComponent implements OnInit {
  updateEssenForm: FormGroup;
  submitted = false;
  successful = false;

  private essen: Essen;
  private essenArt = essenArt;
  private essenArtOptions = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private location: Location,
    private essenService: EssenService,
  ) {

  }

  ngOnInit() {
    this.getEssen();
    this.essenArtOptions = Object.keys(this.essenArt);
    this.updateEssenForm = this.formBuilder.group({
      name: ['', Validators.required],
      preis: '',
      art: ''
    });
  }

  getEssen(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.essenService.getEssenById(id)
      .subscribe(essen => {
        this.essen = essen;
        this.updateFormValues(essen);
      });
  }

  deleteEssenById(): void {
    this.essenService.deleteEssenById(this.essen).subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }

  /* updateEssen() FORM METHODS */

  updateEssen(): void {
    this.submitted = true;

    if (this.updateEssenForm.invalid) {
      this.successful = false;
      return;
    } else {
      this.essen.name = this.updateEssenForm.value.name;
      this.essen.preis = this.updateEssenForm.value.preis;
      this.essen.art = this.updateEssenForm.value.art;
      this.essenService.updateEssen(this.essen).subscribe(() => this.successful = true);
    }
  }

  updateFormValues(essen: Essen) {
    this.updateEssenForm.setValue({
      name: this.essen.name,
      preis: this.essen.preis,
      art: this.essen.art
    });
  }

  get name() {
    return this.updateEssenForm.get('name');
  }
}

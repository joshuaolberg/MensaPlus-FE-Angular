import {Component, OnInit} from '@angular/core';
import {Essen} from '../../model/classes/essen';

import {EssenService} from '../../services/essen.service';
import {essenArt} from '../../model/enums/essenArt';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-essen',
  templateUrl: './essen.component.html',
  styleUrls: ['./essen.component.scss']
})

export class EssenComponent implements OnInit {
  addEssenForm: FormGroup;
  submitted = false;
  successful = false;

  private speisekarte: Essen[];
  private essenArt = essenArt;
  private essenArtOptions = [];

  constructor(
    private essenService: EssenService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getEssen();
    this.essenArtOptions = Object.keys(this.essenArt);

    this.addEssenForm = this.formBuilder.group({
      name: ['', Validators.required],
      preis: '',
      art: ''
    });
  }

  getEssen(): void {
    this.essenService.getSpeisekarte().subscribe(essen => {
      this.speisekarte = essen;
    });
  }

  /* addEssen() FORM METHODS */

  addEssen(essen: Essen) {
    this.submitted = true;

    if (this.addEssenForm.invalid) {
      this.successful = false;
      return;
    } else {
      this.essenService.addEssen(essen).subscribe(() => {
        this.speisekarte.push(essen);
        this.successful = true;
        this.addEssenForm.reset();
        this.submitted = false;
        this.getEssen();
      });
    }
  }

  get name() {
    return this.addEssenForm.get('name');
  }
}

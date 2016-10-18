import { Component, OnInit, OnChanges } from '@angular/core';
import { DatacontextService, IPriceModel } from './services/datacontext.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [DatacontextService]
})
export class AppComponent implements OnInit, OnChanges {
  title = '';

  boros: Array<string>;
  cuisines: Array<string>;
  michelins: Array<string>;
  
  model: IPriceModel = {
      decor: 20,
      service: 21,
      popularity: 600,
      food: 23,
      meanInspection: 84,
      lastInspection: 90,
      violations: 7,
      cuisine: 'French',
      boro: 'Manhattan - Upper Central',
      michelin: 'Not Mentioned'
    };

  formula: any;
  estimatedY: number;
  estimatedPrice: number;
  //onChange;

  constructor(private datacontext: DatacontextService){
    var self = this;

    // this.onChange = (prop, e) => {
    //   var val = e.target.value.replace(/^\d+\:/, '');
    //   console.info(val);
    //   self.model[prop] = val; 
    //   self.getFormula();
    // }
  }

  ngOnInit(){
    this.boros = this.datacontext.getBoros();
    this.cuisines = this.datacontext.getCuisines();
    this.michelins = this.datacontext.getMichelinGuide();

    
    this.getFormula();
  }

  ngOnChanges(){
    
  }

  getFormula(model = undefined): void {
    model = model || this.model;
    this.formula = this.datacontext.getFormula(this.model);
    //console.info(this.formula);
    this.estimatedY = this.formula.estY;
    this.estimatedPrice = this.formula.estPrice;
  }

  

}

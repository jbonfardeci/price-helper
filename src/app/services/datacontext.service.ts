import { Injectable } from '@angular/core';

export interface IPriceModel {
  cuisine: string;
  boro: string;
  michelin: string;
  decor: number;
  service: number;
  popularity: number;
  food: number;
  meanInspection: number;
  lastInspection: number;
  violations: number;
}

@Injectable()
export class DatacontextService {

  yIntercept = 2.9196354;

  cuisine = [
    {"name": "Seafood", "coefficient": 0.1623165},
    {"name": "Other/Specialty", "coefficient": -0.352651},
    {"name": "North American", "coefficient": 0.0462691},
    {"name": "Japanese", "coefficient": 0.2118373},
    {"name": "Italian", "coefficient": 0.1065411},
    {"name": "Indian", "coefficient": -0.179585},
    {"name": "French", "coefficient": 0.1061241},
    {"name": "East/Southwest Asian", "coefficient": -0.058558},
    {"name": "British Isles/Commonwealth", "coefficient": -0.187479},
    {"name": "Eastern European", "coefficient": 0},
    {"name": "Jewish/Kosher", "coefficient": 0},
    {"name": "Latin/South American", "coefficient": 0},
    {"name": "Mediterranean/Middle Eastern", "coefficient": 0},
    {"name": "Steakhouse", "coefficient": 0.3160097},
    {"name": "West European/Scandinavian", "coefficient": 0}
  ];

  michelinGuide = [
    {"name": "Bib Gourmand", "coefficient": -0.476488},
    {"name": "Not Mentioned", "coefficient": 0},
    {"name": "No Stars", "coefficient": -0.353178},
    {"name": "Two Stars", "coefficient": 0.4947192},
    {"name": "Three Stars", "coefficient": 0.8500579}
  ];

  boros = [
    {"name": "Manhattan - Upper Central", "coefficient": 0.150961},
    {"name": "Manhattan - Central", "coefficient": 0.1795673},
    {"name": "Manhattan - South", "coefficient": 0.0857359},
    {"name": "Manhattan - North", "coefficient": -0.120604},
    {"name": "Brooklyn", "coefficient": -0.124334},
    {"name": "Queens", "coefficient": -0.107416},
    {"name": "Staten Island", "coefficient": 0},
    {"name": "Bronx", "coefficient": 0}
  ];

  quant = {
    "decor": {"name": "Decor", "coefficient": 0.0307386},
    "service": {"name": "Service", "coefficient": 0.052911},
    "popularity": {"name": "Popularity", "coefficient": 0.000143},
    "food": {"name": "Food", "coefficient": -0.019559},
    "meanInspection": {"name": "Mean Inspection Score", "coefficient": -0.00407},
    "lastInspection": {"name": "Last Inspection Score", "coefficient": 0.0029636},
    "violations": {"name": "Violations", "coefficient": -0.007777}
  };

  constructor() { }

  getFormula(model: IPriceModel): any {
    let boro: number = 0;
    for(var i=0; i < this.boros.length; i++){
      if( model.boro == this.boros[i].name ){
        boro = this.boros[i].coefficient;
        //console.log(this.boros[i]);
        break;
      }
    }

    let cuisine: number = 0;
    for(var i=0; i < this.cuisine.length; i++){
      if( model.cuisine == this.cuisine[i].name ){
        cuisine = this.cuisine[i].coefficient;
        //console.log(this.cuisine[i]);
        break;
      }
    }

    let michelin: number = 0;
    for(var i=0; i < this.michelinGuide.length; i++){
      if( model.michelin == this.michelinGuide[i].name ){
        michelin = this.michelinGuide[i].coefficient;
        //console.log(this.michelinGuide[i]);
        break;
      }
    }

    let decor             = this.quant.decor.coefficient * model.decor;
    let service           = this.quant.service.coefficient * model.service;
    let popularity        = this.quant.popularity.coefficient * (1187 - model.popularity);
    let food              = this.quant.food.coefficient * model.food;
    let meanInspection    = this.quant.meanInspection.coefficient * model.meanInspection;
    let lastInspection    = this.quant.lastInspection.coefficient * model.lastInspection;
    let violations        = this.quant.violations.coefficient * model.violations;

    let estY = this.yIntercept + boro + cuisine + michelin + decor + service + popularity + food + meanInspection + lastInspection + violations;

    let formula = {
      y:              this.yIntercept,
      boro:           {co: boro},
      cuisine:        {co: cuisine},
      michelin:       {co: michelin},
      decor:          {co: this.quant.decor.coefficient, val: model.decor},
      service:        {co: this.quant.service.coefficient, val: model.service},
      popularity:     {co: this.quant.popularity.coefficient, val: model.popularity},
      food:           {co: this.quant.food.coefficient, val: model.food},
      meanInspection: {co: this.quant.meanInspection.coefficient, val: model.meanInspection},
      lastInspection: {co: this.quant.lastInspection.coefficient, val: model.lastInspection},
      violations:     {co: this.quant.violations.coefficient, val: model.violations},
      estY:           estY,
      estPrice:       Math.exp(estY)
    };

    return formula;
  }

  getCuisines(): Array<string> {
    var a = [];
    for(var i=0; i < this.cuisine.length; i++){
      a.push(this.cuisine[i].name);
    }
    a.sort;
    return a;
  }

  getBoros(): Array<string>{
    var a = [];
    for(var i=0; i < this.boros.length; i++){
      a.push(this.boros[i].name);
    }
    a.sort;
    return a;
  }

  getMichelinGuide(): Array<string>{
    var a = [];
    for(var i=0; i < this.michelinGuide.length; i++){
      a.push(this.michelinGuide[i].name);
    }
    a.sort;
    return a;
  }

}

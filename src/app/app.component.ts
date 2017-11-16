import {Component, OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  constructor(private http:Http) { }

  title = 'The Final Countdown';
  timers = {"0": {mode: "now", startAt: "0"}, "1": {mode: "upfrom", startAt: "1500000"}};
  options = [{name: "Clock", id: "now"}, {name: "Static Time", id: "static"}, {name: "Up from", id: "upfrom"}, {name: "Down To", id: "downto"}];

  get example() {return JSON.stringify(this.timers)};

  doSubmit(id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(this.timers[id]);
    return this.http.put('http://127.0.0.1:3000/timers/' + id, body, options).map(res => res.json()).subscribe(
      data => this.timers[id] = data;
    );
  }

  ngOnInit() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://127.0.0.1:3000/timers/').map(res => res.json()).subscribe(
      data => this.timers = data;
    );

  }
}

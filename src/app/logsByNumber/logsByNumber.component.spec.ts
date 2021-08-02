import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CallLogDataService } from '../call-log-data.service';
import { dataByNumber } from '../dataByNumber';

import { logsByNumberComponent } from './logsByNumber.component';

describe('logsByNumberComponent', () => {
  let component: logsByNumberComponent;
  let fixture: ComponentFixture<logsByNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ logsByNumberComponent ],
      imports:[ 
        HttpClientTestingModule, 
        RouterTestingModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(logsByNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Expect Service to return log as per Phone Number', () => {
    let dummyCallLogByNumber:dataByNumber[] = [ {
      name: "John Bob",
      dateTime: "2020-10-05T14:48:00.000Z",
      resolution: "need reschedule",
      identifier: "f53b3e0e-6a21-11eb-9439-0242ac130002"
  },
  {
      name: "Rose Patterson",
      dateTime: "2020-10-07T14:50:00.000Z",
      resolution: "interested",
      identifier: "29b7189c-6a22-11eb-9439-0242ac130002"
  },
  {
      name: "Rose Patterson",
      dateTime: "2020-10-07T14:50:00.000Z",
      resolution: "no answer",
      identifier: "9c5c0175-2ef7-4307-ab91-87cc1abfa235"
  },
  {
      name: "Rose Patterson",
      dateTime: "2020-10-07T14:50:00.000Z",
      resolution: "no answer",
      identifier: "5ec271b1-d89c-4c5f-a552-e5d66562851a"
  },
  {
      name: "Rose Patterson",
      dateTime: "2020-10-07T14:50:00.000Z",
      resolution: "interested",
      identifier: "634ee4b1-d492-4f36-8114-f0e98fd63efe"
  }]
    const fixture = TestBed.createComponent(logsByNumberComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(CallLogDataService);
    spyOn(service,"getCallLogsByNumber").and.returnValue(of(dummyCallLogByNumber));    
    component.getCallLogsByNumber();
    expect(component.logsByNumber).toEqual(dummyCallLogByNumber);
    expect(component.logsByNumber.length).toBe(5);
  })
});

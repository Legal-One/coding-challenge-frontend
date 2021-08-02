import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { logsByAgentComponent } from './logsByAgent.component';
import { RouterTestingModule } from '@angular/router/testing';
import { dataByAgent } from '../dataByAgent';
import { CallLogDataService } from '../call-log-data.service';
import { of } from 'rxjs';

describe('logsByAgentComponent', () => {
  let component: logsByAgentComponent;
  let fixture: ComponentFixture<logsByAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [logsByAgentComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(logsByAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Expect Service to return log as per AgentID', () => {
    let dummyCallLogByAgent:dataByAgent[] = [
      {
        number: "+49151484522",
        agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
        dateTime: "2020-10-07T14:50:00.000Z",
        resolution: "interested"
    },
    {
        number: "+49151484522",
        agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
        dateTime: "2020-10-07T14:50:00.000Z",
        resolution: "no answer"
    },
    {
        number: "+49151484522",
        agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
        dateTime: "2020-10-07T14:50:00.000Z",
        resolution: "no answer"
    },
    {
        number: "+49151484522",
        agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
        dateTime: "2020-10-07T14:50:00.000Z",
        resolution: "interested"
    },
    {
        number: "+49151484522",
        agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
        dateTime: "2020-10-07T14:50:00.000Z",
        resolution: "needs follow up"
    },
    {
        number: "+49151484522",
        agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
        dateTime: "2020-10-07T14:50:00.000Z",
        resolution: "needs follow up"
    },
    {
        number: "+49151484522",
        agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
        dateTime: "2020-10-07T14:50:00.000Z",
        resolution: "needs follow up"
    },
    {
        number: "+49151484522",
        agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
        dateTime: "2020-10-07T14:50:00.000Z",
        resolution: "no answer"
    }
  ]
    const fixture = TestBed.createComponent(logsByAgentComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(CallLogDataService);
    spyOn(service,"getCallLogsByAgentID").and.returnValue(of(dummyCallLogByAgent));    
    component.getLogsByAgentID();
    expect(component.logsByAgent).toEqual(dummyCallLogByAgent);
    expect(component.logsByAgent.length).toBe(8);
  })
});

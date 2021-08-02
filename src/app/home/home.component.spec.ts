import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CallLogDataService } from '../call-log-data.service';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { dataLog } from '../dataLog.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Expect Service to return log list', () => {
    const dummyCallLogData: dataLog[] = [{
        agentName: "Abraham Ellis",
        number: "+49151484522",
        callCounts: 13,
        lastCall: "2020-10-07T14:50:00.000Z",
        agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e"
      },
      {
        agentName: "Joel Wagner",
        number: "+49158544147",
        callCounts: 3,
        lastCall: "2020-11-09T17:50:00.000Z",
        agentIdentifier: "e512594e-a34c-11e7-a6cb-0609e42722e2"
      }]
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(CallLogDataService);
    spyOn(service, "getCallLogs").and.returnValue(of(dummyCallLogData));
    component.getCallListsData();
    expect(component.callLogsData).toEqual(dummyCallLogData);
  })
});

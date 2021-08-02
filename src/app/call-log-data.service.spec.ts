import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CallLogDataService } from './call-log-data.service';
import { dataLog } from './dataLog.model';
import {HttpClientModule} from '@angular/common/http';
import { dataByAgent } from './dataByAgent';
import { dataByNumber} from './dataByNumber';

describe('CallLogDataService', () => {
  let service: CallLogDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CallLogDataService]
  });

    service = TestBed.get(CallLogDataService);
    httpMock = TestBed.get(HttpTestingController);
  });  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCallLogs', () => {
    it('should return an Observable<dataLog>', () => {
      const dummyCallLogData: dataLog[] = [{
        agentName:"Abraham Ellis",
        number:"+49151484522",
        callCounts: 13,
        lastCall: "2020-10-07T14:50:00.000Z",
        agentIdentifier:"356b03dc-9ec5-11e7-97a6-d501104f897e"
      }]

      service.getCallLogs().subscribe(result => {
        expect(result).toEqual(dummyCallLogData);
      });

      const req = httpMock.expectOne(`${service.api_url}`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyCallLogData);
    });
  });

  describe('#getLogsByAgent', () => {
    let agentIdentifier = "356b03dc-9ec5-11e7-97a6-d501104f897e"
    it('should return an Observable<dataByAgent>', () => {
      const dummyCallLogByAgent: dataByAgent[]  = [{
        number:"+49151484522",
        agentIdentifier:"356b03dc-9ec5-11e7-97a6-d501104f897e",
        dateTime: "2020-10-07T14:50:00.000Z",
        resolution: "interested"        
      }]

      service.getCallLogsByAgentID(agentIdentifier).subscribe(result => {
        expect(result).toEqual(dummyCallLogByAgent);
      });

      const req = httpMock.expectOne(`${service.api_url}/agent/${agentIdentifier}`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyCallLogByAgent);
    });
  });

  describe('#getLogsByNumber', () => {
    let number = "+49151484522"
    it('should return an Observable<dataByNumber>', () => {
      const dummyCallLogByNumber: dataByNumber[] = [{
        name:"John Doe",
        identifier: "29b7189c-6a22-11eb-9439-0242ac130002",
        dateTime: "2020-10-07T14:50:00.000Z",
        resolution: "interested"        
      }]

      service.getCallLogsByNumber(number).subscribe(result => {
        expect(result).toEqual(dummyCallLogByNumber);
      });

      const req = httpMock.expectOne(`${service.api_url}/call/${number}`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyCallLogByNumber);
    });

  });

});

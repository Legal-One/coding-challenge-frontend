import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { dataLog } from './dataLog.model';
import { dataByAgent } from './dataByAgent';
import { dataByNumber} from './dataByNumber';

@Injectable({
  providedIn: 'root'
})
export class CallLogDataService {

  api_url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getCallLogs() {
    return this.http.get<dataLog[]>(`${this.api_url}`);
  }

  getCallLogsByAgentID (id: string) {
    return this.http.get<dataByAgent[]>(`${this.api_url}/agent/${id}`);

  }

  getCallLogsByNumber(number: string) {
  return this.http.get<dataByNumber[]>(`${this.api_url}/call/${number}`);
  }
}

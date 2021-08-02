import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallLogDataService } from '../call-log-data.service';
import { dataLog } from '../dataLog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  callLogsData:dataLog[] = [];

  constructor(private api: CallLogDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      
  }

  ngOnInit() {
    this.getCallListsData();
  }

  getCallListsData() {
    this.api.getCallLogs().subscribe((result: dataLog[]) => {
      console.log(result)
      this.callLogsData = result;
    })


  }

  getDetailsPerAgent(id:string) {
    this.router.navigate(['agent',id]);
  }

  getDetailsPerNumber(number:string) {
    this.router.navigate(['call',number]);
  }

}

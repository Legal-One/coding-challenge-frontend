import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallLogDataService } from '../call-log-data.service';
import { dataByAgent } from '../dataByAgent';

@Component({
  selector: 'app-logsByAgent',
  templateUrl: './logsByAgent.component.html',
  styleUrls: ['./logsByAgent.component.scss']
})
export class logsByAgentComponent implements OnInit {

  logsByAgent: dataByAgent[] = [];
  id: string = '';

  constructor(private api: CallLogDataService,
    private activatedRoute: ActivatedRoute) {
      
      
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getLogsByAgentID();
  }

  getLogsByAgentID() {
    this.api.getCallLogsByAgentID(this.id).subscribe((result: dataByAgent[]) => {
      this.logsByAgent = result;
      console.log(result);
    })


  }

}

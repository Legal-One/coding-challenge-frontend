import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallLogDataService } from '../call-log-data.service';
import { dataByNumber} from '../dataByNumber';

@Component({
  selector: 'app-logsByNumber',
  templateUrl: './logsByNumber.component.html',
  styleUrls: ['./logsByNumber.component.scss']
})
export class logsByNumberComponent implements OnInit {

  logsByNumber:dataByNumber[] = [];
  number: string = '';

  constructor(private api: CallLogDataService,
    private activatedRoute: ActivatedRoute) {
      
      
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.number = params['number'];
    });
    this.getCallLogsByNumber();
  }

  getCallLogsByNumber() {
    this.api.getCallLogsByNumber(this.number).subscribe((result: dataByNumber[]) => {
      this.logsByNumber = result;
    })


  }

}

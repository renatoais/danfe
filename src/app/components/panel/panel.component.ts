import { Component, OnInit } from '@angular/core'
import { DanfeService } from './../../danfe.service';

import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  providers:[DanfeService]
})


export class PanelComponent implements OnInit {
  
  public queryString  = window.location.search;
  public urlParams    = new URLSearchParams(this.queryString);
  public chvnfe   	  = this.urlParams.get('chvNFe')
  public hash    	    = this.urlParams.get('hash')
  public NumNfe       = this.chvnfe.substring(25,34)
  public NumSerie     = this.chvnfe.substring(22,25)
  
  public buttonDisabled: boolean;
  public gifDisabled:boolean = true
  public gifDisabled2:boolean =true
  public progressBarValue = 0;

  get progressBarInfo() {
    if (this.progressBarValue == 0){
    return `${this.progressBarValue}% / 100%`;
    }if (this.progressBarValue == 100){
      return `Arquivo pronto para download ! ${this.progressBarValue}% / 100%`;
    }else{
      return `Preparando seu arquivo para download , aguarde por favor ... ${this.progressBarValue}% / 100%`;
    }
  }

  constructor(public danfeservice:DanfeService ,public poNotification: PoNotificationService ) {}

  ngOnInit(): void {
  }

  finishEdition(n) {
    if (n==1){
    this.buttonDisabled = true;
    }else{
      this.buttonDisabled = false;
      this.gifDisabled2 = false
      this.gifDisabled = true
      this.poNotification.success('Arquivo gerado com sucesso!')
    }
    
    }

  public DownloadNfe():void{
    this.progressBarValue = 0;
    this.gifDisabled = false
    this.gifDisabled2 = true
    this.updateProgress()   
    this.danfeservice.getFile(this.chvnfe,this.hash)
}

updateProgress() {
  const interval = setInterval(() => {
    if (this.progressBarValue >= 100) {
      clearInterval(interval);
      this.finishEdition(2);
    } else {
      this.finishEdition(1);
      this.progressBarValue++;
    }
  }, 90);
}


}

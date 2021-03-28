import { Infonfe } from './../../models/infonfe';
import { Component, OnInit } from '@angular/core'
import { DanfeService } from './../../danfe.service';

import { PoNotificationService } from '@po-ui/ng-components';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  providers:[DanfeService,PoNotificationService]
})


export class PanelComponent implements OnInit {
  action: boolean;
  actionLabel: string;
  message: string;
  orientation: number;
  type: number;
  duration: number;

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
  
  public aInfo : Infonfe[]
  public info = {}
 
  public Municipio:string = ''
  public datanfe: string  = ''
  public cgc: string      = ''
  public nome: string     = ''
  public uf: string       = ''
  public protocolo: number = 0

  get progressBarInfo() {
    if (this.progressBarValue == 0){
    return `${this.progressBarValue}% / 100%`;
    }if (this.progressBarValue == 100){
      return `Arquivo pronto para download ! ${this.progressBarValue}% / 100%`;
    }else{
      return `Preparando seu arquivo para download , aguarde por favor ... ${this.progressBarValue}% / 100%`;
    }
  }

  constructor(public danfeservice:DanfeService ,private poNotification: PoNotificationService  ) {}

  ngOnInit(): void {
     this.GetInfo()
  }

  finishEdition(n) {
  
    const poNotification: any = {
      message: "Arquivo gerado com sucesso",
      orientation: 'top',
      duration: 5000
    };

    if (n==1){
    this.buttonDisabled = true;
    }else{
      this.buttonDisabled = false;
      this.gifDisabled2 = false
      this.gifDisabled = true
      this.poNotification.success(poNotification)
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

GetInfo(): void {
  this.danfeservice.getinfonfe(this.chvnfe,this.hash).subscribe((aInfo:Infonfe[]) => {
    this.aInfo = aInfo;
    this.info=Object.values(this.aInfo)
    
    if (this.info[2] !== '' ) { ///Se existir CNPJ 
      this.Municipio = this.info[0]
      this.datanfe = this.info[1]
      this.cgc = this.info[2]
      this.nome = this.info[3]
      this.uf  = this.info[4]
      this.protocolo = this.info[5]
      this.datanfe = this.datanfe.substring(6,9)+'/'+this.datanfe.substring(4,6)+'/'+this.datanfe.substring(0,4)
      console.log(this.cgc.length)
      this.cgc = this.formatcpfCnpj(this.cgc)

    }
  });

}

public formatcpfCnpj(v){
 
  v=v.replace(/\D/g,"")

  if (v.length <= 12) { //CPF
      v=v.replace(/(\d{3})(\d)/,"$1.$2")
      v=v.replace(/(\d{3})(\d)/,"$1.$2")
      v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")

  } else { //CNPJ

      v=v.replace(/^(\d{2})(\d)/,"$1.$2")
      v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
      v=v.replace(/\.(\d{3})(\d)/,".$1/$2")
      v=v.replace(/(\d{4})(\d)/,"$1-$2")
  }
    return v
  }


}

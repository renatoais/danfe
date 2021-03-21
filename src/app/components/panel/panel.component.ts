import { Component, OnInit } from '@angular/core'
import { DanfeService } from './../../danfe.service';

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
    

  constructor(public danfeservice:DanfeService ) {}

  ngOnInit(): void {
  }

  public DownloadNfe():void{
     this.danfeservice.getFile(this.chvnfe,this.hash)
}

}

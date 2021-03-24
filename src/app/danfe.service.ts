import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {PanelComponent} from '../app/components/panel/panel.component'

@Injectable({
  providedIn: 'root'
})

export class DanfeService {

public panelcomponent:any = PanelComponent


constructor(private http: HttpClient) { }

ApiRest ='http://erp1.manfrim.com.br:8107/rest/api/v1/DownloadNfeFile?chvNFe='

getFile(param1,param2) {
  
  return window.open(`${this.ApiRest}${param1}&hash=${param2}`,"_self")


 } 
}


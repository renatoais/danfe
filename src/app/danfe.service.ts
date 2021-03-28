import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {PanelComponent} from '../app/components/panel/panel.component'
import { Infonfe } from '../app/models/infonfe';


@Injectable({
  providedIn: 'root'
})

export class DanfeService {

public panelcomponent:any = PanelComponent


constructor(private http: HttpClient) { }


ApiRest ='http://erp1.manfrim.com.br:8107/rest/api/v1/DownloadNfeFile?chvNFe='
ApiInfo ='http://erp1.manfrim.com.br:8107/rest/downloadnfefile/api/v1/infoNfe?chvNFe='

getFile(param1,param2) {
  return window.open(`${this.ApiRest}${param1}&hash=${param2}`,"_self")
 } 

getinfonfe(param1,param2): Observable<Infonfe[]> {
  return this.http.get<Infonfe[]>(`${this.ApiInfo}${param1}&hash=${param2}`)
  .pipe(
    retry(2),
    catchError(this.handleError))
}

 // Manipulação de erros
 handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Erro ocorreu no lado do client
    errorMessage = error.error.message;
  } else {
    // Erro ocorreu no lado do servidor
    errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
};



}


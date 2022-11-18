import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Sentenza } from 'app/sentenza.model';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

 

  constructor(private http: HttpClient) { }

  public sentenzePerVoce: Sentenza[];
  public sentenzePerContenuto: Sentenza[];

  public nSentenzePerVoce: number = 0;
  public nSentenzePerContenuto: number = 0;

  public elencoVoci: string[] = ['TUTTE LE VOCI'];
  public selectedVoce: string = 'TUTTE LE VOCI';
  public headerText: string = 'EFFETTUA UNA RICERCA PER VOCE O PER CONTENUTO';

  public display: String = 'none';
  ngOnInit() {
    this.getAllVoci();
    
  }

  getSentenzeByVoce(voce: string) {
    const url = environment.apiKey +
    'getByVoce?'+
    'voce=' + voce.toLowerCase();

    this.display = 'block';
    console.log(url);
    this.http.get<any>(url).subscribe(data => {
      this.sentenzePerVoce = data;
      this.nSentenzePerVoce = data.length;
      console.log(this.sentenzePerVoce);
      this.headerText = 'Elenco Sentenze per voce: ' + voce;
      this.display = 'none';
    })
    
  }
  getBySubText(subText: string) {
    const url = environment.apiKey +
    'getBySubText?'+
    'subText=' + subText.toLowerCase()+ 
    '&voce='+ this.selectedVoce.toLowerCase();
    this.display = 'block';
    console.log(url);
    this.http.get<any>(url).subscribe(data => {
      this.sentenzePerContenuto = data;
      this.nSentenzePerContenuto = data.length;
      console.log(this.sentenzePerContenuto);
      this.headerText = 'Elenco Sentenze per contenuto: ' + subText.toUpperCase() + ' e voce: ' + this.selectedVoce.toUpperCase();
      this.display = 'none';
    })
  }

  getAllVoci() {
    const url = environment.apiKey +
    'getAllVoci'


    console.log(url);
    this.http.get<any>(url).subscribe(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (!this.elencoVoci.includes(data[i].voce))
          this.elencoVoci.push(data[i].voce);
      }
    })
  }
  changeVoce(voce: string) {
  this.selectedVoce = voce;
  }

  onCloseHandled(){
    this.display='none';
 }
}

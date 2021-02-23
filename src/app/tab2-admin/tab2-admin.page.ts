import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx'
import { FileOpener } from '@ionic-native/file-opener/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tab2-admin',
  templateUrl: './tab2-admin.page.html',
  styleUrls: ['./tab2-admin.page.scss'],
})
export class Tab2AdminPage implements OnInit {

 
  data = {};
  token: any;
  offers = {};
  users = {};
  cicle_id: string;
  resultadosOfertas = [];
  resultadosUsuarios = [];

  pdfObj = null;
  


  constructor(private http: HttpClient,private authService: AuthService,private alertController: AlertController,
    private file: File, private fileOpener: FileOpener, private emailComposer: EmailComposer) { 
      this.authService.getOffers(this.authService.token).then(data => {
        this.offers = data;
        this.sacarDatosOfertas(this.offers);
      });

      this.authService.getUsers(this.authService.token).then(data =>{
        this.users = data;
        this.sacarDatosUsuarios(this.users);  
      });
  }

  sacarDatosOfertas(datos: any){
    for(let i = 0; i < datos.data.length; i++){
      //console.log(datos.data[i].headline + " " + datos.data[i].cicle_id + " " + datos.data[i].num_candidates);
      this.resultadosOfertas[i] = "Titular: " + datos.data[i].headline + " | Id del Ciclo: " + datos.data[i].cicle_id + " | Numero de candidatos: " + datos.data[i].num_candidates + " \n"
    }
  }

  sacarDatosUsuarios(datos: any){
    for(let i = 0; i < datos.data.length; i++){
      //console.log(datos.data[i].name + " " + datos.data[i].surname + " " + datos.data[i].num_offer_applied);
      this.resultadosUsuarios[i] = "Nombre y apellidos: " + datos.data[i].name + " " + datos.data[i].surname + " | Numero de ofertas a las que aplica: " + datos.data[i].num_offer_applied + " \n"
    }
  }

  
  OfertasPDF(){
    var docDefinition = {
      content:[
        { text: 'OFERTAS', style: 'header', alignment: 'center'},
        { text: this.resultadosOfertas, style: 'story', margin: [0, 20, 0, 20] },
      ],
      styles: {
        story: {
          italic: true,
          alignment: 'left',
          width: '50%',
        },
        header: {
          fontSize: 18,
          bold: true,
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.mandarMail();
    this.pdfObj.download();

  }

  PartPDF(){
    var docDefinition = {
      content:[
        { text: 'PARTICIPANTES', style: 'header', alignment: 'center'},
        { text: this.resultadosUsuarios, style: 'story', margin: [0, 20, 0, 20] },
      ],
      styles: {
        story: {
          italic: true,
          alignment: 'left',
          width: '50%',
        },
        header: {
          fontSize: 18,
          bold: true,
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.mandarMail();
    this.pdfObj.download();
  }

  ngOnInit() {
  }

  mandarMail(){
    let email = {
      to: 'raulreyes@gmail.com',
      subject: 'Envio pdf',
      body: 'Se adjuntan los pdfs',
      attachments: [this.pdfObj],
      isHtml: true,
    };
    this.emailComposer.open(email);
  }

}

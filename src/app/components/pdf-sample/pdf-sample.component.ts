import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-pdf-sample',
  templateUrl: './pdf-sample.component.html',
  styleUrls: ['./pdf-sample.component.scss']
})
export class PdfSampleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  generatePdf(){
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
   }
}

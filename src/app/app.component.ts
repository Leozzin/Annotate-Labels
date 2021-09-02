
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'labelWordsFront';
  documents = '';
  localVar = "";
  data = {
    document: "",
    annotation: [] as any
  }

  constructor(private sanitizer: DomSanitizer){}
  saveDocument() {
    var textarea = <HTMLInputElement>document.getElementById("doc");
    this.data.document = textarea.value;
    var htmlDoc = <HTMLInputElement>document.getElementById('document');
    htmlDoc.innerHTML = this.data.document;
  }

  addAnotation(label: any) {
    var textarea = <HTMLInputElement>document.getElementById("doc");
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var selection = (textarea.value).substring(<number>start, <number>end);

    var localVar = { start: start, end: end, label: label, text: selection };
    this.data.annotation.push(localVar);
    var listUL = <HTMLInputElement>document.getElementById('annotations');
    var ulOption = document.createElement('li');
    ulOption.innerHTML = selection + "   " + label;
    listUL.appendChild(ulOption);

    console.log(this.data);
  }

  downloadJson(){
    var theJSON = JSON.stringify(this.data);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    element.setAttribute('download', "file.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }
}



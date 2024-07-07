import { Injectable, OnInit, ViewChild } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { CSVRecord } from './CSVRecord';

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: HttpClient) {}

  async fileExists(url: string): Promise<any> {
    return await this.http.get(url, { responseType: 'text' }).toPromise();
  }

  async getPromise(url: string): Promise<any> {
    return await this.http.get(url, { responseType: 'text' }).toPromise();
  }

  public records: any[] = [];

  async getRecords(url: string) : Promise<CSVRecord[]> {
    let txt : string[] = await this.getPromise(url).then(t=>t.split("\n")).catch(er=>['nothing']);
    console.log('dupa',txt);
    this.records = this.getDataRecordsArrayFromCSVFile(txt);
    console.log('dupa2',this.records);

    return this.records;
  }


  @ViewChild('csvReader') csvReader: any;
  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;
    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray);
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any) {
    let csvArr = [];
    for (let i = 0; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.id = curruntRecord[0]?.trim() ?? '';
        csvRecord.companyName = curruntRecord[1]?.trim() ?? '';
        csvRecord.positionName = curruntRecord[2]?.trim() ?? '';
        csvRecord.companyType = curruntRecord[3]?.trim() ?? '';
        csvRecord.recommendation1 = curruntRecord[4]?.trim() ?? '';
        csvRecord.recommendation2= curruntRecord[5]?.trim() ?? '';
        console.log(csvRecord);
        csvArr.push(csvRecord);
    }
    return csvArr;
  }
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }
  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

}
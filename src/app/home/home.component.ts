import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { FileService } from '../helpers/file.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  fileService: FileService = inject(FileService);
  filteredLocationList: HousingLocation[] = [];
  flag: boolean | undefined = false;
  constructor() {
    this.initialize();
    
  }
  async initialize(){
    await this.housingService.initializeAllHousingLocations(6);
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
    this.flag = true;
    console.log(this.housingLocationList);
  }

  async filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }


    // this.flag = await this.fileService.fileExists(
    //   'https://guziczak.github.io/me/assets/logos/work/6.jpeg'
    // ).toPromise();

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    )
    .map(u=>{
      if(this.flag===undefined) {
        u.name = 'undifajn';
      }
      u.name=this.flag ? 'tru' : 'falsz';
      return u;
    })
    ;
  }
}

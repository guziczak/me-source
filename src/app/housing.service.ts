import { inject, Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { FileService } from './helpers/file.service';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  fileService: FileService = inject(FileService);

  readonly baseUrl = 'https://guziczak.github.io/me/assets/logos/work/';

  private possibleExtensions: string[] = [
    '.jpeg',
    '.jpg',
    '.png',
    '.svg'
  ];

  protected aaa: HousingLocation[] = [
    {
      id: 0,
      name: 'Acme Fresh Start Housing',
      positionName: 'Satellite Engineer',
      city: 'Chicago',
      state: 'IL',
      photo: 'assets/logos/work/6.jpg',
      photo2: 'assets/logos/work/5.jpeg',
      availableUnits: 4,
      wifi: true,
      laundry: true
    }
  ];

  protected housingLocationList: HousingLocation[] = [];

  async initializeAllHousingLocations(positionsNumber: number) {

    let arr = [];

    let possibleExtensionsLength = this.possibleExtensions.length;
    let obj: HousingLocation;
    let photoUrl = undefined;
    let exists:boolean = false;

    for(let i=positionsNumber; i>0; i--){
      console.log(i);
      obj = {
        id: i,
        name: 'Acme Fresh Start Housing',
        positionName: 'Satellite Engineer',
        city: 'Chicago',
        state: 'IL',
        photo: undefined,
        photo2: 'assets/logos/work/5.jpeg',
        availableUnits: 4,
        wifi: true,
        laundry: true
      };
      for (let extension of this.possibleExtensions) {
        console.log(extension);
        photoUrl = this.baseUrl + i + extension;
        exists = await this.fileService.fileExists(photoUrl).then(()=>true).catch(()=>false);
        if (exists) {
          console.log('udalo sie!',photoUrl)
          obj.photo=photoUrl;
          break;
        }
    }

    arr.push(obj);

  }
  this.housingLocationList = arr;
  console.log(arr);
}


  getAllHousingLocations(): HousingLocation[] {
    return this.housingLocationList;
  }

  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.housingLocationList.find(housingLocation => housingLocation.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}

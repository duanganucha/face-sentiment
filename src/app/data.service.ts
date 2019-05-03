import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
// import "rxjs/add/operator/do"



@Injectable({
  providedIn: 'root'
})
export class DataService {

  private urlFaceApiEndPoint = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,' +
        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
  
  constructor(private http : Http) { 
    
  }

  

  getPersonAzure(imageUrl : string){

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key' : 'a8e34c5d82744753b56d3546b8131cca'
    })

    const options = new RequestOptions({ headers });

    return this.http.post(this.urlFaceApiEndPoint,{url:imageUrl},options).pipe(
      map(data => data.json())

      // do(resuft => console.log(resuft) )
    )
      
  }


}

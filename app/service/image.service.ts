import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Metadata } from '../model/Metadata';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imagesURL:string="http://localhost:3333/image"
    constructor(private httpClient:HttpClient){}
    uploadImage(imageFile:File , metadata:Metadata):Observable<boolean>  {
    
      if(imageFile.type !== "image/jpeg"){
        throw new Error("incorrect filetype");
      }
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile ,this.removeExtension(imageFile.name) )
      
      imageFormData.append('metadata',JSON.stringify( metadata ));
  
      return this.httpClient.post<boolean>( `${this.imagesURL}/upload/one`, imageFormData );
  
    }
    downloadAssociatedImage(objectId:string):Observable<string>{
      return this.httpClient.get(`${this.imagesURL}/download/imageof/${objectId}`, {responseType:'arraybuffer'}).pipe(
        map((res:ArrayBuffer) =>URL.createObjectURL (new Blob([res]) ) ),
        catchError(  (error:any)=>{
          // console.error(error);
          return of('');
        } )
      )
    }
  
  
  
  
  
      
      
      
      
      serve():Observable<any>{
        return this.httpClient.get(`${this.imagesURL}/serve`)
    }
    removeExtension(filename: string): string {
      // Split the filename by the dot (.)
      const parts = filename.split('.');
      // Remove the last part (extension) and join the remaining parts
      const nameWithoutExtension = parts.slice(0, -1).join('.');
  
      return nameWithoutExtension;
  }
}

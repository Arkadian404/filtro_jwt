import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private basePath = 'upload'
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  //updloadFile(file:File, )
}

import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(
    private firestore: Firestore
  ) {}

  async guardarUbicacion(
    latitud: number,
    longitud: number
  ) {

    try {

      console.log("Entró a Firebase");

      const ubicacionesRef =
        collection(this.firestore, 'ubicaciones');

      const resultado = await addDoc(
        ubicacionesRef,
        {
          latitud: latitud,
          longitud: longitud,
          fecha: new Date()
        }
      );

      console.log(
        'Guardado en Firebase',
        resultado.id
      );

    } catch(error) {

      console.log(
        'Error Firebase:',
        error
      );
    }
  }
}
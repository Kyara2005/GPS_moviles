import { Injectable } from '@angular/core';

import {
  createClient,
  SupabaseClient
} from '@supabase/supabase-js';

import { environment }
from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {

    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      }
    );
  }

  async guardarUbicacion(
    latitud: number,
    longitud: number
  ) {

    const { error } = await this.supabase
      .from('ubicaciones')
      .insert([
        {
          latitud: latitud,
          longitud: longitud,
          fecha: new Date()
        }
      ]);

    if (error) {

      console.log('Error Supabase:', error);

    } else {

      console.log('Guardado en Supabase');
    }
  }
}
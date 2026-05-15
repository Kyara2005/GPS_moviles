import { Injectable } from '@angular/core';

import {
  Geolocation,
  PermissionStatus,
  Position
} from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  async ensurePermissions():
  Promise<PermissionStatus> {

    const perm =
    await Geolocation.checkPermissions();

    if (
      perm.location === 'granted' ||
      perm.coarseLocation === 'granted'
    ) {
      return perm;
    }

    return Geolocation.requestPermissions();
  }

  async getCurrentPosition():
  Promise<Position> {

    return Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    });
  }

  async watchPosition(
    onPos: (p: Position) => void,
    onErr?: (e: any) => void
  ): Promise<string> {

    const id =
    await Geolocation.watchPosition(

      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      },

      (pos, err) => {

        if (pos) {
          onPos(pos);
        }

        else if (err && onErr) {
          onErr(err);
        }
      }
    );

    return id as unknown as string;
  }

  async clearWatch(id: string):
  Promise<void> {

    await Geolocation.clearWatch({ id });
  }
}
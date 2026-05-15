# MiUbicacionAPP Ionic
Aplicación móvil desarrollada con Ionic + Angular que contiene geolocalización del dispositivo y guarda las coordenadas en Firebase y Supabase.
Tambien genera un enlace directo para visualizar la ubicación en Google Maps desde el navegador.

---

# 👨‍💻 Integrantes

- Santiago Vargas.
- Kyara Altamirano


---

# ⚙️ Instalación del proyecto

Clonar repositorio:

```bash
git clone [(https://github.com/Kyara2005/GPS_moviles.git)]
```

Entrar al proyecto:

```bash
cd MiUbicacionAPP_ionic
```

Instalar dependencias:

```bash
npm install
```

Ejecutar proyecto:

```bash
ionic serve
```

---

# 🔥 Configuración de Firebase

## 1. Crear proyecto

Ingresar a Firebase Console:

https://console.firebase.google.com

Crear un nuevo proyecto.

---

## 2. Habilitar Firestore Database

Ir a:

```bash
Build → Firestore Database
```

Seleccionar:

```bash
Start in test mode
```

---

## 3. Crear colección

Nombre de colección:

```bash
ubicaciones
```

---

---

## 4. Variables de entorno

Archivo:

```bash
src/environments/environment.ts
```

```ts
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID",
  measurementId: "TU_measurementId"
};
```

---

## 5. Guardar ubicación en Firebase

```ts
await addDoc(collection(db, 'ubicaciones'), {
  latitud: data.lat,
  longitud: data.lng,
  precision: data.accuracy,
  fecha: data.timestamp
});
```

---

# 🟢 Configuración de Supabase

## 1. Crear proyecto

Ingresar a:

https://supabase.com

Crear un nuevo proyecto.

---

## 2. Crear tabla SQL

Ejecutar en SQL Editor:

```sql
create table ubicaciones (
  id bigint generated always as identity primary key,
  latitud double precision,
  longitud double precision,
  precision double precision,
  fecha timestamptz
);
```

---

## 3. Variables de entorno

Archivo:

```bash
src/environments/environment.ts
```

```ts
export const environment = {
  production: false,

  supabaseUrl: 'TU_SUPABASE_URL',

  supabaseKey: 'TU_SUPABASE_KEY'
};
```

---

## 4. Guardar ubicación en Supabase

```ts
await this.supabase
  .from('ubicaciones')
  .insert([{
    latitud: data.lat,
    longitud: data.lng,
    precision: data.accuracy,
    fecha: data.timestamp
  }]);
```

---

# Google Maps

La aplicación genera automáticamente un enlace hacia Google Maps usando las coordenadas obtenidas.

Ejemplo:

```ts
const url = `https://www.google.com/maps?q=${lat},${lng}`;
```

Abrir enlace:

```ts
window.open(url, '_blank');
```

---

# 🔐 Permisos Android
Segun la documentacion, para que funcione el apk hay que configurar en los siguientes archivos:

Archivo:

```bash
android/app/src/main/AndroidManifest.xml
```

Agregar:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
```

---

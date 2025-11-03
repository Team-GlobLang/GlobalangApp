# Globalang — Aplicación de aprendizaje de idiomas

Bienvenido al repositorio de Globalang. Este proyecto es una aplicación web móvil/híbrida construida con Vue 3 y Vite, orientada a aprender expresiones, regionalismos y recursos por país. Este README cubre los primeros pasos, la estructura del proyecto, variables de entorno, la arquitectura (servicios/hooks/componentes), y las librerías principales usadas.

---

## Primeros pasos

Requisitos:

- Node.js >= 16
- npm o yarn
- Java/Android SDK si vas a compilar para Android con Capacitor

Instalación de dependencias (PowerShell):

```powershell
# desde la raíz del repo
npm install
```

Ejecutar en modo desarrollo:

```powershell
npm run dev
```

Build de producción:

```powershell
npm run build
```

Notas:

- Para compilar y ejecutar en Android via Capacitor:

```powershell
npm run build
npx cap add android
npx cap sync android
npx cap open android

o utiliza en comando npm run capbuild el cual ejecuta los comandos Sync y Open 
```
- Para compilar y ejecutar en IOS via Capacitor:

```powershell
npm run build
npm install @capacitor/ios
npx cap add ios
npx cap open ios
npx cap run ios
```


---

## Variables de entorno

Las variables de entorno usadas por la app son (añade estas en tu `.env` a partir de `env.template`):

- `VITE_PAY_URL` — URL del servicio de pagos
- `VITE_API_URL` — URL base de la API

Nota: en Vite las variables expuestas al cliente deben comenzar con `VITE_`. Referenciaremos los repositorios relacionados más adelante.

---

## Estructura de carpetas (resumen)

Esta es una vista simplificada de las carpetas más relevantes del repo.

- `src/` — Código fuente de la app
  - `assets/` — Imágenes y recursos estáticos usados por la app
  - `feautures/` — Funcionalidades organizadas por dominio (Screaming Architecture)
    - Cada carpeta dentro de `feautures/` representa un dominio/feature (p. ej. `Auth`, `Home`, `Quiz`).
    - Dentro de cada feature suele haber subcarpetas como:
      - `Page/` — páginas o vistas principales del feature (SFCs que representan rutas)
      - `Components/` — componentes específicos del feature (presentacionales y contenedores)
      - `Services/` — lógica de integración (peticiones HTTP, wrappers de API) propia del feature
      - `types/` — tipos TypeScript ligados al feature
      - `__tests__/` — tests del feature (si aplica)
    - Ejemplo (estructura típica dentro de `feautures/Home`):

```text
feautures/
└─ Home/
   ├─ Page/
   │  └─ HomePage.vue
   ├─ Components/
   │  ├─ MyInfo.vue
   │  ├─ WorldMap.vue
   │  └─ LanguageSelector.vue
   ├─ Services/
   │  └─ HomeService.ts
   └─ types/
      └─ index.d.ts
```

Beneficios de este enfoque (Screaming Architecture):

- El repo “grita” su comportamiento por las carpetas: al abrir `feautures/Auth` sabes inmediatamente qué hace el módulo.
- La lógica y los assets relacionados están colocados cerca unos de otros (colocation), lo que facilita el mantenimiento y las pruebas.
- Escala bien en equipos grandes: equipos por dominio pueden trabajar aislados.
- Facilita el encapsulamiento: un feature tiene sus propios (services) y UI (components/pages).

Convenciones y buenas prácticas dentro de `feautures`:

- Exportar un `index.ts` cuando el feature necesita exponer utilidades o un punto de entrada.
- Mantener componentes compartidos (reutilizables entre features) en `src/shared/` o `src/components/` global.

Cómo añadir un nuevo feature:

1. Crear carpeta `feautures/NuevoFeature/`.
2. Añadir al menos `Page/` y `Components/` (aunque inicialmente vacíos).
3. Registrar rutas en `router/` apuntando a `feautures/NuevoFeature/Page/NuevoPage.vue`.

Diferencia entre `Core/` y `feautures/`:

- `Core/` guarda configuraciones y utilidades transversales (p. ej. `AxiosConfig.ts`, utilidades, constantes como `CountriesArray.ts`).
- `feautures/` contiene la lógica específica por dominio; evita que `Core` se convierta en un cajón de sastre.

- `router/` — Rutas de Vue Router
- `Stores/` — Store (Pinia o equivalente) — p. ej. `user.ts`
- `layouts/` — Layouts compartidos
- `Hooks/` — Hooks reutilizables (p. ej. `Record.Hook.ts`)
- `PushNotifications/` — Servicio de notificaciones
- `main.ts` — Punto de entrada

- `public/` — Archivos estáticos accesibles públicamente (p. ej. `world-countries.json`)
- `android/` — Proyecto Android generado por Capacitor
- `package.json`, `vite.config.ts`, `tsconfig.json` — configuración del proyecto

Si quieres un árbol más completo o un diagramado, puedo generar automáticamente un `README_FEATURES.md` con un árbol completo del directorio `feautures/`.

---

## Librerías usadas (principales)

- Vue 3
- Vite
- TypeScript
- Tailwind CSS
- Flowbite / Flowbite-Vue
- Leaflet (mapas) y GeoJSON (datos de países)
- Axios (configurado en `Core/AxiosConfig.ts`)
- Capacitor (para build móvil / integración nativa)
- Pinia o Vuex (store en `Stores/`)

Instaladas adicionales que puedes encontrar en `package.json`:
- linters, testing libs, utilidades varias.

---

## Tecnologías

Tecnologías principales utilizadas en el proyecto:

- Vite + Vue 3 + TypeScript
- Tailwind CSS para estilos utilitarios
- Leaflet + GeoJSON para mapas interactivos
- Capacitor para empaquetado nativo (Android)


![Vite](https://vitejs.dev/logo.svg)
---


## 🐳 Docker (opcional)

Si prefieres construir y ejecutar la aplicación dentro de un contenedor Docker, aquí tienes una guía práctica.

Nota: muchos Dockerfiles de frontend sirven la aplicación en un servidor estático (p. ej. `nginx`) o arrancan un servidor en `3000`. En desarrollo, podemos mapear el puerto interno `3000` al puerto de Vite `5173` en el host para mantener consistencia con `docker-compose.dev.yml` del launcher.

1) Build de la imagen (con build-args):

```powershell
# Desde la carpeta `main-app`
docker build -t main-globalang:latest \
  --build-arg VITE_API_URL=https://api.local \
  .
```

2) Ejecutar el contenedor (mapeando el puerto 3000 del contenedor al 5173 local):

```powershell
docker run -d \
  --name main-globalang \
  --env-file .env \
  -p 5173:3000 \
  main-globalang:latest
```

3) Ejemplo mínimo de `docker-compose.dev.yml` para desarrollo (volúmenes + mapeo de puertos):

```yaml
services:
  globalang-main:
    build:
      context: ./main-app
      args:
        VITE_API_URL: http://api.local
        VITE_PAY_URL: http://api.pay.local
    volumes:
      - ./main-app:/app
      - /app/node_modules
    ports:
      - "5173:3000" # mapea el puerto interno 3000 del contenedor al 5173 local
    env_file:
      - ./main-app/.env
    command: npm run dev

networks:
  default:
    external: false
```

Buenas prácticas y notas:

- Si necesitas que variables de build estén disponibles en tiempo de ejecución, en tu `Dockerfile` declara:

```dockerfile
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
```

- No comites archivos `.env` con secretos. Usa `--env-file` o `env_file:` en `docker-compose`.
- En modo desarrollo con volúmenes y `npm run dev` tendrás HMR si Vite está configurado correctamente.
- Para producción, típicamente se construye la app (`npm run build`) y se sirve con un servidor estático (nginx) en el contenedor; en ese caso mapea el puerto 80 del contenedor al puerto deseado en el host.

Comandos útiles:

```powershell
# Levantar y reconstruir en segundo plano
docker-compose -f docker-compose.dev.yml up --build -d

# Ver logs de la app principal
docker-compose -f docker-compose.dev.yml logs -f globalang-main

# Parar y eliminar recursos
docker-compose -f docker-compose.dev.yml down
```

Con esto tendrás instrucciones suficientes para construir y probar la imagen Docker de `main-app` tanto en desarrollo (con HMR) como para crear una imagen lista para producción.



## Contribuir

Si quieres contribuir:

1. Haz fork del repositorio.
2. Crea una rama con la tarea: `git checkout -b feat/nombre`.
3. Implementa cambios y agrega tests si aplica.
4. Abre un Pull Request describiendo tus cambios.

Revisa las convenciones de commits y estilos en el proyecto (si existe configuración de lint o contribución).

---

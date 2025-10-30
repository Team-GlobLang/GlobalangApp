# Globalang — Aplicación de aprendizaje de idiomas

Bienvenido al repositorio de Globalang. Este proyecto es una aplicación web móvil/híbrida construida con Vue 3 y Vite, orientada a aprender expresiones, regionalismos y recursos por país. Este README cubre los primeros pasos, la estructura del proyecto, variables de entorno, la arquitectura (servicios/hooks/componentes), y las librerías principales usadas.

---

## Primeros pasos

Requisitos:
# Globalang — Aplicación de aprendizaje de idiomas

Bienvenido al repositorio de Globalang. Esta aplicación está construida con Vue 3 y Vite y está enfocada en explorar expresiones y recursos por país.

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

## Tecnología y logos

Tecnologías principales utilizadas en el proyecto:

- Vite + Vue 3 + TypeScript
- Tailwind CSS para estilos utilitarios
- Leaflet + GeoJSON para mapas interactivos
- Capacitor para empaquetado nativo (Android)

Logos (visual):

![Vite](https://vitejs.dev/logo.svg) _Vite_

> Logo de Globalang: sustituye la ruta por la ubicación real del logo en `src/assets` o `public`.

```markdown
![Globalang](public/glob.png)
```

Si quieres, puedo añadir automáticamente un archivo de logo bajo `public/` o `src/assets/` y actualizar la ruta.

---

## Contribuir

Si quieres contribuir:

1. Haz fork del repositorio.
2. Crea una rama con la tarea: `git checkout -b feat/nombre`.
3. Implementa cambios y agrega tests si aplica.
4. Abre un Pull Request describiendo tus cambios.

Revisa las convenciones de commits y estilos en el proyecto (si existe configuración de lint o contribución).

---

## Licencia & Contacto


Contacto / Maintainers:

- Equipo: Team-GlobLang
- Repo: GlobalangApp

---

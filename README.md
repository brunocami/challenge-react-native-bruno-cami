# Challenge Técnico – React Native (Marketplace)

App de marketplace con **login**, **persistencia de sesión**, **tabs** (Feed / Productos) y **checkout simulado** según los criterios del challenge.

## Resumen del flujo
1) **Login** (email/pass hardcodeado) → valida y persiste sesión en AsyncStorage.  
2) **Tabs**:  
   - **Feed**: 
   - **Productos**: 
3) **Cerrar sesión**: limpia AsyncStorage y vuelve al login.

---

## 🧰 Stack elegido
- **React Native bare + TypeScript**  
- **Estado**: React **Context + useReducer**  
+- **Navegación**: `@react-navigation/native` + `@react-navigation/stack` + `@react-navigation/bottom-tabs`.  
- **Persistencia de sesión**: `@react-native-async-storage/async-storage`.  
- **Estilos**: `StyleSheet` nativo 
- **Íconos**: `react-native-vector-icons` (MaterialCommunityIcons).  

---

## 🏗️ Arquitectura y decisiones
**Auth**  
- `src/context/AuthContext.tsx`: maneja `{status, user}` con `useReducer`.  
- Acciones: `RESTORE` (boot desde AsyncStorage), `SIGN_IN`, `SIGN_OUT`, `RESTORE`.  
- `signIn` guarda `STORAGE_KEYS.user`; `signOut` borra storage.  
- `isAuthenticated = status === 'auth'`.

**Navegación**  
- `src/navigation/AppNavigator.tsx`:  
  - **Stack**: `Login` | `Main` (Tabs).  
  - **Tabs**: `Feed` | `Productos`.  
  - Tanto en login como en logout exitoso se resetea el navigation para evitar volver a la pantalla anterior con gestos `navigation.reset({ index: 0, routes: [{ name: 'Stack' }] })`.

**Datos**  

**Formato regional (es-AR)**  
- Moneda ARS, fechas `dd/MM/yyyy HH:mm`.  

---

## 🗂️ Estructura de carpetas
```
android/
ios/
src/
  assets/                # imágenes / mocks 
  components/            # Componentes reutilizables
  constants/             # claves y constantes (auth, colores, etc.)
  context/               # Estados globales de la App
  navigation/            # AppNavigator (Stack + Tabs)
  screens/               # Componentes principales de las vistas
  services/              # Servicios API
  types/                 # tipos typescript (User)
  utils/                 # Funciones comunes
  App.tsx
index.js
```

---

## 🔐 Credenciales de demo para el challenge
- **email**: `test@it.rock`  
- **password**: `123456`  

> Se validan localmente y se persisten en `AsyncStorage` bajo `STORAGE_KEYS.user`.

---

## ▶️ Setup y ejecución (npm)
> Requisitos previos: Node LTS, JDK 17+, Android SDK.

1) **Instalar dependencias**
```bash
npm install
```
2) **iOS (solo macOS)**
```bash
npx pod-install
```
3) **Correr en Android**
```bash
npx react-native run-android
```
4) **Correr en iOS**
```bash
npx react-native run-ios
```
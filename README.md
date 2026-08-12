# Invitación Digital — Mis XV Años 🌸

Invitación interactiva con sobre animado, cuenta regresiva, música de fondo y confirmación de asistencia por WhatsApp.

## 📁 Estructura del proyecto

```
invitacion-xv/
├── index.html      → estructura de la página (no editar salvo que sepas HTML)
├── css/style.css    → estilos y colores (no editar salvo que sepas CSS)
├── js/script.js     → lógica e interactividad (no editar salvo que sepas JS)
├── config.js        → ⭐ AQUÍ SE EDITA TODO ⭐
├── musica.mp3        → tu canción de fondo (agrégala tú)
└── README.md         → este archivo
```

## ✏️ Cómo personalizar la invitación

1. Abre el archivo **`config.js`** con cualquier editor de texto (o Visual Studio Code).
2. Cambia los valores entre comillas `" "` por tus datos: nombre, fecha, lugar, número de WhatsApp, etc.
3. Guarda el archivo.
4. Abre `index.html` haciendo doble clic — se abre en tu navegador y ya verás los cambios.

No necesitas tocar ningún otro archivo para cambiar la información básica.

## 🎵 Agregar música

1. Consigue una canción en formato **MP3** (usa música libre de derechos, por ejemplo de Pixabay Music o YouTube Audio Library, para evitar problemas de copyright si la vas a compartir públicamente).
2. Renómbrala como `musica.mp3`.
3. Colócala en la misma carpeta donde está `index.html`.

Si quieres usar otro nombre de archivo, cámbialo también en `config.js` en la línea `archivoMusica`.

## 📱 Cómo funciona el botón de confirmación

El botón "Confirmar asistencia" abre WhatsApp directamente con un mensaje预-escrito, usando el número que pongas en `config.js` (campo `whatsappNumero`). El invitado solo debe tocar "Enviar".

## 🌐 Cómo publicarla para compartir el link

Mientras el proyecto esté solo en tu computador, únicamente tú puedes verlo. Para conseguir un link que puedas mandar por WhatsApp/Instagram, tienes que subir la carpeta a un servicio de hosting gratuito. Las opciones más simples:

- **Netlify Drop** (netlify.com/drop) — arrastras la carpeta completa y te da un link al instante.
- **GitHub Pages** — si ya usas Git/GitHub, puedes subir el repo y activar Pages en la configuración.
- **Vercel** — similar a Netlify, conecta con GitHub o subes la carpeta directo.

## 🎨 Personalización avanzada (colores, fuentes, animaciones)

Si el cliente quiere cambiar colores o tipografía, eso se edita en `css/style.css`, en la sección `:root` al inicio del archivo — ahí están todos los colores como variables (`--rosewood`, `--gold`, `--cream`, etc.) para cambiarlos en un solo lugar.
# invitacion-XV

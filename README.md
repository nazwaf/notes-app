# 📝 NoteApp - Minimalist & Aesthetic Stationery

NoteApp adalah aplikasi manajemen catatan berbasis web yang dirancang dengan antarmuka **Aesthetic Stationery**. Terinspirasi dari desain *Habit Tracker* yang modern, aplikasi ini menawarkan pengalaman menulis yang menenangkan dengan pola background organik dan fitur fungsional yang lengkap.

![Aesthetic NoteApp](https://img.shields.io/badge/UI%2FUX-Aesthetic-pink?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-Vanilla%20JS-yellow?style=for-the-badge)
![Build Tool](https://img.shields.io/badge/Bundler-Webpack-blue?style=for-the-badge)

---

## ✨ Fitur Utama

* **🎨 Aesthetic UI**: Desain minimalis dengan pola background SVG organik (lingkaran dan titik) yang memberikan nuansa kertas catatan premium.
* **🌓 Smart Dark Mode**: Transisi tema gelap yang halus untuk kenyamanan penggunaan di berbagai kondisi cahaya.
* **📂 Dashboard & Archived**: Fitur untuk memisahkan catatan aktif dan mengarsipkan catatan lama agar tampilan tetap rapi.
* **🔍 Dynamic Search**: Fitur pencarian real-time dengan efek transisi lebar (expansion) yang interaktif tanpa garis outline yang kaku.
* **⚡ Modern Workflow**: Dibangun menggunakan **Native Web Components** dan dikelola secara profesional menggunakan **Webpack**.
* **🔄 API Integration**: Terhubung dengan Dicoding Notes API v2 untuk sinkronisasi data yang stabil.

---

## 🚀 Teknologi yang Digunakan

| Teknologi | Penggunaan |
| :--- | :--- |
| **Vanilla JavaScript** | Logika utama aplikasi tanpa framework eksternal. |
| **Web Components** | Custom Elements untuk struktur yang modular (`<note-list>`, dll). |
| **Webpack** | Module bundler untuk mengelola aset (JS, CSS) secara efisien. |
| **CSS3** | Animasi kustom, Grid layout, dan pola background SVG. |
| **REST API** | Integrasi data dengan backend Dicoding Notes API. |

---

## 📸 Tampilan Antarmuka

> **Aesthetic Background**: Menggunakan *SVG Radial Gradients* untuk menciptakan pola lingkaran dan titik-titik yang terinspirasi dari alat tulis premium.
> 
> **Interactive Search**: Kotak pencarian dengan efek *spring-expansion* dan tanpa garis outline hitam yang kaku.

---

## 🛠️ Cara Menjalankan Proyek

1.  **Clone Repositori**
    ```bash
    git clone (https://github.com/nazwaf/notes-app.git)
    ```

2.  **Masuk ke Direktori**
    ```bash
    cd notes-app
    ```

3.  **Instalasi Dependencies**
    Instal semua tools pengembangan yang diperlukan (Webpack, Loaders, Prettier)jalankan perintah:
    ```bash
    npm install
    ```

4.  **Jalankan Mode Pengembangan**
    ```bash
    npm run start
    ```

5.  **Build untuk Produksi**
    ```bash
    npm run build
    ```

5.  **Format Kode**
    ```bash
    npm run format
    ```
---

## 📁 Struktur Folder

```text
├── assets/
├── src/
│   ├── components/    # Web Components (Header, Form, List, Item)
│   ├── css/           # Styling (Pattern, Dark Mode, Animations)
│   └── js/            # Entry point & Logika API
├── index.html         # Struktur HTML Utama
├── webpack.dev.js     # Konfigurasi Development
├── webpack.prod.js    # Konfigurasi Production
└── package.json       # Script & Dependencies
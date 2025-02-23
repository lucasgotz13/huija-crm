<div align="center">

# Huija CRM

</div>
Sistema de gestión para el restaurante "Huija" que permite administrar características, monitorear el clima y gestionar recursos del establecimiento.

## 🌟 Características

- **Gestión de características del establecimiento**
  - Crear y administrar características individuales
  - Agrupar características relacionadas (ej: ventanas, mesas)
  - Control de estado (activo/inactivo)
  - Organización jerárquica mediante grupos

- **Widget del Clima**
  - Información en tiempo real del clima 
  - Muestra temperatura, condición, humedad y viento
  - Actualización automática de datos

- **Gestión de Ingredientes**
  - Control de inventario
  - Seguimiento de disponibilidad
  - Gestión de cantidades

## 🛠️ Tecnologías

- **Frontend**
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui

- **Backend**
  - Supabase (Base de datos y autenticación)
  - Server Actions
  - API OpenWeather

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/huija-crm.git
cd huija-crm
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
NEXT_PUBLIC_WEATHER_API_KEY=tu_clave_de_openweather
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```


## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👥 Autores

- **Lucas Gotz Baliner** -  [lucasgotz13](https://github.com/lucasgotz13)

## 🙏 Agradecimientos

- Shadcn por su increíble biblioteca de componentes UI
- OpenWeather por su API del clima
- Supabase por su plataforma backend
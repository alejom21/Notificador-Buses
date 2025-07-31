# Notificador de Buses

Una aplicación web que permite a los usuarios seleccionar rutas de buses, paraderos de origen y destino, configurar horarios semanales de notificación, y recibir avisos personalizados sobre la llegada del próximo bus y el tiempo estimado de llegada a destino.

## Tecnologías Utilizadas

- **Framework**: Next.js (React)
- **Estilos**: styled-components
- **API de datos**: [NextBus API](http://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf)
- **Lenguaje**: TypeScript

## Características Principales

1. **Selección de Agencia, Ruta y Paraderos**
   - El usuario puede seleccionar una agencia de buses, una ruta dentro de esa agencia y luego elegir el paradero de origen y destino.

2. **Configuración de Horarios Semanales**
   - Selección de día y hora para configurar una alerta semanal.
   - Las reservas se muestran con detalle: día, hora, ruta, paradero de origen y destino, y duración estimada del recorrido.
   - Se puede eliminar cualquier reserva o limpiar todas.

3. **Notificaciones Dinámicas**
   - Si el bus **aún no ha pasado**, se muestra la próxima hora de paso (redondeada a los próximos 20 min) y el tiempo estimado de llegada.
   - Si el bus **ya pasó**, se informa que ya pasó y también la próxima hora en la que pasará.
   - Las reservas de otros días se muestran separadas.

4. **Duración Estimada Aleatoria**
   - Cada reserva genera un tiempo aleatorio entre 15 y 45 minutos para simular un tiempo de viaje.

## Estructura del Proyecto

- **pages/index.tsx**: Página principal donde se integran todos los componentes.
- **components/BusSelector.tsx**: Permite seleccionar agencia, ruta y paraderos (origen y destino).
- **components/ScheduleConfig.tsx**: Permite agregar reservas horarias semanales.
- **components/NotificationPanel.tsx**: Muestra las notificaciones y permite eliminar reservas.
- **hooks/useAgencies.ts**, **useRoutes.ts**, **useBusNotifications.ts**: Hooks personalizados para consumir la API y gestionar notificaciones.
- **types.ts**: Define los tipos TypeScript compartidos entre componentes.

## Instalación y Ejecución Local

```bash
# Clonar el repositorio
https://github.com/alejom21/Notificador-Buses.git
cd Notificador-Buses

# Instalar dependencias
npm install

# Ejecutar la aplicación en desarrollo
npm run dev

```
## Despliegue
https://notificador-buses-88bsjha1m-alejandro-mejia-tabares-projects.vercel.app/

## Consideraciones Técnicas

Las notificaciones se actualizan cada minuto.

Las horas de paso del bus están basadas en intervalos fijos de 20 minutos (ej: 6:00, 6:20, 6:40...).

Si el usuario reserva un bus para un horario pasado, se le indica que ya pasó y se le muestra el próximo horario.


## Capturas de Pantalla

### Selección de Ruta y Paraderos
![Selector](public/screenshots/Captura1.png)

### Configuración de Horarios
![Horarios](public/screenshots/Captura2.png)

### Notificaciones de Buses
![Notificaciones](public/screenshots/Captura3.png)


## Autor

Alejandro Mejía - 1001005085
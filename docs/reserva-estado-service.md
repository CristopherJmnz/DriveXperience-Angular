# Servicio de Estado de Reservas

Este servicio centraliza toda la lógica para determinar y gestionar el estado de las reservas basándose únicamente en las fechas de inicio y fin.

## 📖 Uso Básico

### Hook Principal

```typescript
import { ReservaEstadoService } from './services/reserva-estado.service';

constructor(private reservaEstadoService: ReservaEstadoService) {}

// Obtener toda la información del estado de una reserva
const estadoInfo = this.reservaEstadoService.useReservaEstado(reserva);

console.log(estadoInfo);
// {
//   estado: 'activa',
//   icon: 'fas fa-play-circle',
//   text: 'Activa',
//   description: '3 días restantes',
//   cssClass: 'estado-activa',
//   esProxima: false,
//   terminaPronto: true,
//   diasRestantes: 3,
//   diasParaInicio: undefined,
//   diasDesdeFinalizacion: undefined
// }
```

### Métodos Individuales

```typescript
// Solo el estado
const estado = this.reservaEstadoService.getEstado(reserva); // 'pendiente' | 'activa' | 'completada' | 'expirada'

// Solo el ícono
const icon = this.reservaEstadoService.getIcon(reserva); // 'fas fa-hourglass-half'

// Solo el texto
const text = this.reservaEstadoService.getText(reserva); // 'Pendiente'

// Solo la clase CSS
const cssClass = this.reservaEstadoService.getCssClass(reserva); // 'estado-pendiente'
```

### Utilidades Adicionales

```typescript
// Duración de la reserva
const dias = this.reservaEstadoService.getDuration(reserva); // 15

// Fechas formateadas
const fechaInicio = this.reservaEstadoService.getFormattedStartDate(reserva);
const fechaFin = this.reservaEstadoService.getFormattedEndDate(reserva);

// Filtrar reservas por estado
const reservasActivas = this.reservaEstadoService.filterByEstado(reservas, 'activa');

// Estadísticas completas
const stats = this.reservaEstadoService.getEstadisticas(reservas);
// {
//   pendientes: 2,
//   activas: 1,
//   completadas: 8,
//   expiradas: 0,
//   proximasAComenzar: 1,
//   terminandoPronto: 1,
//   total: 11
// }

// Ordenamiento inteligente (prioridad de estado + alfabético)
const reservasOrdenadas = this.reservaEstadoService.sortReservasByPriority(reservas);
// Orden: activas -> pendientes -> completadas -> expiradas
// Dentro de cada estado: orden alfabético por nombre del coche

// Ordenamiento por fecha
const reservasPorFecha = this.reservaEstadoService.sortReservasByDate(reservas, 'desc');

// Ordenamiento múltiple
const reservasMultiple = this.reservaEstadoService.sortReservasMultiple(reservas, ['priority']);
```

## 🔄 Estados Posibles

| Estado | Descripción | Condición |
|--------|-------------|-----------|
| `pendiente` | La reserva aún no ha comenzado | `fecha_actual < fecha_inicio` |
| `activa` | La reserva está en curso | `fecha_inicio <= fecha_actual <= fecha_fin` |
| `completada` | La reserva ya terminó | `fecha_actual > fecha_fin` |
| `expirada` | Estado de error (no debería ocurrir) | Fallback |

## 🎨 CSS Classes

El servicio proporciona clases CSS consistentes:

```css
.estado-pendiente { /* Amarillo - Esperando */ }
.estado-activa { /* Verde - En curso */ }
.estado-completada { /* Gris - Finalizada */ }
.estado-expirada { /* Rojo - Error */ }
```

## 🚀 Ventajas

1. **Consistencia**: Mismo cálculo en todos los componentes
2. **Escalabilidad**: Fácil de mantener y actualizar
3. **Reutilización**: Un solo lugar para la lógica de estados
4. **Testeable**: Lógica centralizada fácil de probar
5. **Hook-like**: Patrón familiar para desarrolladores de React
6. **Tipado**: TypeScript completo para mejor DX

## 📱 Casos de Uso

- **Dashboard**: Mostrar estadísticas de reservas
- **Lista de Reservas**: Estados individuales y filtros con ordenamiento inteligente
- **Cards de Reserva**: Información completa del estado con badges visuales
- **Notificaciones**: Alertas basadas en proximidad/urgencia
- **Reportes**: Análisis de estados históricos
- **Ordenamiento**: Prioridad de estados (activas primero) + orden alfabético

## 🎨 Colores de Estados

Los badges de estado usan colores específicos para mejor UX:

- **Pendiente**: Amarillo (`#ffc107`) - Esperando a comenzar
- **Activa**: Verde (`#28a745`) - En curso actualmente
- **Completada**: Gris (`#6c757d`) - Finalizada exitosamente
- **Expirada**: Rojo (`#dc3545`) - Error o problema

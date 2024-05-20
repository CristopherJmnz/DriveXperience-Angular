import { Marca } from "./marca"

export interface Coche {
  idCoche: number
  aceleracion: number
  cambio: string
  color: string
  combustible: string
  descripcionGeneral: string
  descripcionFrontal: string
  descripcionTrasera: string
  estado: string
  banner: string
  imagen1: string
  imagen10: string
  imagen2: string
  imagen3: string
  imagen4: string
  imagen5: string
  imagen6: string
  imagen7: string
  imagen8: string
  imagen9: string
  nombreCoche: string
  plazas: number
  potenciaMax: string
  precioDia: number
  precioSemana: number
  traccion: string
  velocidadMax: number
  marca: Marca
}

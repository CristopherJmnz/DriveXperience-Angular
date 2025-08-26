import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private formData: any = {};
  private readonly FORM_DATA_KEY = 'reservaFormData';

  setFormData(data: any) {
    this.formData = data;
    // Guardar en localStorage para persistencia
    if (data && (data.fechaInicio || data.fechaFin)) {
      localStorage.setItem(this.FORM_DATA_KEY, JSON.stringify(data));
    }
  }

  getFormData() {
    // Si no hay datos en memoria, intentar cargar desde localStorage
    if (!this.formData || Object.keys(this.formData).length === 0) {
      const savedData = localStorage.getItem(this.FORM_DATA_KEY);
      if (savedData) {
        try {
          this.formData = JSON.parse(savedData);
        } catch (e) {
          console.warn('Error parsing saved form data from localStorage:', e);
          this.formData = {};
        }
      }
    }
    return this.formData;
  }

  clearFormData() {
    this.formData = {};
    localStorage.removeItem(this.FORM_DATA_KEY);
  }

  hasFormData(): boolean {
    const memoryData = this.formData && Object.keys(this.formData).length > 0;
    const storageData = localStorage.getItem(this.FORM_DATA_KEY);
    return memoryData || !!storageData;
  }

  hasValidReservationData(): boolean {
    const data = this.getFormData();
    return !!(data && data.fechaInicio && data.fechaFin && data.precio && data.idCoche);
  }
}

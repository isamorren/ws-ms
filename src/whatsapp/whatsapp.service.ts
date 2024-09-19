import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Cambia la importación de HttpService
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios'; // Importar el tipo AxiosResponse para tipar correctamente

@Injectable()
export class WhatsappService {
  private readonly whatsappApiUrl = 'https://graph.facebook.com/v20.0';
  private readonly phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID; // Configurado en el .env
  private readonly accessToken = process.env.WHATSAPP_ACCESS_TOKEN; // Configurado en el .env

  constructor(private readonly httpService: HttpService) {}

  // Método para enviar mensajes
  async sendMessage(to: string, message: string): Promise<any> {
    const url = `${this.whatsappApiUrl}/${this.phoneNumberId}/messages`;

    const payload = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: {
        body: message,
      },
    };

    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response: AxiosResponse<any> = await lastValueFrom(
        this.httpService.post(url, payload, { headers })
      );
      return response.data; // Ya no tendrás problemas de tipado aquí
    } catch (error) {
      throw new Error(`Error sending message: ${error.response?.data || error.message}`);
    }
  }

  // Método para crear plantillas
  async createTemplate(): Promise<any> {
    const url = `${this.whatsappApiUrl}/${this.phoneNumberId}/message_templates`;

    const payload = {
      name: 'your_template_name',
      language: { code: 'en_US' },
      components: [
        {
          type: 'BODY',
          text: 'Hello, this is a test template message.',
        },
      ],
    };

    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response: AxiosResponse<any> = await lastValueFrom(
        this.httpService.post(url, payload, { headers })
      );
      return response.data; // Corrección de tipado aquí también
    } catch (error) {
      throw new Error(`Error creating template: ${error.response?.data || error.message}`);
    }
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send-message')
  async sendMessage(
    @Body('to') to: string,
    @Body('message') message: string,
  ) {
    return this.whatsappService.sendMessage(to, message);
  }

  @Post('create-template')
  async createTemplate() {
    return this.whatsappService.createTemplate();
  }
}

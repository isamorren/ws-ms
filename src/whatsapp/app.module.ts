import { Module } from '@nestjs/common';
import { WhatsappModule } from './whatsapp.module';

@Module({
  imports: [WhatsappModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './entities/location.entity';
import { RitmStyle } from './entities/ritmStyle.entity';
import { SessionEntity } from './entities/session.entity';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity, LocationEntity, RitmStyle])],
  controllers: [SessionsController],
  providers: [SessionsService]
})
export class SessionsModule {}

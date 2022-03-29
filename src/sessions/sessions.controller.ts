import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';
import { CreateRitmStyleDto } from './dto/create-ritm-style.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { LocationEntity } from './entities/location.entity';
import { RitmStyle } from './entities/ritmStyle.entity';
// import { LocationEntity } from './entities/location.entity';
import { SessionEntity } from './entities/session.entity';
import { SessionsService } from './sessions.service';

@ApiTags('session')
@Controller('session')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create session' })
  @ApiBody({ type: CreateSessionDto })
  createSession(@Body(new ValidationPipe()) dto: CreateSessionDto): Promise<SessionEntity> {
    return this.sessionsService.createSession(dto)
  }

  @Get(':id')
  @ApiOperation({summary: 'Get session'})
  getSession(@Param('id') id: number): Promise<SessionEntity> {
    return this.sessionsService.getSession(id)
  }
  
  @Post('/location')
  @ApiOperation({ summary: 'Create session location' })
  @ApiBody({ type: CreateLocationDto })
  addSessionLocation(@Body(new ValidationPipe()) dto: CreateLocationDto): Promise<LocationEntity> {
    return this.sessionsService.createLocation(dto)
  }

  @Post('/ritm-style')
  @ApiOperation({ summary: 'Create ritm style' })
  @ApiBody({ type: CreateRitmStyleDto })
  addSessionRitmStyle(@Body(new ValidationPipe()) dto: CreateRitmStyleDto): Promise<RitmStyle> {
    return this.sessionsService.createRitmStyle(dto)
  }
}

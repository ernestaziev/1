import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { CreateRitmStyleDto } from './dto/create-ritm-style.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { LocationEntity } from './entities/location.entity';
import { RitmStyle } from './entities/ritmStyle.entity';
import { SessionEntity } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    @InjectRepository(RitmStyle)
    private readonly ritmStyleRepository: Repository<RitmStyle>,
    @InjectRepository(SessionEntity)
    private readonly sessionsRepository: Repository<SessionEntity>,
  ) {}

  createSession(dto: CreateSessionDto): Promise<SessionEntity> {
    const session = this.sessionsRepository.create();
    
    session.first_name = dto.first_name;
    session.last_name = dto.last_name;
    session.phone = dto.phone;
    session.status = dto.status;
    session.start_date = dto.start_date
    
    return this.sessionsRepository.save(session);
  }

  getSession(id: number): Promise<SessionEntity> {
    return this.sessionsRepository.findOne(id, {
      relations: ['location', 'ritm_style']
    })
  }

  async createLocation(dto: CreateLocationDto): Promise<LocationEntity> {
    const session = await this.sessionsRepository.findOne(dto.sessionId)

    if(!session) {
      throw new NotFoundException('session not found')
    }
    
    if((session.start_date.getTime() - Date.now()) < 0) {
      throw new BadRequestException('can not add the location. The session start date is past')
    }

    const location = this.locationRepository.create();
    location.name = dto.name;
    location.address = dto.address;
    location.arrangment = dto.arrangment;
    location.session = session;
    
    return this.locationRepository.save(location);
  }
  
  async createRitmStyle(dto: CreateRitmStyleDto): Promise<RitmStyle> {
    const session = await this.sessionsRepository.findOne(dto.sessionId)

    if(!session) {
      throw new NotFoundException('session not found')
    }
    
    if((session.start_date.getTime() - Date.now()) < 0) {
      throw new BadRequestException('can not add the ritmStyle. The session start date is past')
    }

    const ritmStyle = this.ritmStyleRepository.create();
    ritmStyle.title = dto.title;
    ritmStyle.price = dto.price;
    ritmStyle.status = dto.status;
    ritmStyle.session = session;
    
    return this.ritmStyleRepository.save(ritmStyle);
  }
}

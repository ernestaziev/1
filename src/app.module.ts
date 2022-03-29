import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { SessionsModule } from './sessions/sessions.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({

    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.postgres_host,
      port: parseInt(process.env.postgres_port),
      username: process.env.postgres_user,
      password: process.env.postgres_password,
      database: process.env.postgres_db,
      entities: ['dist/**/*.entity{.ts,.js}'],
      dropSchema: true, //потом удалить надо
      synchronize: true, //потом удалить надо
    }),
    BlogModule,
    SessionsModule,
    ReviewModule
  ],
})
export class AppModule {}

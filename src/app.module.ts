// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AlcoholReportsModule } from './alcohol-reports/alcohol-reports.module';
// import { ProductTypesModule } from './product-types/product-types.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>('DB_HOST'),
//         port: Number(configService.get<number>('DB_PORT')),
//         username: configService.get<string>('DB_USERNAME'),
//         password: configService.get<string>('DB_PASSWORD'),
//         database: configService.get<string>('DB_DATABASE'),
//         autoLoadEntities: true,
//         synchronize: true,
//       }),
//     }),
//     AlcoholReportsModule,
//     ProductTypesModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlcoholReportsModule } from './alcohol-reports/alcohol-reports.module';
import { ProductTypesModule } from './product-types/product-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        // ✅ RAILWAY (DATABASE_URL BOR BO‘LSA)
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: true,
            ssl: {
              rejectUnauthorized: false, // PUBLIC Railway DB uchun SHART
            },
          };
        }

        // ✅ LOCAL (DATABASE_URL YO‘Q BO‘LSA)
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<number>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),

    AlcoholReportsModule,
    ProductTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

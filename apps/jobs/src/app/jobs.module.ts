import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Packages } from '@jobber/grpc';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { join } from 'path';
import { PulsarModule } from '@jobber/pulsar';
import { FibonacciJob } from './jobs/fibonacci/fibonacci.job';
import { LoadProductJob } from './jobs/products/load-products.job';

@Module({
  imports: [
    DiscoveryModule,
    PulsarModule,
    ClientsModule.registerAsync([
      {
        name: Packages.AUTH,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.getOrThrow('AUTH_GRPC_SERVICE_URL'),
            package: Packages.AUTH,
            protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [FibonacciJob, JobsService, JobsResolver, LoadProductJob],
  exports: [],
})
export class JobsModule {}

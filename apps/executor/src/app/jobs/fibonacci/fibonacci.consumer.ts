import { Jobs } from '@jobber/nestjs';
import { FibonacciMessage, PulsarClient } from '@jobber/pulsar';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { iterate } from 'fibonacci';
import { JobConsumer } from '../job.consumer';
import { Packages } from '@jobber/grpc';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class FibonacciConsumer
  extends JobConsumer<FibonacciMessage>
  implements OnModuleInit
{
  constructor(
    @Inject(Packages.JOBS) clientJobs: ClientGrpc,
    pulsarClient: PulsarClient
  ) {
    super(Jobs.FIBONACCI, pulsarClient, clientJobs);
  }

  protected async execute(data: FibonacciMessage): Promise<void> {
    const result = await iterate(data.iterations);
    this.logger.log('RESULT', result);
  }
}

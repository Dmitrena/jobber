import { Jobs } from '@jobber/nestjs';
import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.job';
import { LoadProductsMessage, PulsarClient } from '@jobber/pulsar';

@Job({
  name: Jobs.LOAD_PRODUCTS,
  description: 'Load uploaded product data into the DB after enrichment.',
})
export class LoadProductJob extends AbstractJob<LoadProductsMessage> {
  protected messageClass = LoadProductsMessage;

  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}

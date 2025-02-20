import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';

@Job({
  name: 'Fibonacci Job',
  description: 'Calculate the Fibonacci sequence and store it in the DB',
})
export class FibonacciJob extends AbstractJob {}

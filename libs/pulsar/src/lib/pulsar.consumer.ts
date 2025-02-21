import { Consumer, Message } from 'pulsar-client';
import { PulsarClient } from './pulsar.client';

export abstract class PulsarConsumer {
  private consumer!: Consumer;

  constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly topic: string
  ) {}

  async inModuleInit() {
    this.consumer = await this.pulsarClient.createConsumer(
      this.topic,
      this.onMessage.bind(this)
    );
  }

  protected async acknowlege(message: Message) {
    await this.consumer.acknowledge(message);
  }

  protected abstract onMessage(message: Message): Promise<void>;
}

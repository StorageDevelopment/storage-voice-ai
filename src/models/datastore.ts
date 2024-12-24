import { createClient, RedisClientType } from "redis";

export class Datastore {

  private client: RedisClientType;


  public constructor(data: any) {

    this.client = createClient({ url: 'rediss://red-ctko46dds78s73c1c350:m6b6H7v1xpXWNRcvzWtfc8PxYssIvG7X@oregon-redis.render.com:6379' });


  }

  public async init(): Promise<void> {

    let result;

    if (!this.client.isOpen)
      result = await this.client.connect();

    
  }

  public async getJsonObject(key: string): Promise<any> {
    const objStr = await this.client.get(key) as string;
    return JSON.parse(objStr);
  }

  public async setJsonObject(key: string, obj: any): Promise<void> {
    await this.client.set(key, JSON.stringify(obj));
  }

  public async close(): Promise<void> {
    await this.client.quit();
  }

}

const client = new Datastore({});

export default client;
import { Datastore } from './datastore';
import { RedisDatastore } from './redis-datastore';
import { InMemoryDatastore } from './in-memory-datastore';
import { Env } from '../env';

let datastore: Datastore | null = null;



export class DatastoreFactory {

  static async getDatastore(): Promise<Datastore> {

    if (!datastore) {

      if (Env.DB_TYPE === 'redis') {
        datastore = new RedisDatastore();
        console.log("Using Redis Datastore");
        
      } else {
        datastore = new InMemoryDatastore();
        console.log("Using InMemory Datastore");
      }

      if(datastore)
        await datastore.open();

    }

    return datastore;

  }
}


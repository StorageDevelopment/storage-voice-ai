import { Datastore } from "./datastore";
import { createClient, RedisClientType } from "redis";
import { StorageLocation } from "./storage-location";
import { User } from "./user";
import { Task } from "./task";
import { HttpError } from "../http-error";

export class InMemoryDatastore implements Datastore {

  private keyStore: any = {};

  public constructor() {

   
  }

  public async open(): Promise<void> {

    const mspv = new StorageLocation({id: 1, name: 'My Storage Prescott Yonder', shortName:'mspy', corpShortName: 'cmay', tasks:[], users:[]});
    const mspvUsers = mspv.getUsers();
    const mspvTasks = mspv.getTasks();

    //users
    const aPurugganan = new User({id: 1, firstName: 'Alan', lastName: 'Purugganan', email: 'apurugganan@email.com', username: 'jp', password: 'jp'});
    const ePurugganan = new User({id: 2, firstName: 'Eberjan', lastName: 'Purugganan', email: 'epurugganan@email.com', username: 'ep', password: 'ep'});
    
    mspvUsers.push(aPurugganan);
    mspvUsers.push(ePurugganan);

    //create sample tasks
    const task0 = new Task({ id: 0, orderIdx: 0, name: 'Take out the garbage', description: 'Make the facility look clean', status: 'open', timestamp: null, completedBy: null, gpsLatitude: null, gpsLongitude: null});
    const task1 = new Task({ id: 1, orderIdx: 1, name: 'Turn off the lights', description: 'Save electricity', status: 'open', timestamp: null, completedBy: null, gpsLatitude: null, gpsLongitude: null });
    const task2 = new Task({ id: 2, orderIdx: 2, name: 'Close till', description: 'Count the money', status: 'open', timestamp: null, completedBy: null, gpsLatitude: null, gpsLongitude: null });

    mspvTasks.push(task0);
    mspvTasks.push(task1);
    mspvTasks.push(task2);
    
    this.keyStore['ma:storage-location:cmay:mspy'] = mspv;

  }

  public async getJson<T>(key: string, type: {new(data:any) : T}): Promise<T> {

    if(!this.keyStore[key])
      throw new HttpError(`Key ${key} not found in InMemoryDatastore`, 404);

    return this.keyStore[key] as T;
    
  }

  public async setJson(key: string, obj: any): Promise<void> {

    this.keyStore[key] = obj;
  }

  public async close(): Promise<void> {

    
  }

}

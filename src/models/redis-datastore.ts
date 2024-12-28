import { json } from "stream/consumers";
import { Datastore } from "./datastore";
import { createClient, RedisClientType } from "redis";
import { Env } from "../env";
import { HttpError } from "../http-error";


export class RedisDatastore implements Datastore {

  private client: RedisClientType | null = null;


  public constructor() {

  }

  public async open(): Promise<void> {

    let result;

    if (!this.client) {
      this.client = createClient({ url: Env.DB_CONN_STR });
      result = await this.client.connect();
    }


  }

  public async getJson<T>(key: string, type: { new(data: any): T }): Promise<T> {

    let objStr: string | null = null;
    let obj: any = null;

    if (this.client) {
      objStr = await this.client.get(key) as string;

      if (!objStr)
        throw new HttpError(`Key ${key} not found in RedisDatastore`, 404);

      obj = JSON.parse(objStr);

      if (!obj)
        throw new HttpError(`Unable to parse JSON string into object`, 500);

      obj = new type(obj);
    }

    return obj;
  }

  public async setJson(key: string, obj: any): Promise<void> {

    if (this.client)
      await this.client.set(key, JSON.stringify(obj));
  }

  public async close(): Promise<void> {

    if (this.client)
      await this.client.quit();
  }

}

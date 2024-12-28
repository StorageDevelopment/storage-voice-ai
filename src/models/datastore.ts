
export interface Datastore {

  open(): Promise<void>;

  getJson<T>(key: string, type: {new(data: any) : T}): Promise<T>;
  setJson(key: string, obj: any): Promise<void>;

  close(): Promise<void>;
}


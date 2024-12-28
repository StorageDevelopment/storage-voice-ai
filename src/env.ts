export class Env {
  public static DB_TYPE : string = process.env.DB_TYPE || 'inmem';
  public static DB_CONN_STR : string = process.env.DB_CONN_STR || 'inmem';
}


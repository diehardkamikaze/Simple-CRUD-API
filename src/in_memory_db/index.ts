import { v4 as uuidv4 } from 'uuid';

type TdataType = {
  [ key: string ]: any
}

export default class DB {
  _connected: boolean = false;
  _database_name: string;
  _data = new Map<string, TdataType>();
  _check_connection = () => { 
      if(!this._connected)
       throw new Error(`Вы не подключены к БД`);
  }

  constructor(dbname: string) {
    this._database_name = dbname;
  }

  connect() {
    if (this._connected)
      throw new Error(`Подключение с БД ${this._database_name} уже установлено`);
    this._connected = true;
  }

  read_as_list() {
    this._check_connection();
    let resultData = [];
    for (let [, value] of this._data)
      resultData.push(value);
    return resultData;
  }

  read(id: string) {
    this._check_connection();
    return this._data.get(id);
  }

  create(data: TdataType) {
    this._check_connection();
    let id = uuidv4();
    this._data.set(id, { id , ...data });
    return true;
  }

  update(id: string, data: TdataType) {
    if (!this._data.has(id))
      return false;
    this._data.set(id, { id , ...data });
    return true;
  }

  delete(id: string) {
    if (!this._data.has(id))
      return false;
    this._data.delete(id);
    return true;
  }

}

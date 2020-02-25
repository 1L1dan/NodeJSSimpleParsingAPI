export interface IRepositoryBase<T> {
    exists(t: string): Promise<boolean>;
    create(t: T): Promise<T>;
    readAll():Promise<T[]>;
    readOne(t:string):Promise<T | null>;
    update(t: T): Promise<number>; 
    delete(t: T): Promise<any>;
  }
import { Comment } from './comment.model'

export class Bottle {
  public static NEW_ID: number = -1;

  constructor(
    public id: number = Bottle.NEW_ID,
    public title?: string,
    public description?: string,
    public lat?: number,
    public lng?: number,
    public comments?: Comment[]) { }

  public isNewBottle(): boolean {
    return this.id == Bottle.NEW_ID;
  }
}

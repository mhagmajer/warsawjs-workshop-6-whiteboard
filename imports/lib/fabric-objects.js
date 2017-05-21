import { Mongo } from 'meteor/mongo';

class Collection extends Mongo.Collection {
  async genInsert(doc) {
    return new Promise((resolve, reject) => {
      this.insert(doc, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

export default new Collection('fabricObjects');

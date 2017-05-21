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

  async genUpdate(selector, modifier, options) {
    return new Promise((resolve, reject) => {
      this.update(selector, modifier, options, (error, result) => {
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

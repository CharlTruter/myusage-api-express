import schema from '../models/schema';
import db from '../db';

export const CreateEntity = entity => (
  schema(db).Entity.query()
    .insert(entity)
    .returning('*')
);


export const GetEntityByRealmAndName = (realmId, name, userId) => (
  schema(db).Entity.query()
    .joinRelation('realm')
    .findOne({ realm_id: realmId, name, 'realm.user_id': userId })
);

export const GetEntityById = (entityId, userId) => (
  schema(db).Entity.query()
    .joinRelation('realm')
    .findOne({ id: entityId, 'realm.user_id': userId })
);

export const UpdateEntity = (entity, userId) => (
  new Promise((resolve, reject) => (
    this.GetEntityById(entity.id, userId)
      .then((dbEntity) => {
        if (!dbEntity) {
          return reject(new Error('No such entity exists'));
        }

        return resolve(schema(db).Entity.query()
          .patch({ friendly_name: entity.friendly_name })
          .where({ id: entity.id, userId })
          .returning('*')
          .first());
      })
      .catch(reject)
  ))
);

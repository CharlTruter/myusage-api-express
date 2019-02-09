import { GetEntityByRealmAndName, CreateEntity } from '../repositories/entity';

export const ConstructEntity = (name, realmId) => ({
  name,
  realm_id: realmId,
});

export const CreateIfNotExist = (name, realmId, userId) => (
  new Promise((resolve, reject) => {
    try {
      return GetEntityByRealmAndName(realmId, name, userId)
        .then((entity) => {
          if (entity) {
            return resolve(entity);
          }

          return CreateEntity(this.ConstructEntity(name, realmId))
            .then(resolve);
        });
    } catch (err) {
      return reject(err);
    }
  })
);

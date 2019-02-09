import { GetRealmByName, CreateRealm } from '../repositories/realm';

export const ConstructRealm = (realmName, userId) => ({
  name: realmName,
  user_id: userId,
  enabled: true,
});

export const CreateIfNotExist = (realmName, userId) => (
  new Promise((resolve, reject) => {
    try {
      return GetRealmByName(realmName, userId)
        .then((realm) => {
          if (realm) {
            return resolve(realm);
          }

          return CreateRealm(this.ConstructRealm(realmName, userId))
            .then(resolve);
        });
    } catch (err) {
      return reject(err);
    }
  })
);

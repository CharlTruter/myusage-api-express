import schema from '../models/schema';
import db from '../db';

export const CreateRealm = realm => (
  schema(db).Realm.query()
    .insert(realm)
    .returning('*')
);

export const GetRealmByName = (name, userId) => (
  schema(db).Realm.query()
    .findOne({ user_id: userId, name })
);

export const UpdateRealm = (realmId, realm, userId) => (
  schema(db).Realm.query()
    .patch({ enabled: realm.enabled })
    .where({ id: realmId, user_id: userId })
    .returning('*')
    .first()
);

export const GetAllRealms = userId => (
  schema(db).Realm.query()
    .where('user_id', userId)
);

export const GetRealmById = (realmId, userId) => (
  schema(db).Realm.query()
    .findOne({ id: realmId, user_id: userId })
);

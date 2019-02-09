import { CreateIfNotExist as RealmCreateIfNotExist } from './realm';
import { CreateIfNotExist as EntityCreateIfNotExist } from './entity';
import { CreateMany as EntityUsageCreateMany, ConstructEntityUsage } from './entityUsage';

export const CreateUsage = (usages, userId) => (
  new Promise((resolve, reject) => {
    if (!userId) {
      return reject(new Error('No user id specified'));
    }

    const realmNames = this.GetUniqueRealmNames(usages);

    if (realmNames.length === 0) {
      return reject(new Error('No realm names specified for the usage entries'));
    }

    return this.GetRealmsId(realmNames, userId)
      .then((realmPairs) => {
        if (Object.keys(realmPairs) !== realmNames.length) {
          return reject(new Error('Number of realms retrieved from database does not match provided realm list'));
        }

        const nameAndRealmInfo = this.GetNameAndRealmIdUniques(usages, realmPairs);

        if (Object.keys(nameAndRealmInfo).length === 0) {
          return reject(new Error('No name and realm info could be generated for the usage entries'));
        }

        return this.GetRealmsEntityIds(nameAndRealmInfo, userId)
          .then(realmEntityPairs => (
            resolve(EntityUsageCreateMany(this.GetEntityUsages(usages, realmPairs,
              realmEntityPairs, userId)))
          ));
      });
  })
);

export const GetEntityUsages = (usages, realmPairs, realmEntityPairs, userId) => (
  usages.map(usage => (
    this.GetEntityUsage(usage, realmPairs, realmEntityPairs, userId)
  ))
);

export const GetEntityUsage = (usage, realmPairs, realmEntityPairs, userId) => {
  const realmId = realmPairs[usage.realmName];

  if (!realmId) {
    throw new Error(`No realm id could be found for ${usage.realmName}`);
  }

  const entityId = realmEntityPairs[realmId][usage.name];

  if (!entityId) {
    throw new Error(`No entity id could be found for realm ${usage.realmName} and name ${usage.name}`);
  }

  return ConstructEntityUsage(usage.bytesDownloaded, usage.bytesUploaded,
    usage.usageDate, realmId, entityId, userId);
};

export const GetRealmsEntityIds = (nameAndRealmInfo, userId) => (
  new Promise(resolve => (
    Promise.all(Object.keys(nameAndRealmInfo)
      .map(realmName => (this.GetRealmEntityIds(nameAndRealmInfo[realmName], userId))))
      .then(results => (
        resolve(results.reduce((map, result) => (
          Object.assign(map, result)
        )))
      ))
  ))
);

export const GetRealmEntityIds = (entityInfo, userId) => (
  new Promise(resolve => (
    Promise.all(Object.keys(entityInfo)
      .map(name => (this.GetEntityId(name, entityInfo[name], userId))))
      .then(entities => (
        resolve(entities.reduce((map, entity) => {
          const realmId = entity.realm_id;
          if (Object.keys(map).indexOf(realmId) < 0) {
            map[realmId] = {}; // eslint-disable-line no-param-reassign
          }

          map[realmId][entity.name] = entity.id; // eslint-disable-line no-param-reassign

          return map;
        }))
      ))
  ))
);

export const GetEntity = (name, realmId, userId) => (
  EntityCreateIfNotExist(name, realmId, userId)
);

export const GetUniqueRealmNames = usages => (
  usages
    .map(usage => usage.realmName)
    .filter((realmName, position, arr) => (
      arr.indexOf(realmName) === position
    ))
);

export const GetNameAndRealmIdUniques = (usages, realmPairs) => (
  Object.keys(realmPairs)
    .reduce((map, realmName) => {
      map[realmName] = usages // eslint-disable-line no-param-reassign
        .filter(usage => usage.realmName.equals(realmName))
        .reduce((iMap, usage) => {
          if (Object.keys(iMap).indexOf(usage.name) < 0) {
            iMap[usage.name] = realmPairs[realmName]; // eslint-disable-line no-param-reassign
          }
          return iMap;
        });
      return map;
    })
);

export const GetRealmsId = (realmNames, userId) => (
  new Promise(resolve => (
    Promise.all(realmNames.map(realmName => (
      this.GetRealmId(realmName, userId)
    ))).then(realms => (
      resolve(realms.reduce(this.ReduceRealmsToPair))
    ))
  ))
);

export const ReduceRealmsToPair = (map, realm) => {
  map[realm.name] = realm.id; // eslint-disable-line no-param-reassign

  return map;
};


export const GetRealm = (realmName, userId) => (
  RealmCreateIfNotExist(realmName, userId)
);

import CreateEntityUsage from '../repositories/entityUsage';

export const ConstructEntityUsage = (bytesDownloaded, bytesUploaded, usageDate, realmId, entityId,
  userId) => ({
  bytes_downloaded: bytesDownloaded,
  bytes_uploaded: bytesUploaded,
  usage_date: usageDate,
  realm_id: realmId,
  entity_id: entityId,
  user_id: userId,
});

export const CreateMany = entityUsages => (
  new Promise((resolve, reject) => {
    try {
      return CreateEntityUsage(entityUsages)
        .then(resolve);
    } catch (err) {
      return reject(err);
    }
  })
);

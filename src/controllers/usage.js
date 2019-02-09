import resource from 'resource-router-middleware';

import { CreateUsage } from '../services/usage';

const userId = '5b152aa3-9c4f-4394-b23a-1fb0fc9ac30f';

export default () => resource({
  /** Property name to store preloaded entity on `request`. */
  id: 'realm',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  /* load(req, id, callback) {
    return realmRepository(db)
      .GetRealmById(id, userId)
      .then(realm => {
        callback(realm ? null : 'Not found', realm)
      })
  }, */

  /** POST / - Create a new entity */
  create({ body }, res) {
    return CreateUsage(body, userId)
      .then(entityUsages => (
        res.json(entityUsages)
      ));
  },
});

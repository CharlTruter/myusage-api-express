import schema from '../models/schema';
import db from '../db';

const CreateEntityUsage = entityUsage => (
  schema(db).EntityUsage.query()
    .insert(entityUsage)
    .returning('*')
);

export default CreateEntityUsage;

const { Model } = require('objection');

class Realm extends Model {
  static get tableName() {
    return 'realms';
  }

  static get relationMappings() {
    return {
      entities: {
        relation: Model.HasManyRelation,
        modelClass: Entity, // eslint-disable-line no-use-before-define
        join: {
          from: 'realms.id',
          to: 'entities.realm_id',
        },
      },
      entityUsage: {
        relation: Model.HasManyRelation,
        modelClass: EntityUsage, // eslint-disable-line no-use-before-define
        join: {
          from: 'realms.id',
          to: 'entity_usages.realm_id',
        },
      },
    };
  }
}

class Entity extends Model {
  static get tableName() {
    return 'entities';
  }

  static get relationMappings() {
    return {
      realm: {
        relation: Model.BelongsToOneRelation,
        modelClass: Realm,
        join: {
          from: 'entities.realm_id',
          to: 'realms.id',
        },
      },
      entityUsage: {
        relation: Model.HasManyRelation,
        modelClass: EntityUsage, // eslint-disable-line no-use-before-define
        join: {
          from: 'entities.id',
          to: 'entity_usages.entity_id',
        },
      },
    };
  }
}

class EntityUsage extends Model {
  static get tableName() {
    return 'entity_usages';
  }

  static get relationMappings() {
    return {
      entity: {
        relation: Model.BelongsToOneRelation,
        modelClass: Entity,
        join: {
          from: 'entityUsage.entity_id',
          to: 'entity.id',
        },
      },
      realm: {
        relation: Model.BelongsToOneRelation,
        modelClass: Realm,
        join: {
          from: 'entityUsage.realm_id',
          to: 'realms.id',
        },
      },
    };
  }
}

export default (connection) => {
  Model.knex(connection);

  return {
    Realm,
    Entity,
    EntityUsage,
  };
};


exports.seed = knex => (
  // Deletes ALL existing entries
  knex('entities').truncate()
    .then(() => (
      // Inserts seed entries
      knex('entities').insert([
        { name: '192.168.0.1', friendly_name: 'Desktop', realm_id: 1 },
        { name: '192.168.0.2', friendly_name: 'Macbook', realm_id: 1 },
        { name: '192.168.0.3', friendly_name: 'Laptop', realm_id: 1 },
        { name: '192.168.0.4', friendly_name: 'Iphone', realm_id: 1 },
        { name: '192.168.0.5', realm_id: 1 },
        { name: '192.168.0.6', realm_id: 1 },
        { name: '10.0.0.100', friendly_name: 'Gaming PC', realm_id: 2 },
        { name: '10.0.0.101', friendly_name: 'Media Server', realm_id: 2 },
        { name: '10.0.0.103', friendly_name: 'Galaxy Tablet', realm_id: 2 },
        { name: '10.0.0.104', friendly_name: 'Galaxy S8', realm_id: 2 },
        { name: '10.0.0.105', realm_id: 2 },
        { name: '10.0.0.106', realm_id: 2 },
        { name: '192.168.1.200', friendly_name: 'Ipad', realm_id: 3 },
        { name: '192.168.1.201', friendly_name: 'Xbox One', realm_id: 3 },
        { name: '192.168.1.203', friendly_name: 'PS4', realm_id: 3 },
        { name: '192.168.1.204', friendly_name: 'Switch', realm_id: 3 },
        { name: '192.168.1.205', realm_id: 3 },
        { name: '192.168.1.206', realm_id: 3 },
      ])
    ))
);

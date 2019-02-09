exports.seed = knex => (
  // Deletes ALL existing entries
  knex('realms').truncate()
    .then(() => (
      // Inserts seed entries
      knex('realms').insert([
        { name: 'home', user_id: '5b152aa3-9c4f-4394-b23a-1fb0fc9ac30f', enabled: true },
        { name: 'work', user_id: '0ffd531d-e03d-4119-a94b-6cb79a0d52aa', enabled: true },
        { name: 'internet', user_id: '5778ec7e-5908-4231-a4b3-1cd0b15c7b7f', enabled: false },
      ])
    ))
);

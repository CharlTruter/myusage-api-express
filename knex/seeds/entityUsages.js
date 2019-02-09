function getStartDate() {
  const returnDate = new Date();

  returnDate.setMonth(returnDate.getMonth() - 1);

  return returnDate;
}

function getRandomUsage() {
  return Math.floor(Math.random() * 629145600) + 5242880;
}

function generateRandomUsageEntry(userId, realmId, entityId, usageDate) {
  return {
    user_id: userId,
    realm_id: realmId,
    entity_id: entityId,
    usage_date: usageDate,
    bytes_downloaded: getRandomUsage(),
    bytes_uploaded: getRandomUsage(),
  };
}

function generateRandomUsages(userId, realmId, entityId, startDate, endDate) {
  const usages = [];

  const date = new Date(startDate.getTime());

  while (date.getTime() <= endDate.getTime()) {
    if (Math.random() >= 0.1) {
      const usageEntry = generateRandomUsageEntry(userId, realmId, entityId, date);
      usages.push(usageEntry);
    }

    date.setMinutes(date.getMinutes() + 20);
  }

  return usages;
}

function generateUsage() {
  const usages = [];

  const startDate = getStartDate();
  const endDate = new Date();

  usages.push(...generateRandomUsages('5b152aa3-9c4f-4394-b23a-1fb0fc9ac30f', 1, 1, startDate, endDate));
  usages.push(...generateRandomUsages('5b152aa3-9c4f-4394-b23a-1fb0fc9ac30f', 1, 2, startDate, endDate));
  usages.push(...generateRandomUsages('5b152aa3-9c4f-4394-b23a-1fb0fc9ac30f', 1, 3, startDate, endDate));
  usages.push(...generateRandomUsages('5b152aa3-9c4f-4394-b23a-1fb0fc9ac30f', 1, 4, startDate, endDate));
  usages.push(...generateRandomUsages('5b152aa3-9c4f-4394-b23a-1fb0fc9ac30f', 1, 5, startDate, endDate));
  usages.push(...generateRandomUsages('5b152aa3-9c4f-4394-b23a-1fb0fc9ac30f', 1, 6, startDate, endDate));

  usages.push(...generateRandomUsages('0ffd531d-e03d-4119-a94b-6cb79a0d52aa', 2, 7, startDate, endDate));
  usages.push(...generateRandomUsages('0ffd531d-e03d-4119-a94b-6cb79a0d52aa', 2, 8, startDate, endDate));
  usages.push(...generateRandomUsages('0ffd531d-e03d-4119-a94b-6cb79a0d52aa', 2, 9, startDate, endDate));
  usages.push(...generateRandomUsages('0ffd531d-e03d-4119-a94b-6cb79a0d52aa', 2, 10, startDate, endDate));
  usages.push(...generateRandomUsages('0ffd531d-e03d-4119-a94b-6cb79a0d52aa', 2, 11, startDate, endDate));
  usages.push(...generateRandomUsages('0ffd531d-e03d-4119-a94b-6cb79a0d52aa', 2, 12, startDate, endDate));

  usages.push(...generateRandomUsages('5778ec7e-5908-4231-a4b3-1cd0b15c7b7f', 3, 13, startDate, endDate));
  usages.push(...generateRandomUsages('5778ec7e-5908-4231-a4b3-1cd0b15c7b7f', 3, 14, startDate, endDate));
  usages.push(...generateRandomUsages('5778ec7e-5908-4231-a4b3-1cd0b15c7b7f', 3, 15, startDate, endDate));
  usages.push(...generateRandomUsages('5778ec7e-5908-4231-a4b3-1cd0b15c7b7f', 3, 16, startDate, endDate));
  usages.push(...generateRandomUsages('5778ec7e-5908-4231-a4b3-1cd0b15c7b7f', 3, 17, startDate, endDate));
  usages.push(...generateRandomUsages('5778ec7e-5908-4231-a4b3-1cd0b15c7b7f', 3, 18, startDate, endDate));

  return usages;
}

exports.seed = knex => (
  // Deletes ALL existing entries
  knex('entity_usages').truncate()
    .then(() => (
      // Inserts seed entries
      knex.batchInsert('entity_usages', generateUsage(), 1000)
    ))
);

const { db } = require('@vercel/postgres');

const {
  CATEGORIES,
  STRATAGEMS,
} = require('../app/lib/placeholder-data-helldivers.js');

async function seedStratagemsCategories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "categories" table if it doesn't exist
    const createTable = await client.sql`CREATE TABLE IF NOT EXISTS categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )`;

    // Insert data into the "categories" table
    const insertedCategories = await Promise.all(
      CATEGORIES.map(
        (categorie) => client.sql`
            INSERT INTO categories (id, name)
            VALUES (${categorie.id}, ${categorie.name})
            ON CONFLICT (id) DO NOTHING;
          `,
      ),
    );

    console.log(`Seeded ${insertedCategories.length} categories`);

    return {
      createTable,
      categories: insertedCategories,
    };
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
}

async function seedStatagems(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "stratagems" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS stratagems (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(255) NOT NULL,
        category_id UUID NOT NULL
      );
    `;

    console.log('Created "stratagems" table');

    // Insert data into the "stratagems" table
    const insertedStratagems = await Promise.all(
      STRATAGEMS.map(
        (stratagem) => client.sql`
          INSERT INTO stratagems (name, code, category_id)
          VALUES (${stratagem.name}, ${JSON.stringify(stratagem.code)}, ${stratagem.category_id})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedStratagems.length} stratagems`);

    return {
      createTable,
      stratagems: insertedStratagems,
    };
  } catch (error) {
    console.error('Error seeding stratagems:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedStratagemsCategories(client);
  await seedStatagems(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

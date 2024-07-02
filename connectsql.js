

import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// PostgreSQL database connection configuration
const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'secrets',
  password: 'Kailzxh@123',
  port: 5432,
});

async function executeQueriesFromFile() {
  try {
    await db.connect();

    // Read queries.sql file
    const sqlFilePath = path.join(__dirname, 'queries.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    // Split queries by semicolon and filter out empty queries
    const queries = sql.split(';').filter(query => query.trim() !== '');

    // Execute each query
    for (let query of queries) {
      await db.query(query);
      console.log(`Executed query: ${query}`);
    }

    console.log('All queries executed successfully!');
  } catch (err) {
    console.error('Error executing queries:', err.message);
  } finally {
    await db.end(); // Close database connection
  }
}

executeQueriesFromFile();

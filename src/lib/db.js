import { neon } from '@neondatabase/serverless';

// Create a SQL client using the connection string from environment
const sql = neon(import.meta.env.VITE_DATABASE_URL);

export default sql;

// Helper function to run queries
export async function query(sqlQuery, params = []) {
  try {
    const result = await sql(sqlQuery, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

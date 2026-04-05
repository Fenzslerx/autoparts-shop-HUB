
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DB_ID = process.env.D1_DATABASE_ID;

async function testConnection() {
    try {
        const sql = "SELECT id, name, is_active FROM products LIMIT 5";
        const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DB_ID}/query`;

        console.log('Fetching products status...');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sql }),
        });

        if (!response.ok) {
            console.error('HTTP Error:', response.status, await response.text());
            return;
        }

        const data = await response.json();
        console.log('Products Sample:', JSON.stringify(data.result[0].results, null, 2));
    } catch (error) {
        console.error('Connection Failed:', error);
    }
}

testConnection();

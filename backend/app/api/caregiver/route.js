import { Folder } from 'lucide-react';
import { getCaregiverNameFromSheet } from '@/src/lib/sheets';
import { env } from 'process';

// CORS headers
function getCorsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(req) {
  return new Response(null, {
    status: 200,
    headers: getCorsHeaders(),
  });
}

export async function GET(req) {
  try {
    // Ensure configuration is loaded
    const { ensureConfigLoaded } = await import('@/src/lib/sheets');
    await ensureConfigLoaded();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    console.log("%%%%%%% Caregiver fetching from email:", email);
    if (!email) {
      return new Response(JSON.stringify({ error: 'Missing email parameter' }), { 
        status: 400,
        headers: getCorsHeaders(),
      });
    }

    const caregiverName = await getCaregiverNameFromSheet(email);
    console.log("%%%%%%% Caregiver name fetched in backend:", caregiverName);
    return new Response(JSON.stringify({ caregiverName }), { 
      status: 200,
      headers: getCorsHeaders(),
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: getCorsHeaders(),
    });
  }
}

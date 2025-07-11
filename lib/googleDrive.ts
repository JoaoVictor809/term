import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import path from 'path';
import fs from 'fs';

const credentials = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'credentials', 'service-account.json'), 'utf-8')
);

// Autenticação
const auth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

export async function uploadToGoogleDrive(buffer: Buffer, fileName: string, mimeType: string, folderId: string) {
  const fileMetadata = {
    name: fileName,
    parents: [folderId], // ID da pasta compartilhada com a Service Account
  };

  const media = {
    mimeType,
    body: Buffer.from(buffer),
  };

  const res = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id, webViewLink, webContentLink',
  });

  return res.data;
}

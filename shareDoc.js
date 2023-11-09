const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

async function shareGoogleDoc() {
  try {
    // Load the credentials file you downloaded from the Google Cloud Console
    const credentials = require('./ringed-hallway-404614-18be0e5e2bc4.json');

    // Use the credentials directly
    const auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const client = await auth.getClient();

    // Create a new Google Drive API client
    const drive = google.drive({ version: 'v3', auth: client });

    // Replace 'documentId' with the actual document ID
    const documentId = '17VOhWjPD7RcHag-JE-dzNghGfKVcCBYfnXvc3xhfoQs';

    // Specify the email address of the user to share with
    const emailAddress = 'daiyajaykishan@gmail.com';

    // Set the permission details
    const permission = {
      type: 'user',
      role: 'writer', // Adjust the role as needed (e.g., 'writer' for editing)
      emailAddress,
    };

    // Add the permission to the document
    const response = await drive.permissions.create({
      fileId: documentId,
      resource: permission,
    });

    console.log('Permission added:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

shareGoogleDoc();

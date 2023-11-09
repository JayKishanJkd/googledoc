const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

async function createGoogleDoc() {
  try {
    // Load the credentials file you downloaded from the Google Cloud Console
    const credentials = require('./ringed-hallway-404614-18be0e5e2bc4.json');

    // Use the credentials directly
    const auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/documents'],
    });

    const client = await auth.getClient();

    // Create a new Google Docs API client
    const docs = google.docs({ version: 'v1', auth: client });

    // Define the content of your Google Doc
    const documentContent = {
      title: 'It worked!',
      body: {
        content: [
          {
            paragraph: {
              elements: [
                {
                  textRun: {
                    content: 'Congratulations! You created a Google Doc with the Google Docs API!',
                  },
                },
              ],
            },
          },
        ],
      },
    };

    // Create the Google Doc
    const { data } = await docs.documents.create({
      resource: documentContent,
    });

    console.log('Google Doc created:');
    console.log('Title:', data.title);
    console.log('Document ID:', data.documentId);
    console.log('Link:', `https://docs.google.com/document/d/${data.documentId}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

createGoogleDoc();

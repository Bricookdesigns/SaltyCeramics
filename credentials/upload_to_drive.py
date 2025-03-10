import os
import pickle
import io
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

# Define the scopes
SCOPES = ['https://www.googleapis.com/auth/drive.file']

# Authenticate the user and create the service
def authenticate():
    creds = None
    # The file token.pickle stores the user's access and refresh tokens.
    # It is created automatically when the authorization flow completes for the first time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)

    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials/client_secrets.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    # Build the Drive API client
    service = build('drive', 'v3', credentials=creds)
    return service

# Upload a file to Google Drive
def upload_file(service, file_path):
    file_metadata = {'name': os.path.basename(file_path)}
    media = MediaFileUpload(file_path, resumable=True)
    request = service.files().create(media_body=media, body=file_metadata)
    file = request.execute()
    print(f"File '{file['name']}' uploaded successfully!")

if __name__ == '__main__':
    service = authenticate()
    file_path = 'path/to/your/image.jpg'  # Replace this with the path to your file
    upload_file(service, file_path)

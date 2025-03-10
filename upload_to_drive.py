import os
import pickle
import io
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.auth.transport.requests import Request  # Import Request for refreshing the token

# If modifying the files, use this SCOPES list
SCOPES = ['https://www.googleapis.com/auth/drive.file']

def authenticate():
    """Authenticate the user and return the service object."""
    creds = None
    # The file token.pickle stores the user's access and refresh tokens.
    # It is created automatically when the authorization flow completes for the first time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)

    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())  # Refresh the token
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials/client_secrets.json', SCOPES)
            creds = flow.run_local_server(port=0)

        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    # Build the Google Drive service
    service = build('drive', 'v3', credentials=creds)
    return service

def upload_file(service, file_path, folder_id=None):
    """Upload a file to Google Drive."""
    file_name = os.path.basename(file_path)

    # Create media file upload object
    media = MediaFileUpload(file_path, mimetype='application/octet-stream')

    # Create a file metadata dictionary
    file_metadata = {'name': file_name}

    if folder_id:
        file_metadata['parents'] = [folder_id]

    # Upload the file
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()

    print(f"File ID: {file['id']}")

def main():
    """Authenticate and upload a file."""
    service = authenticate()

    # Set the file path to the file you want to upload
    file_path = r'C:\Users\15704\OneDrive\Desktop\Projects\SaltyCeramics\upload_to_drive.py'  # Modify this path

    # Upload the file
    upload_file(service, file_path)

if __name__ == '__main__':
    main()

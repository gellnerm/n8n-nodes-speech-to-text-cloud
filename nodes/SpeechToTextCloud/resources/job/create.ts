import type { INodeProperties } from 'n8n-workflow';

const showOnlyForJobCreate = { operation: ['create'], resource: ['job'] };

export const jobCreateDescription: INodeProperties[] = [
  {
    displayName: 'Audio File',
    name: 'audio_file',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyForJobCreate },
    description: 'Binary data of the audio/video file. Connect an HTTP Request node (Response Format: File) here.',
    routing: {
      send: {
        type: 'body', // n8n auto-switches to multipart/form-data when binary data is present
        property: 'audio_file',
      },
    },
  },
  {
    displayName: 'Language Code (Optional)',
    name: 'language',
    type: 'string',
    default: '',
    displayOptions: { show: showOnlyForJobCreate },
    description: 'e.g., en, de, fr, es. Leave blank for auto-detection.',
    routing: {
      send: {
        type: 'query',
        property: 'lang',
      },
    },
  },
];

import type { INodeProperties } from 'n8n-workflow';

const showOnlyForJobCreate = { operation: ['create'], resource: ['job'] };

export const jobCreateDescription: INodeProperties[] = [
  {
    displayName: 'Audio File URL',
    name: 'audioFileUrl',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyForJobCreate },
    description: 'Direct URL to the audio/video file (MP3, WAV, OGG, MP4, etc.)',
    routing: {
      send: {
        type: 'body',
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
        type: 'body',
        property: 'lang',
      },
    },
  },
];

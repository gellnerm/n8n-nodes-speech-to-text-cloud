import type { INodeProperties } from 'n8n-workflow';

const showOnlyForJobCreate = { operation: ['create'], resource: ['job'] };

export const jobCreateDescription: INodeProperties[] = [
  {
    displayName: 'Audio File',
    name: 'audio_file',
    type: 'string',
    default: 'data',
    required: true,
    displayOptions: { show: showOnlyForJobCreate },
    description: 'Name of the binary property containing the audio file. Usually "data" from an HTTP Request node.',
  },
  {
    displayName: 'Language Code (Optional)',
    name: 'language',
    type: 'string',
    default: 'yyy',
    displayOptions: { show: showOnlyForJobCreate },
    description: 'E.g., en, de, fr, es. Leave as "yyy" for auto-detection.',
    routing: {
      send: {
        type: 'query',
        property: 'lang',
      },
    },
  },
];

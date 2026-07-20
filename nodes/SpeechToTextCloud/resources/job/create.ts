import type { INodeProperties } from 'n8n-workflow';

const showOnlyForJobCreate = { operation: ['create'], resource: ['job'] };

export const jobCreateDescription: INodeProperties[] = [
  {
    displayName: 'Audio File',
    name: 'audio_file',
    type: 'string', // Holds the reference name to the binary property in workflow input
    default: '',
    required: true,
    displayOptions: { show: showOnlyForJobCreate },
    description: 'Name of the binary property containing the audio file. Usually "data" from an HTTP Request node.',
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
    default: 'yyy',
    displayOptions: { show: showOnlyForJobCreate },
    description: 'e.g., en, de, fr, es. Leave as "yyy" for auto-detection.',
    routing: {
      send: {
        type: 'query',
        property: 'lang',
      },
    },
  },
];

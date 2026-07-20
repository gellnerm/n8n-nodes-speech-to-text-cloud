import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { jobDescription } from './resources/job';

export class SpeechToTextCloud implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Online Speech To Text Cloud',
    name: 'speechToTextCloud',
    icon: { light: 'file:speechToTextCloud.svg', dark: 'file:speechToTextCloud.dark.svg' },
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Online Speech To Text Cloud API for audio transcription and text transformations.',
    defaults: {
      name: 'Online Speech To Text Cloud',
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [{ name: 'speechToTextCloudApi', required: true }],
    requestDefaults: {
      baseURL: 'https://www.speech-to-text.cloud/athanis/api/v1',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Job', value: 'job' },
        ],
        default: 'job',
      },
      ...jobDescription,
    ],
  };
}

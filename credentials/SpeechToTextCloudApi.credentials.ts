import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class SpeechToTextCloudApi implements ICredentialType {
  name = 'speechToTextCloudApi';
  displayName = 'Speech To Text Cloud API';
  documentationUrl = 'https://github.com/gellnerm/n8n-nodes-speech-to-text-cloud#credentials';

  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      required: true,
      default: '',
      description: 'Found in your API settings. Starts with stt_live_...',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'x-api-key': '={{$credentials.apiKey}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://www.speech-to-text.cloud/athanis/api/v1',
      url: '/api_jobs/00000000-0000-4000-8000-000000000000',
      method: 'POST',
      body: {},
    },
  };
}

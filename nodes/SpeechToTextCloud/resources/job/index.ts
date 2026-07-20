import type { INodeProperties, IDataObject } from 'n8n-workflow';
import { jobCreateDescription } from './create';
import { jobGetDescription } from './get';
import { jobApplyTaskDescription } from './applyTask';

const showOnlyForJob = { resource: ['job'] };

export const jobDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: { show: showOnlyForJob },
    options: [
      {
        name: 'Transcribe',
        value: 'create',
        action: 'Transcribe audio',
        description: 'Start a transcription job from an audio file URL',
        routing: {
          request: {
            method: 'POST',
            url: '/api_transcribe',
          },
          send: {
            preSend: [
              async function (this, requestOptions) {
                // Get the binary property name from the audio_file parameter
                const binaryPropertyName = this.getNodeParameter('audio_file') as string;
                
                // Get binary data
                const binaryData = this.helpers.assertBinaryData(binaryPropertyName);
                const dataBuffer = await this.helpers.getBinaryDataBuffer(binaryPropertyName);
                
                // Create form data object for multipart upload
                const body: IDataObject = {};
                body['audio_file'] = {
                  value: dataBuffer,
                  options: {
                    filename: binaryData.fileName,
                    contentType: binaryData.mimeType || 'audio/mpeg',
                  },
                };
                
                // Set headers
                if (!requestOptions.headers) requestOptions.headers = {};
                requestOptions.headers['Content-Type'] = 'multipart/form-data';
                
                // Set body as formData
                (requestOptions as unknown as IDataObject).formData = body;
                delete requestOptions.body;
                
                return requestOptions;
              },
            ],
          },
        },
      },
      {
        name: 'Get Result',
        value: 'get',
        action: 'Get job result',
        description: 'Fetch the transcript, status, or transformation output',
        routing: {
          request: {
            method: 'POST',
            url: '=/api_jobs/{{$parameter.jobId}}',
          },
        },
      },
      {
        name: 'Apply Task',
        value: 'applyTask',
        action: 'Apply LLM task',
        description: 'Run a transformation (summarize, translate, etc.) on a completed job',
        routing: {
          request: {
            method: 'POST',
            url: '=/api_jobs/{{$parameter.jobId}}/task',
          },
        },
      },
    ],
    default: 'create',
  },
  ...jobCreateDescription,
  ...jobGetDescription,
  ...jobApplyTaskDescription,
];

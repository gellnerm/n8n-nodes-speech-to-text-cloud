import type { INodeProperties } from 'n8n-workflow';
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
                
                // Generate a boundary for multipart
                const boundary = `----WebKitFormBoundary${Math.random().toString(36).substring(2, 15)}`;
                
                // Construct multipart body manually
                const parts: Buffer[] = [];
                
                // Add audio_file field
                parts.push(Buffer.from(`--${boundary}\r\n`));
                parts.push(Buffer.from(
                  `Content-Disposition: form-data; name="audio_file"; filename="${binaryData.fileName}"\r\n` +
                  `Content-Type: ${binaryData.mimeType || 'audio/mpeg'}\r\n\r\n`
                ));
                parts.push(dataBuffer);
                parts.push(Buffer.from('\r\n'));
                
                // Add closing boundary
                parts.push(Buffer.from(`--${boundary}--\r\n`));
                
                // Combine all parts
                const body = Buffer.concat(parts);
                
                // Set headers with boundary
                if (!requestOptions.headers) requestOptions.headers = {};
                requestOptions.headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`;
                requestOptions.headers['Content-Length'] = body.length.toString();
                
                // Set body
                requestOptions.body = body;
                
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

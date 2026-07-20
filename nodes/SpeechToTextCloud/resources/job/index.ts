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

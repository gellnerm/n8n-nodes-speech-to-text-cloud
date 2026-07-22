import type { INodeProperties } from 'n8n-workflow';

const showOnlyForJobApplyTask = { operation: ['applyTask'], resource: ['job'] };

export const jobApplyTaskDescription: INodeProperties[] = [
  {
    displayName: 'Job ID',
    name: 'jobId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyForJobApplyTask },
    description: 'Job ID returned by the Transcribe action',
  },
  {
    displayName: 'Task Type',
    name: 'task',
    type: 'options',
				default: 'cleanup',
    required: true,
    options: [
      { name: 'Cleanup', value: 'cleanup' },
      { name: 'Compliance Check', value: 'compliance' },
      { name: 'Convert to CSV', value: 'csv' },
      { name: 'Diarize', value: 'diarize' },
      { name: 'Extract Key Points', value: 'keypoints' },
      { name: 'Summarize', value: 'summarize' },
      { name: 'Translate', value: 'translate' },
    ],
    displayOptions: { show: showOnlyForJobApplyTask },
    routing: {
      send: { type: 'query', property: 'task' },
    },
  },
  {
    displayName: 'Target Language',
    name: 'lang',
    type: 'string',
    default: 'yyy',
    displayOptions: { show: showOnlyForJobApplyTask },
    description: 'E.g., de, fr, es. Required if task is translate.',
    routing: {
      send: { type: 'query', property: 'lang' },
    },
  },
];

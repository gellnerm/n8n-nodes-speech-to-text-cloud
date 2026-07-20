import type { INodeProperties } from 'n8n-workflow';

const showOnlyForJobGet = { operation: ['get'], resource: ['job'] };

export const jobGetDescription: INodeProperties[] = [
  {
    displayName: 'Job ID',
    name: 'jobId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: { show: showOnlyForJobGet },
    description: 'Job ID returned by the Transcribe action.',
  },
  {
    displayName: 'Output Format',
    name: 'fileFormat',
    type: 'options',
    options: [
      { name: 'Plain Text', value: 'txt' },
      { name: 'PDF', value: 'pdf' },
      { name: 'Word Document', value: 'docx' },
      { name: 'HTML', value: 'html' },
      { name: 'SRT Subtitles', value: 'srt' },
      { name: 'VTT Subtitles', value: 'vtt' },
    ],
    default: 'txt',
    displayOptions: { show: showOnlyForJobGet },
    routing: {
      send: { type: 'query', property: 'file_format' },
    },
  },
  {
    displayName: 'Include Timestamps',
    name: 'includeTimestamps',
    type: 'boolean',
    default: false,
    displayOptions: { show: showOnlyForJobGet },
    routing: {
      send: { type: 'query', property: 'timestamps' },
    },
  },
  {
    displayName: 'Task',
    name: 'task',
    type: 'options',
    options: [
      { name: 'Raw Transcript', value: 'none' },
      { name: 'Summarize', value: 'summarize' },
      { name: 'Translate', value: 'translate' },
      { name: 'Diarize', value: 'diarize' },
      { name: 'Cleanup', value: 'cleanup' },
      { name: 'Extract Key Points', value: 'keypoints' },
      { name: 'Compliance Check', value: 'compliance' },
      { name: 'Convert to CSV', value: 'csv' },
    ],
    default: 'none',
    displayOptions: { show: showOnlyForJobGet },
    routing: {
      send: { type: 'query', property: 'task' },
    },
  },
];

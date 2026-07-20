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
    description: 'Job ID returned by the Transcribe action',
  },
  {
    displayName: 'Output Format',
    name: 'fileFormat',
    type: 'options',
    options: [
      { name: 'HTML', value: 'html' },
      { name: 'PDF', value: 'pdf' },
      { name: 'Plain Text', value: 'txt' },
      { name: 'SRT Subtitles', value: 'srt' },
      { name: 'VTT Subtitles', value: 'vtt' },
      { name: 'Word Document', value: 'docx' },
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
      { name: 'Cleanup', value: 'cleanup' },
      { name: 'Compliance Check', value: 'compliance' },
      { name: 'Convert to CSV', value: 'csv' },
      { name: 'Diarize', value: 'diarize' },
      { name: 'Extract Key Points', value: 'keypoints' },
      { name: 'Raw Transcript', value: 'none' },
      { name: 'Summarize', value: 'summarize' },
      { name: 'Translate', value: 'translate' },
    ],
    default: 'none',
    displayOptions: { show: showOnlyForJobGet },
    routing: {
      send: { type: 'query', property: 'task' },
    },
  },
];

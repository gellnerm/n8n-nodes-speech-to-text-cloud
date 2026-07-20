# n8n-nodes-speech-to-text-cloud

This is an n8n community node that integrates with **Online Speech To Text Cloud**, a premium transcription service. Transcribe audio/video files, apply text transformations (summarize, translate, diarize), and retrieve structured results directly in your n8n workflows.

[Installation](#installation) | [Operations](#operations) | [Credentials](#credentials) | [Compatibility](#compatibility) | [Usage](#usage) | [Troubleshooting](#troubleshooting) | [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

| Resource | Operation | Description |
|----------|-----------|-------------|
| Job      | Transcribe | Start a new transcription job from an audio file |
| Job      | Get Result | Fetch the transcript, status, or transformation output |
| Job      | Apply Task | Run an LLM task (summarize, translate, diarize, etc.) on a completed job |

## Credentials

1. Sign up at [Online Speech To Text Cloud](https://www.speech-to-text.cloud/) and generate an API key starting with `stt_live_...`
2. In n8n, create a new **Online Speech To Text Cloud API** credential and paste your key.
3. The node automatically attaches the key via the `x-api-key` header.

## Compatibility

- **n8n version**: `≥ 1.0.0` (tested with `1.20+`)
- **Node.js**: `≥ 18.17.0`
- Works in n8n Cloud, self-hosted, and community editions.

## Usage

### Transcribing Audio

1. **Download the file**: Use an **HTTP Request** node to fetch your audio from a URL. Set `Response Format` to `File`.
2. **Configure Transcribe Node**:
   - **Audio File**: Enter the name of the binary property from the previous HTTP Request step (usually `data`)
   - **Language Code (Optional)**: Provide a 2-letter code (e.g., `en`, `de`, `fr`). Leave as `yyy` for auto-detection.
3. **Send**: The node will send your audio file as `multipart/form-data` to the API.

**Example workflow:**

HTTP Request (download audio) ↓ Transcribe (this node) ↓ Get Result (poll for completion)


### Getting Results & Polling

The **Get Result** operation returns the current status and transcript. Since n8n declarative nodes don't include built-in polling loops, wrap it in a simple workflow loop:

1. Add a **Wait** node (set to `Resume` or `Timeout`).
2. Connect: **Get Result** → **Wait** → **If** (check `status === 'finished'`)
3. Loop until finished, then proceed.

**Example polling pattern:**

Get Result ↓ If (status = 'finished') ├─ YES → Extract transcript data └─ NO → Wait (10 sec) → Loop back


### Applying LLM Tasks

Use **Apply Task** to run transformations on an existing completed job:

- **Task Type**: `summarize`, `translate`, `diarize`, `compliance`
- **Language** (for translations): Target language code (e.g., `es`, `de`) or `yyy` for other tasks
- **Job ID**: The ID from your transcription job

## Troubleshooting

### "Missing boundary in multipart" error

- Ensure the binary property name is correct (usually `data` from HTTP Request)
- Verify the previous node is returning file data (not text)

### "Field required" on audio_file

- Check that the HTTP Request node has `Response Format` set to `File`
- Confirm the property name matches exactly what the upstream node outputs

### Timeout waiting for transcription

- Large files may take longer; increase the **Wait** node timeout
- Check job status via **Get Result** to see if processing failed or is still in progress

### API key not working

- Verify your API key starts with `stt_live_`
- Check that the credential is properly saved in n8n
- Ensure you're using the correct credential in the node configuration

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Online Speech To Text Cloud API Docs](https://www.speech-to-text.cloud/api-documentation/)
- [Pricing & Plans](https://www.speech-to-text.cloud/pricing/)


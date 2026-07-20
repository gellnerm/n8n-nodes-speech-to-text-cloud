# n8n-nodes-speech-to-text-cloud

This is an n8n community node that integrates with **Online Speech To Text Cloud**, a premium transcription service. Transcribe audio/video files, apply text transformations (summarize, translate, diarize), and retrieve structured results directly in your n8n workflows.

[Installation](#installation) | [Operations](#operations) | [Credentials](#credentials) | [Compatibility](#compatibility) | [Usage](#usage) | [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

| Resource | Operation | Description |
|----------|-----------|-------------|
| Job      | Transcribe | Start a new transcription job from an audio file URL |
| Job      | Get Result | Fetch the transcript, subtitles, or transformation output |
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
1. Use the **Transcribe** operation and provide a publicly accessible URL to your audio file.
2. The node returns a `job_id`. Store this for subsequent steps.

### Getting Results & Polling
The **Get Result** operation returns the current status and transcript. Since n8n declarative nodes don't include built-in polling loops, wrap it in a simple workflow loop:
1. Add a **Wait** node (set to `Resume` or `Timeout`).
2. Connect **Get Result** → **Wait** → **If** (check `status === 'finished'`).
3. Loop until finished, then proceed.

### Applying LLM Tasks
Use **Apply Task** to run transformations like `summarize`, `translate`, `diarize`, or `compliance` on an existing job. Specify the target language for translations.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Online Speech To Text Cloud API Docs](https://www.speech-to-text.cloud/api-documentation/)
- [Pricing & Plans](https://www.speech-to-text.cloud/pricing/)

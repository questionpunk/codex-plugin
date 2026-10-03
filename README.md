# QuestionPunk for Codex

Create saved survey drafts, refine questions, review studies, and analyze authorized research results from Codex. This repository contains the public QuestionPunk plugin and a Codex marketplace catalog.

## Install

With a current Codex CLI:

```sh
codex plugin marketplace add questionpunk/codex-plugin --ref main
codex plugin add questionpunk@questionpunk
```

Start a new Codex chat after installing. Sign in to your own QuestionPunk account when the host requests OAuth authorization, then review the requested permissions. Never paste an access token or password into a chat. If your installed CLI does not offer plugin installation, update Codex or use a supported desktop client's repository marketplace flow.

The hosted MCP endpoint is **https://app.questionpunk.com/api/v1**. Its bundled connection is named `questionpunk-cloud` so it can coexist with an existing `questionpunk` desktop connection. This package contains no credentials, account identifiers, executable hooks, or local server processes. Each user connects their own account; installing the files alone does not authenticate a connection.

## Try it

- "Create an unpublished draft called Onboarding feedback with three neutral questions."
- "Review my draft for unclear wording and confusing branching."
- "Shorten the first question, then read back the saved study."
- "Summarize my study results with sample sizes and supporting evidence."

The plugin includes `create-study`, `manage-study`, `review-study`, and `analyze-results` skills. It discovers the current tools and uses saved study IDs and versions rather than assuming a tool prefix or inventing schemas. Draft creation does not authorize publication, sending invitations, purchasing recruitment, or generating respondent answers.

## Permissions and support

Research authoring requires `read` and `write`. Response and report tools require `responses:read`; if your connection does not expose those tools, reconnect through the host with the appropriate response permission or use QuestionPunk's report view. Only research your connected account can access is available. Existing QuestionPunk plan limits apply.

Disconnect in QuestionPunk **Settings → Integrations → Connected apps**. Disconnection stops future access; it does not erase content already returned to the assistant. See the [setup and support guide](https://mcp.questionpunk.com/docs) and [privacy policy and terms](https://www.questionpunk.com/legal).

## Distribution status

This repository is a direct installation source. OpenAI's public directory is shared by ChatGPT and Codex and requires a separate review and publication step. A repository release does not imply directory approval. Check the directory for the current listing rather than assuming it exists.

For local testing, replace the marketplace source in the install command with the absolute path to this repository. Marketplace paths resolve from the repository root.

## Package checks

```sh
npm run format
npm run lint
npm run build
```

The checks require Node.js and validate paths, the credential-free remote MCP configuration, all four skills, and public release metadata. Formatting uses a pinned Prettier version. No install scripts or runtime dependencies are included.

See [RELEASE.md](RELEASE.md) for source provenance and verified release evidence. The package declares a proprietary license, matching the QuestionPunk plugin's existing distribution designation.

# QuestionPunk for Codex

Create saved survey drafts, refine questions, review studies, and analyze authorized research results from Codex. This repository contains the public QuestionPunk plugin and a Codex marketplace catalog.

## Install

With a current Codex CLI:

```sh
codex plugin marketplace add questionpunk/codex-plugin --ref main
codex plugin add questionpunk@questionpunk
```

Start a new Codex chat after installing. You can use the plugin before you have a QuestionPunk account: ask Codex for a survey, and it writes the draft and gives you a link that opens it in QuestionPunk, where you can edit it and save it to an account. That link comes from the plugin's one server, `questionpunk-start` (**https://mcp.questionpunk.com/start**), which needs no sign-in and saves and reads nothing.

## Connect your account

To save drafts to your account, edit and publish studies and read results, add QuestionPunk's hosted server and sign in:

```sh
codex mcp add questionpunk --url https://app.questionpunk.com/api/v1
codex mcp login questionpunk
```

Sign in with your own QuestionPunk account in the browser and review the requested permissions, then start a new chat. Never paste an access token or password into a chat.

The account server is added this way rather than bundled in the plugin. Codex shows the model only part of a plugin server's tools, and with QuestionPunk's 70 tools a bundled server lost the account, survey and template tools (Codex CLI 0.169, November 2026). The same server added with `codex mcp add` shows all of them. Versions 1.1.0 to 1.1.3 of this plugin bundled it as `questionpunk-cloud`; after upgrading you can sign out of that one with `codex mcp logout questionpunk-cloud`.

This package contains no credentials, account identifiers, executable hooks, or local server processes. Each user connects their own account; installing the files alone does not authenticate a connection.

## Try it

- "Make a short survey for the parents at our daycare about the new pickup schedule." (works before you sign in)
- "Create an unpublished draft called Onboarding feedback with three neutral questions."
- "Review my draft for unclear wording and confusing branching."
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

The checks require Node.js and validate paths, the credential-free sign-in-free server, all four skills, and public release metadata. Formatting uses a pinned Prettier version. No install scripts or runtime dependencies are included.

See [RELEASE.md](RELEASE.md) for source provenance and verified release evidence. The plugin is MIT licensed (see [LICENSE](LICENSE)). Report security issues as described in [SECURITY.md](SECURITY.md).

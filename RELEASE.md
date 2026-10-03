# Release 1.1.0

Prepared on October 3, 2026 from latest QuestionPunk staging revision `0d896dd4952d7ec29970340b5b3820bf81da9587`. The four bundled skills are unchanged between that revision and production main revision `dfeb11027451a7c580381509fbd3f83bf123ee6c`. The existing live OAuth MCP endpoint is used; no backend deployment is required for this distribution package.

The format follows the current [OpenAI plugin packaging documentation](https://developers.openai.com/plugins/build/plugins): root portable `plugin.json`, `mcp.json`, `skills/`, OpenAI presentation metadata, and a repository marketplace. The logo comes from QuestionPunk's existing public Claude plugin.

Formatting and package validation passed. Codex CLI 0.160.0 installed and enabled version 1.1.0 and loaded all four skills. An isolated runtime loaded the bundled remote server and reached the live OAuth challenge requesting `read write responses:read`; this is connection discovery evidence, not an authenticated authoring test. Independent review identified a collision with an existing manually configured `questionpunk` server; the bundled connection is now named `questionpunk-cloud`.

The OpenAI portal currently shows QuestionPunk version 1.1.0 in review and not published. That is the shared ChatGPT/Codex submission; this repository does not replace or duplicate it.

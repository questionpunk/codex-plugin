# Release 1.1.4

Built on November 13, 2026 with QuestionPunk's package generator (`questionpunk-mcp/platforms/build-packages.mjs --version 1.1.4 --skills analyze-results,create-study,manage-study,review-study`) from the skills on production main revision `d39c6b15a4`. The four skills are byte for byte those of the Claude plugin 1.1.4 (questionpunk/claude-plugin): sign-in steps when QuestionPunk isn't connected, complete first drafts, and a draft link before sign-in.

Changes from 1.1.0:

- The plugin declares `questionpunk-start` (https://mcp.questionpunk.com/start), a server that needs no sign-in. Its one tool, `survey_draft_link`, turns a survey Codex wrote into a link that opens it in QuestionPunk as a guest draft. It saves and reads nothing.
- The OAuth server `questionpunk-cloud` is no longer bundled. In Codex CLI 0.169.0 a plugin's servers showed the model only their first 35 tools by name: the bundled server lost `user_get`, every `survey_*` tool and every `template_*` tool, and once the account was signed in the sign-in-free tool was cut as well. The same endpoint added with `codex mcp add` showed all 70 tools. The README gives that command, and the marketplace entry's authentication policy is now `ON_USE`, since the bundled server needs no sign-in.

Tested in Codex CLI 0.169.0 on macOS, installed from this branch with `codex plugin marketplace add` and `codex plugin add` into an empty `CODEX_HOME`, with ChatGPT apps turned off (`--disable apps`) so no other QuestionPunk connection applied:

- Not signed in (MCP sign-in kept in an empty file store): "Make a short survey for the parents at our daycare about the new pickup schedule." Codex used the `create-study` skill, called `survey_draft_link` once and gave the link. Opening the link built the draft in QuestionPunk with the same five questions, options and required flags. Its sign-in advice named ChatGPT's Plugins menu rather than the Codex command; the skills' sign-in steps will name Codex in the next release.
- Signed in (the endpoint added as a configured server, signed in through OAuth): a read-only request ("which account am I signed in as, and how many drafts do I have") called `user_get` and `survey_list` and changed nothing.

Formatting and package validation pass. The OpenAI directory listing is shared by ChatGPT and Codex and is updated separately; this repository does not change it.

# Release 1.1.0

Prepared on October 3, 2026 from latest QuestionPunk staging revision `0d896dd4952d7ec29970340b5b3820bf81da9587`. The four bundled skills are unchanged between that revision and production main revision `dfeb11027451a7c580381509fbd3f83bf123ee6c`. The existing live OAuth MCP endpoint is used; no backend deployment is required for this distribution package.

The format follows the current [OpenAI plugin packaging documentation](https://developers.openai.com/plugins/build/plugins): root portable `plugin.json`, `mcp.json`, `skills/`, OpenAI presentation metadata, and a repository marketplace. The logo comes from QuestionPunk's existing public Claude plugin.

Formatting and package validation passed. Codex CLI 0.160.0 installed and enabled version 1.1.0 and loaded all four skills. An isolated runtime loaded the bundled remote server and reached the live OAuth challenge requesting `read write responses:read`; this is connection discovery evidence, not an authenticated authoring test. Independent review identified a collision with an existing manually configured `questionpunk` server; the bundled connection is now named `questionpunk-cloud`.

The OpenAI portal currently shows QuestionPunk version 1.1.0 in review and not published. That is the shared ChatGPT/Codex submission; this repository does not replace or duplicate it.

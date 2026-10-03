import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const json = async (path) =>
  JSON.parse(await readFile(resolve(root, path), "utf8"));
const catalog = await json(".agents/plugins/marketplace.json");
assert.equal(catalog.name, "questionpunk");
assert.equal(catalog.plugins.length, 1);
const entry = catalog.plugins[0];
assert.equal(entry.name, "questionpunk");
assert.deepEqual(entry.policy, {
  installation: "AVAILABLE",
  authentication: "ON_INSTALL",
});
assert.equal(entry.category, "Productivity");
assert.deepEqual(entry.source, {
  source: "local",
  path: "./plugins/questionpunk",
});
const plugin = resolve(root, entry.source.path);
const manifest = await json("plugins/questionpunk/plugin.json");
assert.equal(
  manifest.$schema,
  "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
);
assert.equal(manifest.name, entry.name);
assert.equal(manifest.version, "1.1.0");
assert.equal(
  manifest.repository,
  "https://github.com/questionpunk/codex-plugin",
);
assert.equal(manifest.license, "Proprietary");
const presentation = manifest.extensions["com.openai"].interface;
assert.ok(presentation.shortDescription.length <= 30);
assert.equal(presentation.displayName, "QuestionPunk");
for (const path of [presentation.composerIcon, presentation.logo]) {
  assert.ok(path.startsWith("./"));
  assert.ok(!relative(plugin, resolve(plugin, path)).startsWith(".."));
  assert.ok((await readFile(resolve(plugin, path))).length > 0);
}
const mcp = await json("plugins/questionpunk/mcp.json");
assert.equal(
  mcp.$schema,
  "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
);
assert.deepEqual(mcp.mcpServers, {
  questionpunk: {
    type: "streamable-http",
    url: "https://app.questionpunk.com/api/v1",
  },
});
const expectedSkills = [
  "analyze-results",
  "create-study",
  "manage-study",
  "review-study",
];
assert.deepEqual(
  (await readdir(resolve(plugin, "skills"))).sort(),
  expectedSkills,
);
for (const skill of expectedSkills) {
  const text = await readFile(
    resolve(plugin, "skills", skill, "SKILL.md"),
    "utf8",
  );
  assert.ok(text.startsWith(`---\nname: ${skill}\ndescription:`));
  assert.ok(text.includes("---\n\n#"));
}
async function inspect(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    assert.ok(!item.isSymbolicLink(), "Plugin must not include symlinks");
    const path = resolve(directory, item.name);
    if (item.isDirectory()) await inspect(path);
    else {
      assert.ok(item.isFile());
      assert.ok(
        !/^(?:\.env|credentials|auth\.json|config\.toml)/i.test(item.name),
      );
      assert.ok(
        !/\.(?:sh|py|js|mjs|exe|dll)$/i.test(item.name),
        "No executable plugin hooks or scripts",
      );
    }
  }
}
await inspect(plugin);
console.log(
  "PASS: portable manifest, repository catalog, four skills, assets and credential-free HTTP MCP connection",
);

# Codex Cloud Notes

This file records empirical findings from testing Codex Cloud against this repository.

## Verified on 2026-04-19

### 1. The CLI can see Codex Cloud functionality, but environment setup is mandatory

Verified commands:

```sh
codex cloud --help
codex cloud exec --help
codex cloud list --json
```

Observed behavior:

- `codex cloud` exists and opens a task browser UI.
- `codex cloud exec` exists and requires `--env <ENV_ID>`.
- `codex cloud list --json` returned an empty task list on this account/workspace.

### 2. No cloud environment is currently available to this workspace

Verified command:

```sh
codex cloud exec --env fake_env_test "Say hello"
```

Observed result:

```text
Error: no cloud environments are available for this workspace
```

This is stronger than a bad-id error. It means the account/workspace used by the local Codex CLI does not currently have any usable Codex Cloud environment configured.

### 3. The local Codex state also indicates cloud access is not fully set up

Verified file:

- `~/.codex/.codex-global-state.json`

Observed fields:

- `"codexCloudAccess":"enabled_needs_setup"`
- `"environment":null`

Inference:

- Codex Cloud is enabled in principle for this account/workspace.
- Setup is incomplete from the perspective of the local CLI session.

### 4. Environment management is not exposed in the CLI surface

Verified from help output:

- `codex cloud` supports: `exec`, `status`, `list`, `apply`, `diff`
- There is no CLI command for `create environment` or `list environments`

Inference:

- Environments are expected to be configured in Codex Web, then consumed by the CLI.

This inference matches the official docs:

- https://developers.openai.com/codex/cloud/environments

### 5. The cloud CLI surface is narrower than local `codex exec`

Verified from help output:

- Local `codex exec` supports `-i, --image <FILE>...`
- `codex cloud exec --help` does not expose an image flag

Inference:

- Image-first cloud workflows may currently be better supported from Codex Web or the IDE than from the non-interactive `codex cloud exec` CLI surface.

This is an inference from the current CLI help, not a complete product statement.

## Official behavior from docs

These are documented, not yet fully re-verified in this repo because no environment is currently available:

- A cloud task creates a container and checks out the selected repo branch or commit SHA.
- Setup scripts run with internet access.
- Agent internet access is off by default.
- Agent internet access can be enabled and restricted by domain allowlist and HTTP methods.
- Secrets are available only during setup and removed before the agent phase.
- Container state may be cached for up to 12 hours.

Sources:

- https://developers.openai.com/codex/cloud/environments
- https://developers.openai.com/codex/cloud/internet-access

## Open experiments once an environment is available

1. Minimal task:
   Ask Codex Cloud to run `npm run build` in this repo and confirm success.

2. Branch visibility:
   Create a test branch, push it, and verify the cloud task sees the selected branch.

3. Local-only change visibility:
   Create an uncommitted local file and verify the cloud task cannot see it.

4. Diff/apply loop:
   Ask the cloud task to make a tiny change, then inspect `codex cloud diff` and `codex cloud apply`.

5. Network behavior:
   Confirm default agent network restrictions and how behavior changes when internet access is enabled in the environment.

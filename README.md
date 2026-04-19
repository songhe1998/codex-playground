# Codex Playground

This repository is an isolated sandbox for testing Codex website generation and Codex Cloud behavior without touching the main app.

## What I verified locally

I used the local Codex CLI to create a minimal Vite site from an empty folder and then built it successfully.

Tracked project files:

- `package.json`
- `package-lock.json`
- `index.html`
- `main.js`
- `cloud-prompt.txt`

Verified command:

```sh
codex -a never exec -s danger-full-access --skip-git-repo-check -C /Users/songhewang/Desktop/synk/codex-playground --ephemeral "Create the simplest possible website in this folder using Vite and plain JavaScript. Keep it tiny: a single page with a headline, short paragraph, and one button with a small interaction. Install only what is necessary, make sure npm run build passes, and keep all changes inside this folder. When done, report what you created and whether the build succeeded."
```

Verified build:

```sh
cd /Users/songhewang/Desktop/synk/codex-playground
npm run build
```

Result:

- Codex created the site successfully.
- `npm run build` passed.
- The smallest useful "build a website" loop works.

## Cloud findings

I inspected the current Codex CLI cloud flow from the terminal.

Available commands:

- `codex cloud exec`
- `codex cloud list`
- `codex cloud status`
- `codex cloud diff`
- `codex cloud apply`

Interactive flow:

1. Run `codex cloud`
2. Press `n` for a new task
3. Press `Ctrl+O` to choose an environment

Current blocker on this machine/account:

- The new-task screen showed `Env: none`
- The environment picker only showed `All Environments (Global)`
- That means there is currently no configured Codex Cloud environment available to this account/workspace

Because of that, I could not submit a real cloud build task yet.

## Important cloud behavior

According to the official Codex cloud docs, a cloud task creates a container and checks out the selected repo branch or commit SHA. That means local uncommitted files are not automatically visible in cloud tasks.

Practical consequence:

- If you want cloud Codex to work in `codex-playground`, this repository must exist on GitHub and the files must be committed on the branch the cloud task checks out.

Source:

- https://developers.openai.com/codex/cloud/environments

## How to use cloud once an environment exists

Interactive:

```sh
cd /Users/songhewang/Desktop/synk
codex cloud
```

Then:

1. Press `n`
2. Press `Ctrl+O`
3. Select the environment
4. Paste the prompt from `cloud-prompt.txt`

Non-interactive:

```sh
cd /Users/songhewang/Desktop/synk
codex cloud exec --env <ENV_ID> --branch $(git branch --show-current) "$(cat codex-playground/cloud-prompt.txt)"
```

Useful follow-up commands:

```sh
codex cloud list
codex cloud status <TASK_ID>
codex cloud diff <TASK_ID>
codex cloud apply <TASK_ID>
```

## Recommended first cloud prompt

See `cloud-prompt.txt`.

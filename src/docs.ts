export interface DocPage {
  id: string;
  title: string;
  content: string;
}

export interface DocSection {
  id: string;
  title: string;
  pages: DocPage[];
}

export const sections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    pages: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: `# Introduction

**Mira** is an open-source coding agent that runs on your machine with the model you choose. It reads your code, edits files, runs commands, reviews diffs, and delegates subtasks — from the Mac desktop app, a browser, a terminal, or your phone.

Sessions and configuration live as plain files on disk. No hosted control plane, no vector database, no telemetry.

## Three core ideas

**You own the whole thing.** Your key, your model, your machine. The session store is \`~/.mira/sessions/\`, the config is \`~/.mira/mira.yaml\`, and the memory files are plain markdown you can read and edit.

**A harness, not a prompt.** Tools, permissions, conversation history, and subagent dispatch are shared infrastructure. Adding a new capability means adding a new \`Tool\` impl — not scaffolding a new agent from scratch.

**Safety is a policy layer.** A small DSL decides what the model may do without asking, what requires approval, and what is off-limits. A five-mode dial gives you a fast coarse knob; the rule DSL gives you surgical control below that.

## What you can do

- Work in the native Mac desktop app, the browser web UI, or a terminal TUI
- Drive Claude Code, Codex and OpenCode on your own plan, and switch engines mid-chat without losing the thread
- Review an agent's changes turn by turn beside the conversation, with a guided walkthrough
- Track work by pull request or branch, from in progress to ready to merge
- Check progress and answer approvals from your phone
- Chat with any codebase from a terminal TUI or the browser web UI
- Edit files, run shell commands, and search code through the permission layer
- Delegate research or write subtasks to specialist subagents in parallel
- Run a two-stage code review against a diff, a commit range, or a GitHub PR
- Move a session's tools into an E2B sandbox mid-session without restarting
- Run a full task in the cloud and come back to a pull request

## Current status

> **Beta, building in the open.** The desktop app ships on Stable, Beta and Alpha channels. Recent additions: external agents, phone access, review beside the conversation, the Work view, and Back/Forward across chats and panels. Expect the surface to keep moving.
`,
      },
      {
        id: 'installation',
        title: 'Installation',
        content: `# Installation

Mira comes as a Mac desktop app and as a single self-contained binary for the terminal and web UI. Pick the method that fits your setup.

## Desktop app (macOS)

Download the app for Apple Silicon Macs. It's signed, notarized and updates itself:

- [Mira](https://github.com/runmira/mira/releases/download/desktop-updates/Mira-arm64.dmg) (stable)
- [Mira Beta](https://github.com/runmira/mira/releases/download/desktop-updates/Mira-beta-arm64.dmg)
- [Mira Alpha](https://github.com/runmira/mira/releases/download/desktop-updates/Mira-alpha-arm64.dmg)

See **Desktop App** for the first run, channels and updates.

## Homebrew

The recommended path on macOS and Linux. Upgrades come free with \`brew upgrade\`.

\`\`\`bash
brew install runmira/tap/mira
\`\`\`

## Install script

No Homebrew required. The script detects your OS and architecture, downloads the right binary from the latest GitHub release, and places it in \`/usr/local/bin\` (falling back to \`~/.local/bin\` when the system directory isn't writable).

\`\`\`bash
curl -fsSL https://runmira.dev/install.sh | bash
\`\`\`

To pin a specific release, set \`MIRA_VERSION\` first:

\`\`\`bash
curl -fsSL https://runmira.dev/install.sh | MIRA_VERSION=v0.4.2 bash
\`\`\`

## From source

Requires **Rust 1.88+**. The \`rust-toolchain.toml\` in the repo root pins the exact toolchain version — \`rustup\` installs it automatically on first build.

\`\`\`bash
git clone https://github.com/runmira/mira
cd mira
cargo install --path crates/mira-cli
\`\`\`

## Verifying the install

\`\`\`bash
mira --version
\`\`\`

Run \`mira doctor\` to check your configuration, providers, and compute environments:

\`\`\`bash
mira doctor
\`\`\`

## What gets installed

The binary is self-contained. Mira creates its working directory on first run:

\`\`\`text
~/.mira/
├── mira.yaml        # configuration (providers, MCP, permissions)
├── sessions/        # conversation history
├── auth/            # OAuth token bundles (mode 0600)
├── agents/          # user-defined subagent types
└── MIRA.md          # user-wide memory file
\`\`\`
`,
      },
      {
        id: 'quickstart',
        title: 'Quick Start',
        content: `# Quick Start

From zero to first conversation in two minutes.

## 1. Connect a provider

The fastest path is \`mira login\`, which opens your browser for a PKCE OAuth round-trip and writes the resulting key to \`~/.mira/mira.yaml\`.

\`\`\`bash
mira login openrouter   # recommended — access to 200+ models
# or
mira login openai       # "Sign in with ChatGPT"
\`\`\`

Pass \`--no-browser\` for headless and SSH sessions — Mira prints the URL instead:

\`\`\`bash
mira login openrouter --no-browser
\`\`\`

Prefer environment variables? Export them and skip \`login\`:

\`\`\`bash
export MIRA_API_KEY=sk-or-v1-...
export MIRA_BASE_URL=https://openrouter.ai/api/v1
export MIRA_MODEL=google/gemini-2.5-flash
\`\`\`

## 2. Terminal TUI

Navigate to any repo and start Mira:

\`\`\`bash
cd your-repo
mira --mode manual
\`\`\`

The TUI opens with a text input at the bottom. Press **y** to approve a tool call, **n** to deny, **Ctrl+C** to interrupt.

\`\`\`text
> what does this codebase do?
> add a test for the parse_url function
> run the test suite and fix any failures
\`\`\`

## 3. Browser web UI

The web UI gives you subagent panels, diff previews, a PR panel, and a plugin manager:

\`\`\`bash
mira serve --open
\`\`\`

\`--open\` launches your default browser automatically. The server binds to \`localhost:8787\`.

## First things to try

\`\`\`text
> summarise the architecture of this project
\`\`\`

\`\`\`text
> find every place we open a database connection and check for missing error handling
\`\`\`

\`\`\`text
> /review
\`\`\`

\`\`\`text
> delegate: read every file under src/auth/ and summarise the token lifecycle
\`\`\`

## Auth management

\`\`\`bash
mira auth status          # list signed-in providers
mira logout openrouter    # forget a provider's credentials
\`\`\`
`,
      },
    ],
  },
  {
    id: 'desktop',
    title: 'Desktop App',
    pages: [
      {
        id: 'desktop-app',
        title: 'The Desktop App',
        content: `# The Desktop App

Mira's desktop app is the full Mira experience in a native Mac window: chats, external agents, review, panels and settings, with the agent server running for you in the background. It's built on the same core as \`mira serve\`, so anything you can do in the browser you can do here.

## Download

The app is signed and notarized for Apple Silicon Macs. Pick a channel:

| Channel | App | Download |
|---------|-----|----------|
| Stable | Mira | [Mira-arm64.dmg](https://github.com/runmira/mira/releases/download/desktop-updates/Mira-arm64.dmg) |
| Beta | Mira Beta | [Mira-beta-arm64.dmg](https://github.com/runmira/mira/releases/download/desktop-updates/Mira-beta-arm64.dmg) |
| Alpha | Mira Alpha | [Mira-alpha-arm64.dmg](https://github.com/runmira/mira/releases/download/desktop-updates/Mira-alpha-arm64.dmg) |

Each channel installs as its own app, so you can keep Stable and try Beta side by side.

## First run

Onboarding walks you through setup step by step:

1. **Choose how Mira thinks.** Connect a provider with your own key, or use an agent you already have, such as Claude Code, Codex or OpenCode.
2. **Bring your chats.** Import your Claude Code and Codex history by project. The next message you send continues the original session.
3. **Open a folder** and start a chat.

## Updates

The app checks for updates on its channel and installs them in place. The update popup shows what changed, and it can also offer Alpha and Beta builds, with their notes, before you switch channels.

## The window

**Toolbar.** The sidebar toggle and the **Back** and **Forward** arrows sit beside the traffic lights in every view. Hide the sidebar and the chat curves around them.

**Back and Forward.** The arrows (or **⌘[** and **⌘]**) step through the chats you've opened and the panels you've opened or closed: the right panel and its tabs, the terminal and the review. Each step is one entry, so Back walks you through them in order until there's nothing left.

**Sidebar.** The **Chat / Work** switch at the top picks what the sidebar lists.

- **Chat** lists each chat once, in its project. **Recents** at the top shows the chats you touched last across every project, with the project named on each.
- **Search and filters** narrow the list. **Working** and **Needs you** show counts, and a badge marks any chat waiting on an approval or an answer.
- **Settled** collects chats whose work is done: their PR merged or closed, or you put them away. Writing to one brings it back.
- **Archived** keeps chats you've archived, with Restore and Delete.
- **Work** groups chats by what they deliver. See the Work page in this section.

New thread, Search, Pull request and Plugins sit at the top of the Chat list.

## Settings

Open Settings with **⌘,**. Each section has its own page:

| Section | What's there |
|---------|-------------|
| Provider | Providers, keys and agent sign-ins |
| General | App-wide preferences |
| Appearance | Light and dark themes, accent colour, interface size, diff options |
| Memory, Skills, Agents, Subagents | What the agent knows and can do |
| Computer | Computer use and paired computers |
| Devices | Phones and other devices paired to this Mac |
| Keyboard shortcuts | Every shortcut, rebindable |
| Hooks, Integrations, Usage | Automation, GitHub and spend |
`,
      },
      {
        id: 'external-agents',
        title: 'External Agents',
        content: `# External Agents

Mira can drive the coding agents you already pay for. Claude Code, Codex, OpenCode and other ACP agents run on your own plan, listed next to Mira's own providers, and you choose one per chat.

## Picking an engine

The model picker lists only what you can use: enabled providers and installed, signed-in agents, in alphabetical sections. Recent picks come first, and "Default model" names the model you'll actually get. New chats remember the last agent you picked and its model.

## Signing in

- **Codex** signs in and switches accounts inside the app.
- **OpenCode** signs in from Settings, in a built-in terminal.
- A chat whose model needs a sign-in says so and links straight to it.

You can add a second key or agent account under \`engines:\` in \`mira.yaml\`, and changes apply without restarting.

## Bring your chats

Import Claude Code and Codex history by project during onboarding or later. An imported chat continues the original session: the next message you send picks up where it left off.

## Switch engines mid-chat

Move a chat to another engine, for example from Claude Code to Codex. The new engine gets the chat's messages, commands, edits and plans, sized to fit its context window, and can read anything that didn't fit. The transcript marks the handoff with both engines. Mira asks before switching.

## Every agent gets Mira's tools

External agents work through Mira's tools as well as their own. They can:

- drive Mira's browser, the same one shown in the browser pane
- check a page at phone, tablet and desktop sizes
- run background processes that appear in the Processes window
- launch parallel threads in their own git worktrees
- ask you privately for an API key
- show a chart or page right in the chat
- hand a task to another engine for a second opinion

## Plans, questions and approvals

Agents' questions, plan prompts and approvals show up as Mira's own cards. Codex's **Plan only** mode uses its native plan mode, and approving the plan card starts the build.

## Subagents

When Codex, Claude Code or OpenCode spawn child agents, their activity appears in Mira's agent cards and panels. Each child's replies, reasoning and tools stay separate when the agent exposes them.

## Forking and compaction

Fork a Codex, Claude Code or OpenCode chat into a separate chat that keeps its project, engine and model. Codex can fork from any completed turn. Compactions that Codex and Claude Code run on their own appear in the transcript, and the context ring shows where each agent will compact.
`,
      },
      {
        id: 'chats',
        title: 'Working in a Chat',
        content: `# Working in a Chat

Everything in a chat works the same whichever engine runs it: Mira's own providers or an external agent.

## Queue and steer

You don't have to wait for a turn to finish. Send while one runs and your messages queue up. Edit, reorder or remove queued messages, or **steer** one into the running turn. The queue survives restarts.

**Stop** (⌘⇧X) ends the running turn.

## Mentions and context

| Type | To add |
|------|--------|
| \`@\` | A file or folder |
| \`#\` | An issue or pull request from the chat's repository, shown as a chip that links to GitHub |
| \`/\` | A slash command |

Attach files and images with ⌘⇧A or by dropping them on the window.

## Ask aside

Ask a quick question about the chat while the agent keeps working (⌘⌥A). It answers from the conversation, plus any \`@files\` you name, without interrupting the turn or adding to the chat.

Select text in a reply to quote it into your message, ask about it aside, or copy it. Clicking a quote jumps back to where it came from.

## Fork from here

Branch any chat at a message into a new chat. Forks sit under the original in the sidebar.

## Checkpoints

Every message snapshots your files. **Restore files** on a message puts them back the way they were before it, and the restore itself can be undone.

## Context and compaction

The context ring in the composer shows how full the context window is. Open the **context inspector** to see what's filling it, drop large tool results, or compact on demand.

Compaction is automatic. Mira measures the request it's about to send against what the provider actually counts and compacts before the window fills, even mid-turn. Recent turns stay whole, OpenAI's and Anthropic's own compaction is used where available, and the next summary is prepared in the background so you aren't kept waiting.

## Usage limits

When a chat hits a provider's usage limit, it shows when the limit resets and picks the task back up then. Turn on automatic resuming in Settings.

## Replies

Replies render PR and issue chips, commit cards, file links that open at the right line, diffs you can apply, callouts and sortable tables. When a request fails, the error says why (a provider limit, a connection problem or a sign-in) and offers a retry or a link to the right setting.
`,
      },
      {
        id: 'reviewing',
        title: 'Reviewing Changes',
        content: `# Reviewing Changes

Review what an agent changed without leaving the conversation.

## The Diff tab

**View changes** (⌘D) opens a Diff tab in the right panel. Keep file tabs beside it, resize the panel, or expand it for a closer look. The uncommitted diff stays current: it refreshes as agents run tools, when you come back to the app, after reconnecting, and on a regular poll.

## Choose the turn

Open the latest turn's changes directly, or use the **Turns** menu to pick an earlier turn with edits. Search turns by prompt, turn number or file path. Each turn's snapshot stays available after the agent commits.

## Walk through a change

**Guided review** orders the change for reading: the core change first, then dependent files, then tests. It explains each stop, lets you ask questions, and tracks which hunks you've approved.

## Comments

Comment on lines in the diff and send your comments to the agent. Drafts are kept until they're sent, including when you switch turns or close the Diff tab. If a send is rejected, the draft stays and an error explains why. If a file changes after you comment on it, the comment moves to a separate editable section with its original quote, so it never attaches to the wrong code.

## Pull requests

The current branch's pull request appears in the sidebar's **Pull request** view and refreshes while agents work. For a full two-stage review from the command line, see Code Review.

## Panel layout

The right panel comes back the way you left it, per account and folder: its width, open file and tool tabs, the active tab and the selected turn. Only paths and a turn number are saved. File contents, prompts, diffs and comments are never stored.
`,
      },
      {
        id: 'work',
        title: 'Work',
        content: `# Work

The **Work** side of the sidebar's Chat / Work switch organises chats by what they deliver rather than by conversation.

## Work items

A work item is a pull request, or a worktree branch before it has one. Every chat on that branch belongs to it. Forks and launched threads that have no branch of their own join their parent's item.

Items are sorted into shelves:

| Shelf | What's in it |
|-------|-------------|
| Needs you | A chat waiting on an approval or answer, a chat that needs a retry, failing checks, or requested changes |
| In progress | An agent is working, or a draft PR or branch nobody is working on yet |
| In review | An open PR that isn't approved with passing checks yet |
| Ready to merge | An open PR that's approved, with checks passing |
| Done | The PR merged or closed, the branch merged, or every chat settled |

## The item page

Open an item to see:

- the goal, taken from the linked issue
- the chats and agents working on it
- the combined diff and files
- the branch and worktree
- PR checks and reviews, with **Merge** once it's ready
- recent activity

## Start work

**Start work** picks an issue from the repository, creates an \`issue-N\` worktree branched from the default branch, and opens a chat there named after the issue, with the issue already referenced in the composer.
`,
      },
      {
        id: 'panels',
        title: 'Panels & Computer Use',
        content: `# Panels & Computer Use

The right panel holds tools that sit beside the conversation. Open them from the toolbar or with a shortcut, and switch tabs with **Ctrl+Tab**.

## Panels

| Panel | Shortcut | What it does |
|-------|----------|-------------|
| Files | ⌘⇧E | Browse project files and open them in the panel |
| Processes | ⌘⇧P | Dev servers, ports and logs, with stop and restart |
| Tests | ⌘⇧T | Run tests, see each failure, and click "Fix this" |
| Activity | ⌘⇧H | What each message changed, with restore |
| Device preview | ⌘⇧V | Your app at phone, tablet and laptop sizes |
| Browser | ⌘⇧B | Mira's own browser, live |
| Whiteboard | ⌘⌥W | Sketch ideas beside the chat |
| Terminal | ⌘J | A terminal in the chat's folder |

## Mira's browser

Mira runs its own managed Chromium for the browser tool and the live browser pane. Agents, external ones included, drive the same browser you see in the pane. Browser sessions you aren't using shut down after 15 minutes.

## Computer use

Mira can operate apps on your Mac through computer use. Set it up under **Settings → Computer**:

- **Use this Mac**, or pair another Mira computer with a short-lived link. No tokens or YAML to set up.
- **Window control** lets you pick one application window for background input, so your own pointer and focus stay yours. A separate Mira cursor shows where the agent is working, when the companion supports it.

Pairing a computer doesn't turn on computer use or approve any action on its own.
`,
      },
      {
        id: 'phone',
        title: 'Phone & Remote Access',
        content: `# Phone & Remote Access

Keep an eye on your agents when you're away from your desk.

## Pair a device

Open **Settings → Devices** and scan the code with your phone, or open it on another computer. From a paired device you can check progress, answer approvals and send follow-ups. Paired devices are listed in Settings → Devices, where you can revoke any of them.

## Reach Mira from anywhere

One switch in **Settings → Devices** gives your computer a private address that works from any network. There's nothing to install or configure, and pairing still decides who gets in.

## Made for small screens

At phone size the sidebar becomes a drawer, panels open full screen, the composer stays above the keyboard, and approvals get large buttons.

## Approvals

Waiting approvals are grouped, with **Approve all** and **Deny all**. **Always allow** lets you edit the exact rule before it's saved. Press **y** or **n** to answer the current approval when you aren't typing.

## Keep the server running

On a machine without the desktop app, run Mira's server as a background service. It starts at login and restarts if it exits (launchd on macOS, systemd on Linux):

\`\`\`bash
mira service install
\`\`\`
`,
      },
      {
        id: 'shortcuts',
        title: 'Keyboard Shortcuts',
        content: `# Keyboard Shortcuts

These are the defaults in the desktop app and the web UI. On Windows and Linux, read **⌘** as **Ctrl** and **⌥** as **Alt**. Rebind any of them in **Settings → Keyboard shortcuts** (⌘⌥,).

App shortcuts don't fire while the terminal has focus, so it keeps its own keys.

## Navigation

| Shortcut | Action |
|----------|--------|
| ⌘K | Command palette: actions, chats and settings |
| ⌘[ | Back |
| ⌘] | Forward |
| ⌘B | Show or hide the sidebar |
| ⌘⇧O | New chat |
| ⌥1 – ⌥9 | Switch to chat 1–9 |
| ⌘, | Open or leave Settings |

## Chat

| Shortcut | Action |
|----------|--------|
| ⌘⇧L | Focus the composer |
| ⌘⇧A | Attach files |
| ⌘⇧X | Stop the running turn |
| ⌘⌥↑ / ⌘⌥↓ | Jump to the first / latest message |
| ⌘⇧C | Copy the last response |
| ⌘⇧; | Copy the last code block |
| y / n | Approve / reject the pending request (when you aren't typing) |

## Panels

| Shortcut | Action |
|----------|--------|
| ⌘D | Show or hide the changes review |
| ⌘J or Ctrl+\` | Show or hide the terminal |
| ⌘⇧E | Files |
| ⌘⇧P | Processes |
| ⌘⇧T | Tests |
| ⌘⇧H | Activity |
| ⌘⇧V | Device preview |
| ⌘⇧B | Browser |
| ⌘⌥W | Whiteboard |
| ⌘⌥A | Ask aside |
| ⌘⌥I | Developer tools |
| Ctrl+Tab / Ctrl+⇧Tab | Next / previous panel tab |
| ⌘⌥1 – ⌘⌥9 | Switch to panel tab 1–9 |
| ⌘⌥⌫ | Close the current panel tab |
| ⌘⇧\\\\ | Close the right panel |
`,
      },
    ],
  },
  {
    id: 'configuration',
    title: 'Configuration',
    pages: [
      {
        id: 'config-file',
        title: 'mira.yaml',
        content: `# mira.yaml

All configuration lives in \`~/.mira/mira.yaml\`. Mira creates a minimal version on first run; you can hand-edit it at any time without restarting.

## Provider setup

\`\`\`yaml
providers:
  openrouter:
    key: sk-or-v1-...
    base_url: https://openrouter.ai/api/v1

  openai:
    key: sk-...

  local:
    base_url: http://localhost:11434/v1   # Ollama or any local runtime
    key: ollama

defaults:
  provider: openrouter
  model: google/gemini-2.5-flash
  mode: manual
\`\`\`

## Model selection

Override the model per-session with \`--model\` at the command line:

\`\`\`bash
mira --model anthropic/claude-opus-4-5
\`\`\`

Or switch mid-session with the slash command:

\`\`\`text
/model google/gemini-2.5-pro
\`\`\`

Model names are passed straight through to the provider — any model the provider supports works.

## MCP servers

Register Model Context Protocol servers so their tools appear alongside the built-ins:

\`\`\`yaml
mcp_servers:
  filesystem:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]

  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_TOKEN: "ghp_..."

  postgres:
    url: http://localhost:8080   # http MCP server
\`\`\`

\`stdio\` servers (\`command\` + \`args\`) are spawned on demand. \`http\` servers connect at session start.

## GitHub integration

Store a token for the pull-request panel and \`mira review --pr\`:

\`\`\`yaml
keys:
  github: ghp_...
\`\`\`

## Remote compute

Configure named sandboxes for the remote-env switcher:

\`\`\`yaml
compute:
  default: dev
  e2b:
    api_key_env: E2B_API_KEY
  environments:
    dev:
      backend: e2b
      description: Rust toolchain + cached deps
      template: base
      timeout_secs: 3600
      setup: |
        curl -sSf https://sh.rustup.rs | sh -s -- -y
        cargo fetch
\`\`\`
`,
      },
      {
        id: 'permissions',
        title: 'Permission Modes',
        content: `# Permission Modes

The permission system has two layers: a **mode** dial for coarse control and a **rule DSL** for surgical overrides. Rules always win over the mode.

## Modes

| Mode | What happens |
|------|-------------|
| \`plan\` | Read and search only. No file edits, no commands. |
| \`manual\` | Asks before every edit and every shell command. **Default.** |
| \`auto\` | Auto-approves file edits; asks before commands. |
| \`edit\` | Auto-approves everything unless a rule blocks it. |
| \`yolo\` | No gating at all. Use with care. |

Set the mode at startup:

\`\`\`bash
mira --mode auto
\`\`\`

Switch mid-session:

\`\`\`text
/mode edit
\`\`\`

Set a default in \`mira.yaml\`:

\`\`\`yaml
defaults:
  mode: manual
\`\`\`

## Rule DSL

Rules let you allow, ask for, or deny specific tool calls independently of the mode. They take precedence over everything else.

\`\`\`yaml
permissions:
  allow:
    - "Bash(cargo test:*)"      # auto-approve any cargo test invocation
    - "Edit(src/**)"            # auto-approve edits under src/
    - "Bash(npm run *)"

  ask:
    - "Edit(migrations/**)"     # always confirm before touching migrations
    - "Bash(git push:*)"

  deny:
    - "Bash(rm:*)"              # never allow rm
    - "Bash(sudo:*)"
    - "Edit(.env)"              # protect secrets
\`\`\`

## Pattern syntax

| Pattern | Matches |
|---------|---------|
| \`Edit(src/**)\` | Any write to a path under \`src/\` |
| \`Bash(cargo test:*)\` | Any bash call whose first argument starts with \`cargo test\` |
| \`Bash(*)\` | All bash invocations |
| \`Edit(*)\` | All file writes |

Tool names are case-sensitive: \`Bash\`, \`Edit\`, \`Write\`, \`Read\`, \`WebFetch\`, \`WebSearch\`.

## Per-project rules

For repo-specific rules that travel with the code, create \`<repo>/.mira/mira.yaml\`:

\`\`\`yaml
# .mira/mira.yaml  — checked into the repo
permissions:
  deny:
    - "Bash(rm:*)"
  allow:
    - "Bash(make:*)"
    - "Edit(src/**)"
\`\`\`

Global and project rules are merged; \`deny\` always wins.
`,
      },
    ],
  },
  {
    id: 'features',
    title: 'Features',
    pages: [
      {
        id: 'tools',
        title: 'Tools & Plugins',
        content: `# Tools & Plugins

Every action Mira takes passes through a named tool and the permission layer. The built-in set covers the full coding workflow; any MCP server extends it.

## File tools

| Tool | What it does |
|------|-------------|
| \`read_file\` | Read a file's contents |
| \`write_file\` | Write a file, creating parent directories if needed |
| \`edit_file\` | Apply a precise string replacement — shows a diff before executing |
| \`glob\` | Find files matching a glob pattern |
| \`grep\` | Search file contents with a regex |

## Code intelligence

| Tool | What it does |
|------|-------------|
| \`find_symbol\` | Find a symbol definition by name |
| \`find_references\` | Find all usages of a symbol |
| \`find_callers\` | Find all call sites of a function |
| \`rustfmt\` | Format a Rust file in-place |

## Shell & Git

| Tool | What it does |
|------|-------------|
| \`bash\` | Run a shell command, stream stdout/stderr |
| \`git_status\` | Show working-tree status |
| \`git_diff\` | Show the current diff |
| \`git_log\` | Show recent commit history |
| \`git_commit\` | Stage and commit changes |

## Web & Memory

| Tool | What it does |
|------|-------------|
| \`web_fetch\` | Fetch a URL and return the text content |
| \`web_search\` | Run a web search and return results |
| \`memory_read\` | Read the active MIRA.md |
| \`memory_append\` | Append a note to MIRA.md |

## MCP plugins

Any MCP server plugs into the same tool registry. Manage them from the **Plugins** tab in the web UI, or add them directly to \`mira.yaml\`:

\`\`\`yaml
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_TOKEN: "ghp_..."
\`\`\`

## Adding a custom tool

Implement the \`Tool\` trait and call \`registry.register()\`:

\`\`\`rust
use async_trait::async_trait;
use mira_core::{ToolCall, ToolResult};
use crate::{Tool, ToolContext};

pub struct MyTool;

#[async_trait]
impl Tool for MyTool {
    fn name(&self) -> &str { "my_tool" }
    fn description(&self) -> &str { "Does something useful." }
    fn parameters(&self) -> serde_json::Value {
        serde_json::json!({ "type": "object", "properties": {} })
    }
    async fn invoke(&self, call: &ToolCall, _ctx: &ToolContext) -> ToolResult {
        ToolResult::ok(call.id.clone(), "done".into())
    }
}

// In registry setup:
registry.register(std::sync::Arc::new(MyTool));
\`\`\`

See \`crates/mira-tools/src/builtin/read.rs\` for the smallest working example.
`,
      },
      {
        id: 'subagents',
        title: 'Subagents',
        content: `# Subagents

Mira can delegate subtasks to specialist child sessions. Each subagent receives a focused prompt, runs its own tool loop, and returns a structured result. The parent's transcript stays clean; the child's work streams in real time to the Agents panel.

## Built-in types

| Type | Role | Writes? |
|------|------|---------|
| \`explore\` | Read-only investigation — returns a cited JSON summary | No |
| \`cartographer\` | Read-only architecture mapper | No |
| \`reviewer\` | Adversarial correctness reviewer | No |
| \`sentinel\` | Mission-creep auditor for a delegated diff | No |
| \`coder\` | Implements a small, well-scoped change | Yes (worktree-isolated) |
| \`documenter\` | Updates docs to match reality | Yes (worktree-isolated) |
| \`auto\` | Picks the best specialist for the task | Depends |

## Launching a subagent

Prefix any message with \`delegate:\` in the chat:

\`\`\`text
delegate: read every file under src/auth/ and summarise the token lifecycle
\`\`\`

Dispatch multiple in parallel by sending several \`delegate:\` lines in one turn — they all run concurrently and the parent gets all results in a single round.

## Key features

**Parallel dispatch** — multiple agent calls in one turn run concurrently. A fan-out of five research questions finishes in one wall-clock trip.

**Worktree isolation** — write-capable types run in an ephemeral \`git worktree\` off HEAD. Their changes merge back on completion. Parallel writers never step on each other.

**Approval routing** — a subagent's \`bash rm\` triggers the same approval modal as the parent's own commands. No auto-approval cliff hidden behind delegation.

**Live progress** — subagents call the \`progress\` tool during long tasks to emit a one-line status chip in the Agents panel.

**Stop cascades** — Stop on the parent halts every in-flight subagent in one action.

**Shared scratchpad** — parallel subagents share a pad through \`scratchpad_note\` / \`scratchpad_read\` to coordinate mid-flight.

## Custom agent types

Drop a markdown file with YAML frontmatter into \`~/.mira/agents/\` or \`<repo>/.mira/agents/\`:

\`\`\`markdown
---
name: security-auditor
description: Looks for vulnerabilities in the given code.
category: review
write: false
model: anthropic/claude-opus-4-5
---

You are a security code reviewer. Find vulnerabilities, insecure
patterns, and missing input validation. Return a structured JSON report.
\`\`\`

The type is available immediately as \`type: "security-auditor"\` — no restart needed.
`,
      },
      {
        id: 'code-review',
        title: 'Code Review',
        content: `# Code Review

Mira's two-stage review generates findings with high recall, then re-verifies each one against the actual source with a hostile prompt — dropping any it can't defend against a direct quote.

## Running a review

**CLI:**

\`\`\`bash
# Review uncommitted changes
mira review

# Review a specific commit range
mira review HEAD~3..HEAD

# Review a GitHub pull request
mira review --pr 142
\`\`\`

**Web UI and desktop app:** type \`/review\` in the chat, and a side panel streams findings in real time. To read an agent's changes yourself, turn by turn, see **Reviewing Changes**.

## What it can review

| Target | How it's fetched |
|--------|----------------|
| Uncommitted working-tree diff | \`git diff HEAD\` |
| Committed range | \`git diff <from>..<to>\` |
| Raw diff | piped via \`--diff\` |
| GitHub PR | REST API (needs \`GITHUB_TOKEN\` in \`mira.yaml\`) |

## Each finding includes

- **File and line range** — exact location in the diff
- **Severity** — \`error\`, \`warning\`, or \`info\`
- **Explanation** — what's wrong and why it matters
- **Suggested fix** — concrete recommendation

Findings that fail re-verification are silently dropped. The ones that remain are those the model can back up with a direct quote from the code.

## CI integration

\`\`\`bash
# JSON output for machine consumption
mira review --json > findings.json

# Exit 1 if any error-severity findings are found
mira review --fail-on-error
\`\`\`
`,
      },
      {
        id: 'memory',
        title: 'Memory',
        content: `# Memory

Mira's memory system is plain markdown files that get prepended to the system prompt. No vector database, no embeddings — just text you can read and edit directly.

## How it works

Two files are loaded at session start:

| File | Scope |
|------|-------|
| \`~/.mira/MIRA.md\` | All sessions, every project |
| \`<cwd>/.mira/MIRA.md\` | Sessions started in this directory |

Both are optional. If neither exists, no extra context is loaded.

## Writing to memory

**In the chat**, use \`/remember\`:

\`\`\`text
/remember always use tabs for indentation in this project
\`\`\`

By default this writes to the project-level \`<cwd>/.mira/MIRA.md\`. Use \`--user\` to write to your global file:

\`\`\`text
/remember --user I prefer concise explanations without code preamble
\`\`\`

**Directly** — just open \`~/.mira/MIRA.md\` in any text editor. Changes take effect on the next session.

## What to put in memory

Good candidates:
- Project conventions (naming, style, toolchain)
- Things the model should avoid doing
- Context the model would otherwise rediscover each session
- Team norms and reviewer expectations

A common structure:

\`\`\`markdown
# Project conventions
- Use snake_case for Rust identifiers
- Every public function needs a doc comment
- Run \`cargo clippy\` before committing

# What to avoid
- Don't add unwanted logging
- Don't refactor unless the task explicitly asks for it
\`\`\`
`,
      },
      {
        id: 'terminal-ui',
        title: 'Terminal UI',
        content: `# Terminal UI

Mira ships with a full-featured terminal interface built on Ratatui. It gives you a real-time view of the agent's work — tool calls, diffs, and approval prompts — without leaving your terminal.

## Starting the TUI

\`\`\`bash
cd your-repo
mira
\`\`\`

The TUI opens immediately. Press **Ctrl+C** to quit, **Esc** to interrupt the current agent turn.

## Interface regions

**Status bar** — shows the active model, permission mode, current git branch, and running token / cost totals at a glance.

**Transcript** — the full conversation with the model. Tool calls appear as annotated lines; file writes show a compact inline diff. Scroll up through history with **↑/↓** or **Page Up/Page Down**.

**Composer** — the text input at the bottom. Supports slash commands (\`/plan\`, \`/review\`, \`/mode\`), \`@\`-mentions for file context, and **Shift+Tab** to cycle permission modes.

**Approval prompt** — appears inline when a tool call needs your sign-off. No modal, no mouse required.

## Keyboard reference

| Key | Action |
|-----|--------|
| **Enter** | Send message / approve |
| **y** | Approve current tool call |
| **n** | Deny current tool call |
| **a** | Approve all remaining tool calls in this turn |
| **e** | Edit the pending tool call before approving |
| **Esc** | Interrupt the running agent turn |
| **Ctrl+C** | Quit |
| **↑ / ↓** | Scroll transcript |
| **Page Up** | Scroll transcript up one page |
| **/** | Focus composer + start a slash command |
| **Shift+Tab** | Cycle permission mode |

## Inline diffs

File edits display a compact unified diff directly in the transcript — no external diff tool needed. Lines are colour-coded green for additions, red for deletions.

\`\`\`diff
- router.post('/search', handler)
+ router.post('/search', rateLimit({ max: 20, window: 60 }), handler)
\`\`\`

When you press **y** to approve, the diff is applied and the next tool call (if any) is queued.

## Thinking indicator

While the model is reasoning, a pulsing **Thinking…** line shows elapsed time, token count, and a hint to press **Esc** if you want to interrupt and redirect.

## Mode indicators

The current permission mode is shown in the status bar and composer footer:

| Indicator | Mode | Meaning |
|-----------|------|---------|
| \`manual\` | manual | Ask before every write and command |
| \`auto\` | auto | Auto-approve writes; ask before commands |
| \`edit\` | edit | Auto-approve everything |
| \`plan\` | plan | Read-only — no writes or commands |
| \`yolo\` | yolo | No approval gates |

Toggle modes with \`/mode <name>\` or **Shift+Tab** to rotate through them.
`,
      },
      {
        id: 'web-ui',
        title: 'Web UI',
        content: `# Web UI

The web UI is a browser-based interface that adds panels, visual diffs, a plugin manager, and a PR viewer on top of the same agent core as the TUI. It's the same interface as the desktop app, so the **Desktop App** pages apply here too.

## Starting the server

\`\`\`bash
mira serve
mira serve --open        # auto-open browser
mira serve --port 8080   # custom port (default 8787)
\`\`\`

The server binds to \`localhost:8787\` by default. It stays running until you kill it — you can open multiple browser tabs, each with its own session.

## Panels

### Chat panel

The main conversation area. Works the same as the TUI: send messages, approve tool calls, see inline diffs. Tool calls are collapsible — click any tool row to expand the full input and output.

### Agents panel

Shows running and completed subagent sessions. Each card displays:
- Agent type and task description
- Live progress updates from \`progress\` calls
- Final result summary
- A link to the full subagent transcript

### Diff panel

A full-featured diff viewer for the current session's file changes. Shows every file touched this session, colour-coded by operation (add / edit / delete). Click any file to see the full unified diff.

### PR panel

Requires \`GITHUB_TOKEN\` in \`mira.yaml\`. Shows:
- Open PRs on the current repository
- Per-PR findings from \`mira review --pr\`
- Quick approve / request-changes actions

### Plugins panel

Lists all registered MCP servers — their connection status, tool count, and the tools each one exposes. Install / remove MCP servers from here without touching \`mira.yaml\` directly.

## Composer

The web composer has the same slash-command and \`@\`-mention support as the TUI, plus:

- **File picker** — \`@\` opens a fuzzy-search file picker
- **Mode switcher** — a click-to-toggle pill in the composer footer
- **Environment chip** — click to switch compute environments mid-session
- **Review button** — triggers \`/review\` for the current working-tree diff

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| **Enter** | Send message |
| **Shift+Enter** | Insert newline in composer |
| **/** | Start a slash command |
| **@ + text** | Open file picker |
| **Ctrl+K** | Command palette |
| **Ctrl+Shift+X** | Stop the running turn |

See **Keyboard Shortcuts** for the full list, all rebindable in Settings.

## Connecting remotely

To access the web UI from another machine over SSH:

\`\`\`bash
# On the server
mira serve --host 0.0.0.0

# Local port-forward
ssh -L 8787:localhost:8787 yourserver
\`\`\`

Then open \`http://localhost:8787\` on your local machine.
`,
      },
      {
        id: 'plan-undo',
        title: 'Plan & Undo',
        content: `# Plan & Undo

## Plan tool

The \`plan\` tool lets the model propose a step-by-step approach before touching any files. You review, edit, reorder, or cancel before execution begins.

Trigger it with \`/plan\` or by describing a multi-step task:

\`\`\`text
/plan migrate the auth module from JWT to sessions
\`\`\`

The model emits a plan card in the transcript:

\`\`\`text
Plan: Migrate auth to sessions
──────────────────────────────────────
1. Remove jsonwebtoken dependency from Cargo.toml
2. Replace JwtMiddleware with SessionMiddleware in middleware/mod.rs
3. Update /login and /logout handlers to set/clear session cookies
4. Remove token validation helpers in auth/tokens.rs
5. Run cargo test and fix compilation errors

[Approve]  [Edit steps]  [Cancel]
\`\`\`

You can edit individual steps before approving — the model sees your edits and executes the revised plan.

## Undo

Every file write is tracked by \`FileGuard\`. Snapshots live under \`.mira/.undo/<session>/\`.

\`\`\`text
/undo       # revert the last write
/undo 3     # revert the last 3 writes
\`\`\`

Undo is non-destructive — it restores from the snapshot, so if the model overwrote your edits, you get them back.

## Apply-verify loop

After each turn's writes, Mira runs the relevant build checker and feeds failures back into the next turn automatically:

| Language | Verifier |
|----------|---------|
| Rust | \`cargo check\` |
| TypeScript | \`tsc --noEmit\` |
| Python | \`ruff check\` |
| Go | \`go build ./...\` |

The model retries until the check passes or hits the cap (3 attempts by default). Disable it with \`/verify off\`.
`,
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    pages: [
      {
        id: 'remote-environments',
        title: 'Remote Environments',
        content: `# Remote Environments

A remote environment moves a session's file and shell tools into an isolated sandbox while leaving the UI, approvals, and conversation on your machine. Your worktree is the anchor — the sandbox holds a copy.

## Why use one

- **Isolation** — untrusted scripts run in a microVM, not your own shell
- **Reproducibility** — a named environment has a fixed OS, packages, and setup script
- **Parallelism** — two agents on the same codebase run in separate sandboxes without interference

## Available environments

Three exist without any configuration:

| Name | What it is |
|------|-----------|
| \`local\` | Your machine's own shell and file system (default) |
| \`scratch\` | A copy of the worktree on this machine in a temp directory |
| \`e2b\` | An E2B Firecracker microVM (needs \`E2B_API_KEY\`) |

Add named environments in \`~/.mira/mira.yaml\`:

\`\`\`yaml
compute:
  default: dev
  environments:
    dev:
      backend: e2b
      description: Rust toolchain with cached deps
      template: base
      timeout_secs: 3600
      env:
        RUST_LOG: debug
      setup: |
        curl -sSf https://sh.rustup.rs | sh -s -- -y
        cargo fetch
\`\`\`

## Switching environments

**Web UI** — click the environment chip in the composer footer.

**TUI:**

\`\`\`text
/remote-env           # list available environments
/remote-env dev       # switch to the "dev" environment
/remote-env local     # merge changes back and return to local
\`\`\`

**Startup:**

\`\`\`bash
mira --sandbox e2b
mira serve --sandbox dev
\`\`\`

## How switching works

**Local → remote.** Mira packs the worktree state — tracked files plus untracked non-ignored files — and uploads it. The first time, the environment's \`setup\` script runs with output streamed as progress.

**Remote → local.** Mira merges the sandbox's changes back file by file. Files you didn't touch are updated directly. Files both sides changed go through \`git merge-file\`, leaving conflict markers where edits overlap.

**Parking.** Environments you leave are kept: E2B sandboxes are paused, scratch copies stay in place. Switching back resumes from where you left off — caches stay warm, setup doesn't re-run.
`,
      },
      {
        id: 'cloud-tasks',
        title: 'Cloud Tasks',
        content: `# Cloud Tasks

\`mira cloud run\` runs an entire task in an E2B sandbox end-to-end: clone the repository, work on it, verify the changes, commit, and open a pull request. Close your laptop once the command returns.

## Usage

\`\`\`bash
mira cloud run "add rate limiting to the /api/search endpoint"
\`\`\`

What Mira does:
1. Spins up an E2B sandbox
2. Clones the repository into it
3. Runs the agent loop with your task as the prompt
4. Runs the build verifier on completion
5. Commits the changes and pushes to a new branch
6. Opens a pull request and prints the URL

## Requirements

- \`E2B_API_KEY\` in your environment or \`mira.yaml\`
- \`GITHUB_TOKEN\` for opening the pull request
- Current directory must be a git repository with a remote

## Options

\`\`\`bash
# Base the work on a specific branch
mira cloud run --base main "refactor token validation"

# Pin the model for the remote session
mira cloud run --model anthropic/claude-opus-4-5 "add dark mode"
\`\`\`

## Managing tasks

\`\`\`bash
mira cloud list                 # list recent cloud tasks
mira cloud logs <task-id>       # stream logs from a running task
mira cloud cancel <task-id>     # cancel a running task
\`\`\`

## Cost

Cloud tasks use E2B wall-clock billing. A 30-minute task with a 2 vCPU / 4 GB sandbox costs roughly **$0.04**. Check \`mira cloud cost\` for an estimate before long tasks.
`,
      },
      {
        id: 'evals',
        title: 'Evals',
        content: `# Evals

Mira has a built-in eval harness for regression-testing agent behaviour. Each eval task defines a starting state, a prompt, and a set of assertions that must pass after the agent's turn.

## Running evals

\`\`\`bash
mira eval                      # run all eval tasks
mira eval --task parser        # run tasks whose name matches "parser"
mira eval --json               # JSON output for CI
mira eval --fail-on-error      # exit 1 if any task fails
\`\`\`

Progress streams to the terminal as tasks complete. A final table shows pass / fail / error counts per task.

## Task format

Eval tasks live in \`<repo>/.mira/evals/\` as TOML files:

\`\`\`toml
[[task]]
name = "add-rate-limiter"
description = "Agent should add rate limiting to the search route."

[task.setup]
# Files written before the agent turn
"src/routes/search.ts" = """
import { Router } from 'express';
const router = Router();
router.post('/search', handler);
export default router;
"""

[task.run]
prompt = "add rate limiting to POST /search — max 20 requests per 60 seconds"
mode = "edit"      # run without approval gates
model = "fast"     # use the configured fast model alias

[[task.assert]]
type = "file_contains"
path = "src/routes/search.ts"
pattern = "rateLimit"

[[task.assert]]
type = "file_contains"
path = "src/routes/search.ts"
pattern = "max.*20"

[[task.assert]]
type = "no_error"   # agent turn must not produce an error result
\`\`\`

## Assertion types

| Type | Checks |
|------|--------|
| \`file_contains\` | File at \`path\` matches \`pattern\` (regex) |
| \`file_not_contains\` | File at \`path\` does not match \`pattern\` |
| \`file_exists\` | File at \`path\` was created |
| \`file_deleted\` | File at \`path\` was removed |
| \`exit_zero\` | Command in \`cmd\` exits 0 |
| \`no_error\` | Agent turn completed without an error result |
| \`tool_called\` | Tool \`name\` was invoked at least once |
| \`tool_not_called\` | Tool \`name\` was never invoked |

## CI integration

Add a step to your workflow:

\`\`\`yaml
- name: Run Mira evals
  run: mira eval --json --fail-on-error | tee eval-results.json
  env:
    MIRA_API_KEY: \${{ secrets.MIRA_API_KEY }}
\`\`\`

Upload the JSON artifact for debugging on failure. Eval tasks run in parallel by default — set \`MIRA_EVAL_WORKERS=1\` for serial execution.

## Model aliases

Use short aliases in eval configs instead of full model IDs so you can change the eval model globally:

\`\`\`yaml
# ~/.mira/mira.yaml
eval:
  models:
    fast: google/gemini-2.5-flash
    smart: anthropic/claude-opus-4-5
\`\`\`

Then reference \`model = "fast"\` or \`model = "smart"\` in task configs.
`,
      },
      {
        id: 'contributing',
        title: 'Contributing',
        content: `# Contributing

Mira is built in Rust and welcomes contributions. Here's how the codebase is organised and how to get started.

## Repository layout

\`\`\`text
mira/
├── crates/
│   ├── mira-core/        # session state, turn loop, tool trait
│   ├── mira-tools/       # built-in tool implementations
│   ├── mira-agents/      # subagent dispatch and worktree isolation
│   ├── mira-permissions/ # mode dial + rule DSL
│   ├── mira-server/      # web UI server (Axum + React/TypeScript)
│   ├── mira-tui/         # Ratatui terminal interface
│   └── mira-cli/         # binary entry point
├── .mira/
│   └── evals/            # regression eval tasks
└── docs/                 # documentation source
\`\`\`

## Development setup

\`\`\`bash
git clone https://github.com/runmira/mira
cd mira
cargo build
\`\`\`

The \`rust-toolchain.toml\` pins the exact toolchain. \`rustup\` installs it automatically.

To run the web UI in dev mode (hot reload on both the Rust server and the React frontend):

\`\`\`bash
# Terminal 1 — Rust server
cargo run -p mira-cli -- serve --dev

# Terminal 2 — Vite dev server
cd crates/mira-server/frontend
pnpm install && pnpm dev
\`\`\`

## Adding a tool

1. Create \`crates/mira-tools/src/builtin/<your_tool>.rs\`
2. Implement the \`Tool\` trait (see \`read.rs\` for the smallest example)
3. Register it in \`crates/mira-tools/src/lib.rs\`
4. Add a schema entry to the JSON schema file under \`schemas/\`
5. Write an eval task that exercises the new tool

## Adding a slash command

Slash commands live in \`crates/mira-core/src/commands/\`. Each command is a struct that implements \`SlashCommand\`, which provides \`name()\`, \`description()\`, and an async \`execute()\` method.

## Pull request checklist

Before opening a PR:

- [ ] \`cargo test --workspace\` passes
- [ ] \`cargo clippy --workspace -- -D warnings\` is clean
- [ ] \`cargo fmt --check\` passes
- [ ] Eval tasks added for new behaviour
- [ ] \`CHANGELOG.md\` entry added under \`## Unreleased\`

## Architecture overview

The agent loop lives in \`mira-core::Session::run_turn()\`. A turn:

1. Sends the conversation history to the model
2. Streams the response, collecting text and tool call deltas
3. For each tool call: checks the permission layer, optionally prompts the user, then dispatches to the tool registry
4. Collects results, appends them to history, and sends the next request

The permission layer (\`mira-permissions\`) is evaluated independently of the tool dispatch — it never touches tool implementation code. Adding a rule requires only a \`mira.yaml\` change.

## Getting help

- Open a discussion on GitHub for design questions
- Open an issue for bugs with \`mira doctor\` output attached
- The \`#contributing\` channel on Discord for real-time questions
`,
      },
      {
        id: 'cli-reference',
        title: 'CLI Reference',
        content: `# CLI Reference

## Global flags

| Flag | Default | Description |
|------|---------|-------------|
| \`--mode <mode>\` | \`manual\` | Permission mode: \`plan\` \`manual\` \`auto\` \`edit\` \`yolo\` |
| \`--model <name>\` | config | Model to use for this session |
| \`--sandbox <name>\` | \`local\` | Start in this compute environment |
| \`--resume <id>\` | — | Resume an existing session by ID |
| \`--no-browser\` | false | Print OAuth URL instead of opening browser |

## mira

Start a TUI session in the current directory.

\`\`\`bash
mira
mira --mode auto --model google/gemini-2.5-flash
mira --resume abc123
\`\`\`

## mira -p

Run one task without a UI and exit. Piped input is added as context. Tools that would ask you are denied; widen with \`--mode\` or \`--allow\`.

\`\`\`bash
mira -p "fix the failing test"
cat build.log | mira -p "why did this fail?"
mira -p "list the TODOs" --output-format json   # text, json or stream-json
\`\`\`

## mira serve

Start the web UI server (port 8787 by default).

\`\`\`bash
mira serve
mira serve --open          # open browser automatically
mira serve --port 8080
mira serve --host 0.0.0.0  # listen on all interfaces
\`\`\`

## mira service

Keep \`mira serve\` running in the background. It starts at login and restarts if it exits (launchd on macOS, systemd on Linux).

\`\`\`bash
mira service install     # install and start
mira service status      # installed, running and answering?
mira service restart
mira service uninstall
\`\`\`

## mira update

Update the binary to the latest release. The download is checksum-verified.

\`\`\`bash
mira update
\`\`\`

## mira login / logout

\`\`\`bash
mira login openrouter
mira login openai
mira login --no-browser openrouter
mira logout openrouter
mira auth status
\`\`\`

## mira review

\`\`\`bash
mira review                   # review working-tree diff
mira review HEAD~3..HEAD       # review a commit range
mira review --pr 142           # review a GitHub PR
mira review --json             # JSON output for CI
mira review --fail-on-error    # exit 1 if errors found
\`\`\`

## mira cloud

\`\`\`bash
mira cloud run "add rate limiting to /api/search"
mira cloud list
mira cloud logs <task-id>
mira cloud cancel <task-id>
\`\`\`

## mira doctor / eval

\`\`\`bash
mira doctor              # check config, providers, compute
mira eval                # run all regression tasks
mira eval --task parser  # run tasks matching "parser"
mira eval --json         # JSON output for CI
\`\`\`

## Slash commands (in-chat)

| Command | Description |
|---------|-------------|
| \`/mode <mode>\` | Switch permission mode mid-session |
| \`/model <name>\` | Switch model mid-session |
| \`/plan\` | Ask the model to plan before acting |
| \`/review\` | Run a code review of the current diff |
| \`/remember <note>\` | Append to project MIRA.md |
| \`/remember --user <note>\` | Append to global MIRA.md |
| \`/undo [N]\` | Revert the last N file writes |
| \`/remote-env [name]\` | List or switch compute environments |
| \`/goal <condition>\` | Start an autonomous loop |
| \`/verify off\` | Disable the apply-verify loop |
`,
      },
    ],
  },
];

export function allPages(): DocPage[] {
  return sections.flatMap((s) => s.pages);
}

export function adjacentPages(id: string): { prev: DocPage | null; next: DocPage | null } {
  const pages = allPages();
  const idx = pages.findIndex((p) => p.id === id);
  return {
    prev: idx > 0 ? pages[idx - 1] : null,
    next: idx < pages.length - 1 ? pages[idx + 1] : null,
  };
}

export function extractHeadings(markdown: string): { level: number; text: string; id: string }[] {
  return markdown
    .split('\n')
    .flatMap((line) => {
      const m = line.match(/^(#{2,3})\s+(.+)$/);
      if (!m) return [];
      const text = m[2].trim();
      return [{ level: m[1].length, text, id: slugify(text) }];
    });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*[\]()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

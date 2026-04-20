# OpenClaw Config Spec — MOR INC
**File:** `260420_openclaw_config_spec.md`
**Author:** Pete (Perplexity Computer)
**Date:** 2026-04-20
**Status:** DRAFT — Edge executes install

---

## 1. Identity

| Field | Value |
|-------|-------|
| **Agent name** | OpenClaw (MOR local executor) |
| **Role** | Always-on local executor — Michael's machine |
| **Position in stack** | Layer 3: Pete = cloud intel, Edge = build/deploy, OpenClaw = 24/7 local runner |
| **Distinguishing trait** | Runs while Pete + Edge sessions are offline. Not a new agent — an executor layer. |
| **Machine** | Michael O'Regan's Windows machine (Edge installs via computer use) |
| **GitHub** | https://github.com/openclaw/openclaw |

---

## 2. Install

Edge runs this via computer use:

```bash
# Install (MIT license, bring your own API key)
npm install -g openclaw

# Launch with config
openclaw --config ~/.openclaw/mor-config.yml
```

---

## 3. Model Config

```yaml
# ~/.openclaw/mor-config.yml
model:
  primary: claude-opus-4-6          # same model Pete runs on
  fallback: claude-sonnet-4-5       # cost fallback
  temperature: 0.2                  # low — trading decisions need consistency
  max_tokens: 4096
```

---

## 4. Memory Rules

OpenClaw uses local Markdown files — identical pattern to MOR `memory/active/`:

```yaml
memory:
  backend: local-markdown
  root: ~/mor-memory/               # local mirror of GitHub memory/active/
  write_target: openclaw.md         # write to own file only
  read_from:
    - openclaw.md                   # own memory
    - pete.md                       # Pete's memory (read-only)
    - edge.md                       # Edge's memory (read-only)
    - shared/                       # shared coordination state (read-only)
  sync: git-pull-on-start           # pull latest from morelectric-max on session start
  cross_write: FORBIDDEN            # never write to pete.md or edge.md
```

**Rule:** Write to your own memory. Read from shared. No cross-writes. (Same isolation rule as Pete + Edge.)

---

## 5. Skills to Install

Install from [https://clawhub.ai](https://clawhub.ai):

| Priority | Skill | Purpose |
|----------|-------|---------|
| P0 | **Alpaca trading bot** | Live position monitoring, paper trade execution |
| P0 | **GitHub** | Commit session logs, push specs from local machine |
| P1 | **Slack** | Post to C0AC8UQJT54, DM Michael (U0AD4UP12Q0) |
| P2 | **ntfy** | Push alerts when Slack unavailable |

---

## 6. Slack Connection

```yaml
messaging:
  slack:
    workspace: MOR INC
    channel: C0AC8UQJT54           # main MOR channel
    bot_name: OpenClaw
    user_id: TBD                   # assign after install
    mention_routing: true          # respond to @openclaw mentions
```

OpenClaw is NOT a replacement for Pete bot (A0ATWQ9HJCB). It's a separate local executor that can post to the same channel.

---

## 7. Heartbeat / Cron

```yaml
cron:
  heartbeat: "*/30 * * * *"        # every 30 min — post status if triggered
  iran_watch: "0 */1 * * *"        # hourly Iran check (Wed Apr 22 ceasefire day)
  scalp_watch: disabled            # Edge's Worker handles this already
  session_end_ritual: "0 15 * * 1-5"  # 3PM CT Mon-Fri
```

---

## 8. Role Boundaries

| OpenClaw DOES | OpenClaw DOES NOT |
|---------------|-------------------|
| Run crons while Pete/Edge offline | Execute live trades without Michael approval |
| Monitor Slack for @mentions | Make infrastructure changes |
| Post alerts to Slack | Write to Pete.md or Edge.md |
| Execute paper trades via Alpaca | Override Pete's intel or Edge's builds |
| Commit session logs to GitHub | Create new Notion databases |

---

## 9. Edge Install Checklist

- [ ] `npm install -g openclaw`
- [ ] Create `~/.openclaw/mor-config.yml` with above config
- [ ] Install Alpaca skill from clawhub.ai (Alpaca API key from Michael's .env)
- [ ] Install GitHub skill from clawhub.ai (morelectric-max token)
- [ ] Connect Slack workspace
- [ ] Set model to Claude Opus 4.6
- [ ] Test heartbeat in C0AC8UQJT54
- [ ] Post `@openclaw is live` to confirm

---

## 10. Spec Status

- [ ] Edge installs
- [ ] Edge posts install confirmation to Slack
- [ ] Pete reviews first heartbeat
- [ ] Michael approves or adjusts cron schedule

*Pete, 260420 — post-close spec sprint*

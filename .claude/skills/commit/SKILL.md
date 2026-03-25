---
name: commit
description: Review staged or working tree changes, draft strong commit messages, and only create commits when explicitly asked.
---

# Commit

Use this skill when the user wants help preparing a git commit.

## Workflow

1. Inspect the repo state with `git status --short`.
2. Prefer staged changes:
   - Run `git diff --staged --stat`
   - Run `git diff --staged`
3. If there are no staged changes, fall back to:
   - Run `git diff --stat`
   - Run `git diff`
4. Summarize the change in plain language before proposing a commit message.
5. Draft 3 concise commit subjects:
   - imperative mood
   - no trailing period
   - keep the subject under 72 characters
   - match recent repo style if there is a clear pattern
6. Recommend one message and explain why it best matches the actual diff.

## Safety

- Do not stage files unless the user explicitly asks for a commit.
- Do not run `git commit` unless the user explicitly asks for a commit.
- If the worktree contains unrelated changes, call that out before staging or committing.
- Prefer one logical commit per concern. Split commits when the diff clearly contains unrelated changes.

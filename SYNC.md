# Sync Workflow for opencode-isomo

This document describes the workflow for syncing the opencode-isomo fork with the upstream sst/opencode repository.

## Repository Structure

- **This Fork**: `opencode-isomo` (main branch)
- **Upstream**: `sst/opencode` (dev branch)
- **Remote Configuration**:
  - `origin`: `https://github.com/jiahaoxiang2000/opencode-isomo.git` (this fork)
  - `upstream`: `https://github.com/sst/opencode.git` (official repository)

## Sync Strategy

This fork uses the following sync strategy:

1. **Periodic Sync**: The `main` branch is periodically synced with upstream `dev` branch
2. **Manual Sync**: Syncs are performed manually when needed
3. **Merge Strategy**: We use merge commits to preserve history and track changes

## How to Sync

### Step 1: Fetch Upstream Changes

```bash
git fetch upstream
```

### Step 2: Review Upstream Changes

```bash
# View the commits that will be merged
git log upstream/dev --oneline
git diff main upstream/dev --stat
```

### Step 3: Merge Upstream into Main

```bash
# Switch to main branch
git checkout main

# Merge upstream/dev
git merge upstream/dev

# Resolve any conflicts if needed
# git add <resolved files>
# git commit
```

### Step 4: Push to Origin

```bash
git push origin main
```

## Handling Conflicts

If there are merge conflicts:

1. **Identify the conflicts**:

   ```bash
   git status
   ```

2. **Resolve conflicts manually** in the conflicting files

3. **Mark files as resolved**:

   ```bash
   git add <resolved-file>
   ```

4. **Complete the merge**:

   ```bash
   git commit
   ```

5. **Test thoroughly** before pushing

## Sync History

| Date | Commit             | Notes                                      |
| ---- | ------------------ | ------------------------------------------ |
| TBD  | Initial fork setup | Created from sst/opencode isomo-dev branch |

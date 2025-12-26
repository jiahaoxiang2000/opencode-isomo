#!/usr/bin/env bun

import { $ } from "bun"
import { tmpdir } from "os"
import { join } from "path"

const FORK_REPO = "isomo-dev/opencode"
const UPSTREAM_REPO = "sst/opencode"

async function main() {
  console.log("🔄 Starting sync with upstream sst/opencode")

  // Get current branch
  const currentBranch = await $`git branch --show-current`.text()
  const cleanCurrentBranch = currentBranch.trim()
  console.log(`📍 Current branch: ${cleanCurrentBranch}`)

  // Stash any uncommitted changes
  const status = await $`git status --porcelain`.text()
  if (status.trim()) {
    console.log("📦 Stashing uncommitted changes...")
    await $`git stash push -m "Sync stash $(date)"`
  }

  // Add upstream remote if it doesn't exist
  try {
    await $`git remote get-url upstream`
    console.log("✅ Upstream remote already exists")
  } catch {
    console.log("➕ Adding upstream remote...")
    await $`git remote add upstream https://github.com/${UPSTREAM_REPO}.git`
  }

  // Fetch from all remotes
  console.log("📡 Fetching from all remotes...")
  await $`git fetch --all`

  // Determine upstream main branch (usually 'dev' in sst/opencode)
  const upstreamHead = await $`git symbolic-ref refs/remotes/upstream/HEAD`.text()
  const upstreamMain = upstreamHead.trim().replace("refs/remotes/upstream/", "")
  console.log(`📍 Upstream main branch: ${upstreamMain}`)

  // Switch to main branch in our fork
  console.log("🌿 Switching to main branch...")
  await $`git checkout main`

  // Merge upstream changes into our main
  console.log(`🔀 Merging upstream/${upstreamMain} changes into main...`)
  try {
    await $`git merge upstream/${upstreamMain}`
  } catch (err) {
    // Check if we're already up to date
    const result = await $`git diff upstream/${upstreamMain}...HEAD --name-only`.text()
    if (!result.trim()) {
      console.log("✅ Already up to date with upstream")
    } else {
      throw err
    }
  }

  // Push updated main to fork
  console.log("🚀 Pushing updated main to fork...")
  await $`git push origin main`

  // Switch back to original branch
  console.log(`🔙 Switching back to ${cleanCurrentBranch}...`)
  await $`git checkout ${cleanCurrentBranch}`

  // Restore stashed changes if they exist
  const stashes = await $`git stash list`.text()
  if (stashes.trim() && status.trim()) {
    console.log("📦 Restoring stashed changes...")
    await $`git stash pop`
  }

  // Rebase current branch on updated main if it's not main
  if (cleanCurrentBranch !== "main") {
    console.log("🔄 Rebasing current branch on updated main...")
    await $`git rebase main`
  }

  console.log("✅ Sync complete!")
}

main().catch((err) => {
  console.error("❌ Error:", err.message)
  process.exit(1)
})

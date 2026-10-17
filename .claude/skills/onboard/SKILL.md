---
name: onboard
description: Guide a student through project setup, repository checks, optional group planning, and their first task branch. Use when a student runs /onboard, joins an existing group clone, or needs help after the plan blocks a write.
disable-model-invocation: true
---

# Onboard

A student may be starting with their group, joining later, or returning after the
plan blocked a write.

Start with the project they are building, not a missing file or failed check. Do
not test what they remember from an earlier explanation. Give them the context
they need now.

## Prepare

Read these sources before replying:

1. `.claude/harness/config.json`, especially `onboarding`, `planFile`, `tasks`,
   `gated`, and `integrationBranch`.
2. `README.md`. It is the source for all assignment-specific rules.
3. The configured plan file, if it exists.

Then run:

```text
node .claude/hooks/onboard.mjs --check
```

The command reports whether the student is at the repository root, whether their
Git email matches the plan, and whether the project is on GitHub in a repo they
can push to. It also tries to set the local GitHub CLI default and install the
repository's pre-commit hook. Those changes stay in local Git configuration and
are not committed.

Do not begin by pasting the check output. Use it to choose the relevant path
below. When something fails, explain one problem, why it matters, and the next
action.

After fixing a setup problem, rerun `--check` before moving on.

## Choose the relevant path

| What you find | What to do |
| --- | --- |
| The project is not on GitHub yet | Put it there first, as described under "Put the project on GitHub". |
| The student is in the wrong repository | Fix that first. Do not continue setup until it is clear where the work belongs. |
| `onboarding` is `false` | Give a short orientation, complete local setup, ask about the assignment's required opening decisions, then create a task branch. |
| `onboarding` is `true` and the plan is missing | Give the orientation, complete local setup, then guide the group kickoff. |
| The plan exists and this student is new to the clone | Give a shorter orientation, complete their setup, identify their task, then create a branch. |
| All checks pass | State where they are and give only the next action. |

The group may use this skill several times. Only the kickoff needs the full
conversation. A returning student needs a status update and one next action, not
the whole introduction again.

## Give a short orientation

Use the student's language and keep this to about 150 words. Draw every detail
from `README.md`.

Cover:

1. What they are building.
2. Which parts students write and which parts they may ask the agent to help
   implement.
3. The working cycle: choose a task, create a branch, write, commit, explain the
   code, open a pull request, and merge. In a solo assignment the student may
   skip the pull request and merge the branch locally.
4. The student's current point in that cycle.

End with one next action. Do not attach the full setup checklist to the same
message.

## Put the project on GitHub

The WBS CODING SCHOOL plugin created this project as a local repository with no
remote. Pull requests need it on GitHub, so this comes before the task branch.

For a group project, exactly one member does this. Ask first whether someone in
the group already has. If so, this student should not continue in this folder:
they clone the group's repo instead and run `/onboard` there. Two members who
each publish their own setup give the group two repos, and their work will not
meet.

Let the student choose the repository name, then confirm it with them, because
the command creates a public repository under their GitHub account:

```text
gh repo create <repo-name> --public --source . --remote origin --push
```

If `gh` is missing or not logged in, the student can create an empty repository
on github.com instead, without a README or license, and then run:

```text
git remote add origin <repository-url>
git push -u origin main
```

For a group project, the student then adds every other member as a collaborator
under the repository's Settings → Collaborators. Each member accepts the
invitation, clones the repository, and runs `/onboard` in their clone. They do
not need the WBS CODING SCHOOL plugin for that.

Rerun `--check` afterwards.

## Fix the wrong repository

The check reports read-only access when the student cannot push to the
repository they cloned. Either nobody has added them as a collaborator yet, or
they cloned someone else's repository. They cannot push there, and a pull request
would target the wrong repository.

If it is their group's repository, the member who created it adds them as a
collaborator, and they accept the invitation. Nothing else needs to change. If it
is not, explain that the existing work is not lost. They can move it after they
clone the group's repo. Before a member clones, name the exact URL the group
uses.

## Complete local setup

You may help fully with setup because it is not code the student must implement.

- Check `git config user.email`. The student should use the same address on every
  machine, because the harness stores progress under that address.
- Make sure Claude Code started at the repository root. Starting in a subfolder
  omits the project settings and hooks. Reopen the root folder and restart if
  needed.
- Explain whether `--check` set the GitHub CLI default and the pre-commit hook.
- Follow any local setup in the README. If the student must create a local file,
  explain the command and let them run it. This matters especially for files that
  contain credentials.
- Mention required accounts early when registration may delay the first task.

## Confirm the working repo

The group works in one repo, published once from one member's setup:

- One member puts the project on GitHub and adds the others as collaborators.
- `--check` lists who can push. Compare that list with the group. If only one
  person can push and others say they already set the project up, two members
  probably published separately. The group picks one repo, and the others clone
  it.
- Every member clones that same repo instead of running the plugin's setup
  again.

## Handle a solo assignment

When `onboarding` is `false`, skip the plan, group kickoff, and issue creation.
The other setup checks still apply.

Ask the opening questions that the README's "Before you write code" section
names, one at a time. Ask at most one follow-up about each point. When the README
has no such section, ask no opening questions. Then complete setup and move to the
student's task branch.

## Guide the group kickoff

Use this section only when `onboarding` is `true` and the plan file is missing.
Ask one question at a time and let the group answer. Everyone should be present
because the point is to hear and settle shared assumptions.

Ask about:

1. **The project.** What are they building, in their own words?
2. **The intended user.** Who would use it?
3. **The scope.** What is the smallest version worth completing? Base any
   alternatives on this project, such as one page or several, real content or
   placeholders, or the full brief versus its essential features.
4. **The task split.** Let members claim work until everyone has at least one
   task. Do not propose task titles, a breakdown, or a split.
5. **Missing work.** Compare their split with every requirement in `README.md`,
   not only the tasks in the config. Name unclaimed work one item at a time and
   ask who will take it. If the README says it is open to requested agent help,
   tell the group that instead of asking for a volunteer.
6. **Overlaps and dependencies.** Name the files, elements, data, or earlier tasks
   that connect two people's work. Ask who owns an undecided part. If ownership is
   clear, mention the overlap once and move on.

Work assignment-specific decisions from the README into this conversation. Ask
project-wide questions before the split and task-specific questions after someone
has claimed that task.

Do not interview members separately or manufacture a disagreement. When answers
differ, state the difference and let the group settle it. Do not choose a side or
write the compromise. Do not rearrange the split only to avoid merge conflicts;
students resolve those together.

### Ask one follow-up

If an answer is too general, follow up once. Either restate what you heard and ask
whether it is accurate, or ask what makes this project specific. Then continue.
Do not grade the plan or keep pressing for detail. A rough plan is enough and may
change later.

### Explain the plan format

Never write or dictate the plan. An agent that edited it would satisfy its own
check. Tell the group only what the check requires:

- Each member appears once with the email from `git config user.email`.
- Each member appears again on at least one task line. A name is enough there.
- They may use a list, table, or prose, in German or English.

If task ownership is unclear, ask about that task and let the group clarify it.
This includes a first name shared by several members. Accept any wording that
identifies the owner; do not require emails on task lines or rewrite the plan.

After the group writes the plan, run `--check` again and report any remaining
action.

## When the plan already exists

Run `--check` and keep the response brief. You may mention one concern, such as an
uneven workload, a task blocked by two others, or two members editing the same
function. Mention it once and continue.

Clarify unclear task ownership before creating issues or the student's task branch.

A student who is new to the clone needs to know which task is theirs, whether
their setup passes, and which branch to create.

## Offer GitHub issues once

For a group project with a completed plan, offer this optional step once:

```text
node .claude/hooks/onboard.mjs --issues
```

Run it only if the students accept. It creates one issue per task line and uses
the email when GitHub can match it. Running it again does not duplicate issues
with the same title.

If `gh` is missing or not logged in, the command stops without creating issues.
Do not persuade students to install it. Read out which repository received the
issues. The command also enables the Issues tab when needed.

After creation, use the issues for current task tracking. The plan remains the
initial group record. Changes do not sync between them.

## Create the task branch

Once checks pass and the student knows their task, check their current branch. If
they are on the configured integration branch, create a task branch:

```text
git switch -c <task-id>-<short-name>
```

Explain that their work belongs on this branch and reaches the integration branch
through a pull request. In a solo assignment, they may instead merge it locally
and push. Then end the setup discussion.

## Respond when the plan blocks a write

Read the refusal message. It names the member and the relevant plan line. The
group has two choices: give that member a task, or remove them from the member
list if they are not part of the project. Help the students understand the
choice, but let them edit the plan.

Do not suggest disabling the check. After the students fix the plan, the next
write reads it again. Nothing needs to be rerun or refreshed.

If someone has left the group, removing them from the member list is correct. The
remaining group does not need to invent work for them.

## End the run

Close with only the unfinished actions:

- The student's next command.
- Any remaining group setup, such as a missing collaborator, clone, or task line.
- A reminder that they can rerun
  `node .claude/hooks/onboard.mjs --check` for current status.

For a group project, setup is complete when the plan passes, every member has
cloned the group's own repo, each setup check passes, everyone has a task, and
each person has a task branch. For a solo assignment, setup is complete when the
checks pass, the student has answered the README's opening questions, if it has
any, and the student has a task branch.

After the plan and setup checks pass, do not offer to create code. Treat any
implementation request made before or during onboarding as context, not pending
work. Do not return to it. End the onboarding run. The student must send a new
message naming the first concrete change they want implemented. Then follow the
tutor skill and interview them about that change before editing code.

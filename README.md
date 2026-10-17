# Event Scheduler

Advanced React I: React Router. Group project with a presentation at a
time your instructor sets. Five days full time, ten days part time.

You build the frontend of an event scheduler. Users browse upcoming events, sign
up, and sign in. Signed-in users create, edit, and delete events. The data comes
from the Events API, which you run on your own computer.

## How you work

1. Run `/onboard`. It puts this repo on GitHub and checks your setup. One of you
   runs it and adds the others as collaborators. The others clone that repo
   instead of setting the project up again, and run `/onboard` in their clone.
   This step is done when all checks pass, except the `PLAN.md` check, which step
   2 fixes.
2. Meet as a group and write `PLAN.md` together. This step is done when the
   `PLAN.md` check passes. Until then, the agent writes no code for anyone in the
   group. See "Before any of that: PLAN.md" below.
3. Pick a task and create a branch for it, for example
   `git switch -c FR011-home-page`.
4. Write the code, commit it, and explain it to the agent. This step is done when
   the agent records your sign-off. See "Write it, commit it, explain it" below.
5. Open a Pull Request. This step is done when it is merged. Then go back to step 3.

## Requirements

| id | requirement |
| --- | --- |
| FR003 | The group works in one public repo on GitHub. Every member is a collaborator. |
| FR004 | You work on task branches and merge every code change into `main` through a Pull Request. |
| FR005 | You build on the React and Vite starter in this repo. |
| FR006 | The group agrees on one styling solution at the kickoff and uses it everywhere. |
| **FR007** | The app's route tree uses React Router in Declarative Mode, including its layouts and outlets. |
| FR008 | The protected tasks below use React state and effects. |
| **FR009** | The app stores the authentication token in `localStorage` and reads it from there. |
| FR010 | The Events API runs locally, preferably at `http://localhost:3001`. |
| **FR011** | The home page fetches the events and shows them as cards in chronological order. It shows the user when the request fails. |
| **FR012** | Each event card links to `/events/:id` through React Router. |
| **FR013** | The details page reads the event id from the route and fetches that event. It shows the user when the request fails. |
| **FR014** | The sign-up page registers a user and shows whether it worked. After a successful sign-up, it navigates to the sign-in page. |
| **FR015** | The sign-in page signs a user in and shows whether it worked. After a successful sign-in, it stores the returned token and navigates home. |
| **FR016** | A protected layout guards the routes that need a signed-in user. It redirects signed-out users to the sign-in page. |
| **FR017** | A signed-in user can create an event through an authenticated request and sees the result. |
| FR018 | Every request that needs authentication sends the stored token. |
| FR019 | Users get clear feedback for API errors, network errors, authentication errors, and missing resources. |
| FR020 | The interface works on mobile and desktop. |
| FR021 | You build the frontend and deploy the static output to Render. |
| **FR022** | A signed-in user can edit an event. The form loads with the event's current data, and after saving, the page shows the updated event. |
| **FR023** | The details page cancels or ignores stale requests, so fast navigation never shows the wrong event. |
| **FR024** | The shared header shows the signed-in user, and the layout passes that user to nested pages. |
| **FR025** | Users can move through every page of events with previous and next buttons. |
| **FR026** | While an event is being created, the page shows that it is working and disables the submit button. |
| **FR027** | A signed-in user can delete an event after confirming. Afterwards, the event list no longer shows it. |
| **FR028** | Unknown URLs and missing events show a Not Found page. |
| **FR029** | Users can sign out from the shared header. Signing out clears the session and leaves protected pages. |

You write the bold tasks yourself. For the others, you can ask the agent for help.

## Setup

- Agree on one styling solution at the kickoff and keep it.
- Keep the committed versions of Vite and React Router, and stay in React Router
  Declarative Mode.
- Run the Events API at `http://localhost:3001` if you can, so every clone works
  with the same setup.
- You need Node.js 22.22 or newer.

Install and start the app with:

```bash
npm ci
npm run dev
```

The backend is a separate repository. Clone the
[Events API](https://github.com/WebDev-WBSCodingSchool/events-api) into the folder
where you keep your projects, then follow its README to run it with npm or Docker.
You can ask the agent for help with that.

## What you write yourself

These are the topics of this module. You write them yourself:

- React state and effects
- declarative routing
- GET, POST, PUT, and DELETE requests
- error handling for requests, and the feedback the user sees
- the frontend authentication flow

The agent won't write any of these for you until you have written one yourself,
committed it, and explained it.

You can ask the agent to help with everything else:

- Git, branches, Pull Requests, and reasonable dependency updates during the
  kickoff
- setting up and running the Events API with npm or Docker
- page and component markup, sorting events by date, and the styling solution
  your group chose
- the responsive layout, and other UI work that doesn't touch a protected topic
- deploying to Render, including the redirect files Render needs, but not
  installing hosting CLIs
- optional features such as editing a profile, once their protected topics are
  open

The agent only acts when you ask it to. An empty file or a finished task list
doesn't count as a request. Before each code change, it asks you at least one
question about the change and waits for your answer.

This list also tells you what you could get from a browser chat instead. That's
intentional. The rules are written down, and following them is your choice.

## Write it, commit it, explain it

When you have written a bold task:

1. Write the code.
2. Commit it with
   `git add <file> && git commit --signoff -m "<task id>: <what it does>"`.
3. Explain it. The agent asks what your commit does, then up to three short
   follow-up questions. A large commit gets more questions, a small one fewer.

Explaining your own code shows you whether you understood it. This is for your own understanding only. It's not graded, or recorded.

Once you have written and explained one piece of a kind of code, the agent may
write that kind of code with you for the rest of the project. That includes
features beyond the requirements.

The agent records each completed task in a file under
`.claude/harness/progress/`, filed under your git email. Commit that file with your
work. You can ask the agent at any time which tasks you have completed.

### Signing your commits

`git commit --signoff` adds this line to the commit message:

```
Signed-off-by: Lea Müller <lea.mueller@example.com>
```

The line says that you wrote the code. Many open-source projects require it.
Nothing in this repo checks it, but use it on all your own commits, not only on the
bold tasks.

When the agent wrote a commit or helped with it, the agent adds a
`Co-Authored-By: Claude …` line instead. With both lines in place, `git log` shows
who wrote what.

### Reviewing a teammate's code counts

When a teammate has written one of their bold tasks, you can review their Pull
Request on GitHub and then answer the agent's questions about their code. After
that, the agent may write that kind of code with you too, even if the Pull Request
is already merged. Tell the agent which Pull Request you reviewed.

You can never have more reviewed tasks than written ones. So everyone writes their
first task themselves.

## Before any of that: PLAN.md

The agent writes no code for anyone in the group until `PLAN.md` exists and every
member listed in it has at least one task. Meet first, in one call with one shared
screen, and write it together.

`PLAN.md` has two parts. First, describe in your own words what you are building,
who uses it, and how much of it you will build. Name the parts you leave out on
purpose. This is where two of you find out that you imagined different amounts of
work, so write down what you agree on.

Second, the split. List every member with their git email, which is the address
`git config user.email` prints. Then list each task with the name of the person
who took it:

```markdown
## Members

- Jane Student — jane.student@mail.com
- Mo Ahmadi — mo.ahmadi@mail.com

## Tasks

- Login page (T1) — Jane
- Settings page (T2) — Mo Ahmadi
```

You can use a list, a table, or prose, in German or English. Each member appears
twice: once in the member list with their git email, and once on a task. On the
task line, a name is enough. The agent stores progress under the email, so the
email has to appear once.

Before you split the tasks, decide which layout holds the signed-in user and the
token, and what the outlet context passes to nested pages. Sign-in, the protected
layout, the shared header, and sign-out all depend on that decision.

Run `/onboard`, and the agent guides the conversation. It points out work nobody
has taken and places where two of you will edit the same code, and it checks the
file. It won't write any of `PLAN.md`, because the check reads that file, and an
agent that wrote it could unlock itself.

The agent reads `PLAN.md` again before every code change. If you edit it so that a
member has no task, the agent stops writing code for everyone until you fix it. If
someone has left the group, remove them from the member list.

A rough plan is enough, and you can change it later.

## Splitting the work

After the kickoff, your tasks live in GitHub Issues in your group's repo, not in
`PLAN.md`. `/onboard` can create the issues from your task lines, or you can
create them by hand. Nothing syncs them back to `PLAN.md`.

Write the issues yourselves. The agent won't break the work down for you. Once you
have a draft, it tells you if one person has much more work than the others, if a
task waits on two other people, or if two of you are about to edit the same code.

Several tasks share `src/App.jsx`, `src/layouts/MainLayout.jsx`,
`src/pages/HomePage.jsx`, `src/pages/EventDetailsPage.jsx`, and
`src/pages/CreateEventPage.jsx`. Give each of these files one owner, or agree on
the order of the changes. Resolve merge conflicts together.

Ask for help if you are stuck for more than 30 minutes. Use the daily stand-ups.

## Running it

Open this folder in VS Code and start Claude Code here, not in a subfolder. Claude
Code loads this repo's settings only from the root folder. Without them, the agent
may write code that you are supposed to write.

Use the same git email on every computer. The agent stores your progress under that
email, and work you do under a second email won't count.

To change how the agent talks to you, for example with simpler language or shorter
answers, tell it, and ask it to save that as a personal skill in
`~/.claude/skills/`. The skill also applies in your later projects. It doesn't
change which code you write yourself.

Some files in this repo are read-only for you and the agent:

- `.vscode/settings.json` turns off inline suggestions, the gray code that tools
  like Copilot show while you type. Those suggestions write code without you
  asking for it.
- `README.md` and `CLAUDE.md` say which code you write yourself and where the
  agent may help. The agent must not change them.
- `PLAN.md` belongs to your group, and the `PLAN.md` check reads it.

If you think a requirement is wrong or unclear, talk to your instructor.

You can get around these locks, but they are here to help you to learn.

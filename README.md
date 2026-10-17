# Event Scheduler

Advanced React I with TypeScript. Group project with a presentation at a time
your instructor sets. Five days full time, ten days part time.

You build the frontend of an event scheduler in React and TypeScript. Users
browse upcoming events, sign up, and sign in. Signed-in users create, edit, and
delete events. The data comes from the Events API in `backend/`, which you run on
your own computer.

## How you work

1. Accept your instructor's invitation to the group's repo in the `G-SEAI-9`
   organization, clone it, and run `/onboard` in your clone. It checks your setup.
   This step is done when all checks pass.
2. At the kickoff, each of you takes one work package. Your tasks are issues on
   the group's project board. See "Splitting the work" below.
3. Pick an issue that is assigned to you and create a branch for it, for example
   `git switch -c FR011-home-page`.
4. Write the code, commit it, and explain it to the agent. This step is done when
   the agent records your sign-off. See "Write it, commit it, explain it" below.
5. Open a Pull Request. This step is done when it is merged. Then go back to step 3.

## Requirements

| id | requirement |
| --- | --- |
| FR003 | The group works in one public repo on GitHub. Every member is a collaborator. |
| FR004 | You work on task branches and merge every code change into `main` through a Pull Request. |
| FR005 | You build on the React, TypeScript, and Vite starter in `frontend/`. |
| FR006 | The group agrees on one styling solution at the kickoff and uses it everywhere. |
| FR007 | The app's route tree uses React Router in Declarative Mode, including its layouts and outlets. |
| FR008 | The protected tasks below use React state, effects, and TypeScript types. |
| FR009 | The app stores the authentication token in `localStorage` and reads it from there. |
| FR010 | The Events API in `backend/` runs locally at `http://localhost:3001`. You use it as it is and don't change its code. |
| **FR011** | The home page fetches the events and shows them as cards in chronological order. It shows the user when the request fails. |
| **FR012** | Each event card receives its event through props typed with the shared `Event` type, and links to `/events/:id` through React Router. |
| **FR013** | The details page reads the event id from the route and fetches that event. It shows the user when the request fails. |
| **FR014** | The sign-up page registers a user and shows whether it worked. After a successful sign-up, it navigates to the sign-in page. |
| **FR015** | The sign-in page signs a user in and shows whether it worked. After a successful sign-in, it stores the returned token and navigates home. |
| FR016 | A protected layout guards the routes that need a signed-in user. It redirects signed-out users to the sign-in page. |
| **FR017** | A signed-in user can create an event through an authenticated request and sees the result. |
| FR018 | Every request that needs authentication sends the stored token. |
| FR019 | Users get clear feedback for API errors, network errors, authentication errors, and missing resources. |
| FR020 | The interface works on mobile and desktop. |
| FR021 | You build the frontend and deploy the static output to Render, with `frontend` as the root directory. |
| **FR022** | A signed-in user can edit an event. The form loads with the event's current data, and after saving, the page shows the updated event. |
| **FR023** | The details page cancels or ignores stale requests, so fast navigation never shows the wrong event. |
| FR024 | The shared header shows the signed-in user, and the layout passes that user to nested pages. |
| **FR025** | Users can move through every page of events with previous and next buttons. |
| **FR026** | While an event is being created, the page shows that it is working and disables the submit button. |
| **FR027** | A signed-in user can delete an event after confirming. Afterwards, the event list no longer shows it. |
| FR028 | Unknown URLs and missing events show a Not Found page. |
| FR029 | Users can sign out from the shared header. Signing out clears the session and leaves protected pages. |
| **FR030** | One shared file defines and exports the types for an event and a user as the Events API returns them. Every page and component imports them from there. |

You write the bold tasks yourself. For the others, you can ask the agent for help.

## Setup

- Agree on one styling solution at the kickoff and keep it.
- Keep the committed versions of Vite, TypeScript, and React Router, and keep the
  committed TypeScript settings, including strict mode. Stay in React Router
  Declarative Mode.
- Don't change the code in `backend/`. Everyone's frontend talks to the same API.
- You need Node.js 22.22 or newer.

The repo has two parts, and each runs in its own terminal. Start the Events API
first:

```bash
cd backend
npm ci
cp example.env .env
npm run seed
npm run dev
```

It runs at `http://localhost:3001`, and its Swagger docs at
`http://localhost:3001/api-docs` list every endpoint and field. `npm run seed`
fills the database with sample users and events once. The `.env` file and the
database file `db.db` stay on your computer and are never committed.

Then start the frontend in a second terminal:

```bash
cd frontend
npm ci
npm run dev
```

`npm run build` in `frontend/` checks all types before it builds. You can ask the
agent for help with any of this.

## What you write yourself

These are the topics of this module. You write them yourself:

- React state and effects
- TypeScript types: your own types and interfaces, typed props, and typed state
- GET, POST, PUT, and DELETE requests with `fetch`

The agent won't write any of these for you until you have written one yourself,
committed it, and explained it.

You can ask the agent to help with everything else:

- Git, branches, Pull Requests, and reasonable dependency updates during the
  kickoff
- setting up and running the Events API in `backend/`
- page and component markup, sorting events by date, and the styling solution
  your group chose
- the route tree, layouts, and outlets with React Router
- the authentication flow: storing the token, the protected layout, the shared
  header, and signing out
- error messages and other feedback the user sees
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

## Before you write code

Which issue on the project board is assigned to you? The agent creates your task
branch from it, named after the task ID, for example `FR011-home-page`. If you have
several issues, start with one marked `prio: early`.

## Splitting the work

Your instructor has split the work into five packages of about the same size. At
the kickoff, each of you takes one. Every package owns its own files, so two of
you rarely edit the same file.

| package | tasks you write yourself | open tasks the agent may help with |
| --- | --- | --- |
| A: Event list | FR011, FR025 in `HomePage.tsx`, FR012 in `EventCard.tsx` | FR028 |
| B: Event details | FR013, FR023 in `EventDetailsPage.tsx` | FR007 |
| C: Create an event | FR017, FR026 in `CreateEventPage.tsx` | FR016 |
| D: Accounts and types | FR030 in `types.ts`, FR014 in `SignUpPage.tsx`, FR015 in `SignInPage.tsx` | FR009 |
| E: Edit and delete | FR022 in `EditEventPage.tsx`, FR027 in `DeleteEventButton.tsx` | FR024, FR029 |

FR019, FR020, and FR021 belong to the whole group.

Each task is an issue on the group's project board, with a label for its package.
Assign yourself to your issues there and move them across the board as you work.
Three tasks are labelled `prio: early`, because everyone else builds on them:
FR030 (the shared types), FR007 (the route tree), and FR009 (the token). Merge each
of them in its own small Pull Request on the first day.

Before you start, decide which layout holds the signed-in user and the token, and
what the outlet context passes to nested pages. Sign-in, the protected layout, the
shared header, and sign-out all depend on that decision.

Two places connect packages. `App.tsx` gets a route for every page, so agree on
the paths at the kickoff. `EventDetailsPage.tsx` renders the `DeleteEventButton`,
so packages B and E agree on its props. Resolve merge conflicts together.

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

If you think a requirement is wrong or unclear, talk to your instructor.

You can get around these locks, but they are here to help you to learn.

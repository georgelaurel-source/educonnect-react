# EduConnect — Online Learning Resource Catalogue

A responsive React website helping beginner students discover Computing learning resources, supporting SDG 4: Quality Education.

Live website: https://educonnectlearning.co.uk/

## Features
- Home, resource catalogue, resource details, reading list and About pages.
- Keyword search and subject, level and format filters.
- Alphabetical sorting and pagination.
- Save/remove resources, clear the reading list and undo.
- Responsive navigation and resource detail tabs.
- 13 Computing resources with external provider links.

## Run locally
Download or clone this repository, open the folder in Visual Studio Code, and run:

```powershell
py -m http.server 4173
```

Open http://localhost:4173/ in your browser. Stop the server with Ctrl+C.
No npm installation or build is required: React, ReactDOM and htm are bundled locally. Opening index.html directly may work, but a local server provides consistent reading-list storage.

## Project structure
- `index.html`: main entry point.
- `html/`: the five page templates.
- `css/desktop/` and `css/mobile/`: styling.
- `javascripts/app.js`: React components and interactive behaviour.
- `javascripts/resources.js`: catalogue data.
- `javascripts/vendor/`: bundled libraries and their licences.
- `assets/`: images and favicon.

## Current scope
The reading list is stored in the browser, not in an account. This version has no authentication, server database, interactive courses, certificates, community forum or visitor counter. Provider materials require internet access and may have their own conditions.

## Team responsibilities
These are the agreed responsibilities, not evidence that every activity has been completed.

| Member | Responsibility |
| --- | --- |
| Estephanie | Management, Agile Scrum, Gantt chart, milestones and product backlog |
| Eduard | Penpot V1/V2, UI/UX, prototype and usability testing |
| Dagnija | HTML, CSS and responsive design |
| George | JavaScript, search, filtering and interactive functionality |
| Cosmin | SDG 4 research, accessibility, functional testing and results documentation |

## Verification
JavaScript syntax and local asset references were checked when preparing the published version. `VERIFICATION.md` records development checks supplied with the original archive; these are not participant usability studies.

## Collaboration
See `CONTRIBUTING.md`. Record actual changes using meaningful commits. Do not commit passwords, API secrets, personal student records or participant data.

## Licensing
React and ReactDOM use the MIT licence; htm uses Apache-2.0. Their licence notices are retained in `javascripts/vendor/`. No additional open-source licence is granted for the group project source; agree licensing with the group before public distribution. External learning materials remain subject to their providers' terms.

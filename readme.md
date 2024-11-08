# EventMate FE

Frontendová část aplikace EventMate.

- [Struktura projektu](#project-structure)
- [Prerekvizity](#preparation)
- [Spuštění projektu](#project-configuration)

<a name="project-structure"></a>
## Struktura projektu

Zde si můžete projít hrubou strukturu projektu, aby bylo jasné kde co hledat. Jsou vytažené nejdůležitější složky a 
logické celky.

````Shell
cz.eventmate.fe
├─📂 styled-system # generated PandaCSS styles
├─📂 src # contains code of the frontend application
│    ├─📂 components
│          ├─📂 layout # components related to application's layout
│          ├─📂 features # components specific for a given business feature.
│          └─📂 ui # ui components, which can be reused accros the entire application
│    ├─📂 contexts # context definitions and provider components
│    ├─📂 core # core components, primarily router, providers, etc.
│    ├─📂 library # components from libraries (primarily pandacss)
│    ├─📂 pages # components which wrap all components on a given page. these components should be used in the router
│    ├─📂 utils # helper function and utilities used accross the application
│    ├─📃 index.css # layered base styles which are provided by PandaCSS
│    └─📃 main.tsx # entrypoint for the application
├─📃 eslint.config.js # Configuration for eslint
├─📃 index.html # HTML with entrypoint/root for the react app
├─📃 panda.config.ts # Config of the PandaCSS styling system.
├─📃 park-ui.json # Config for installation of the parkUI components.
└─📃 vite.config.ts # Configuration of the Vite dev server, bundling, etc.
````

<a name="preparation"></a>
## Prerekvizity

Před spuštěním a prácí s projektem je potřeba mít lokálně nainstalované následující tools:

- Package manager, bundler - [Bun](https://bun.sh/docs)

V případě, že používáš Windows, ideálně si nakonfiguruj WSL2, nicméně by ti Bun měl fungovat případně i čistě na Windows. 
Případně piš projekťákovi. :) 


<a name="project-configuration"></a>
## Spuštění projektu

Spuštění projektu je jednoduché s Bun.

````Shell
# install dependencies
bun install

# run dev vite server
bun run dev

# add pkg 
bun add [pkg]

# add ParkUI component
bunx @park-ui/cli components add [component]
````

Více příkazů najdeš v dokumentaci bun.

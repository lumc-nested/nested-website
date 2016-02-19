Nested
======

Online pedigree editor.


Development
-----------

First install [Node.js](https://nodejs.org/). Then install package
dependencies with NPM:

    npm install

A live-reloading development webserver serves the compiled application when
running:

    npm run dev


Deployment
----------

To compile the application to a bundle that can be served by any webserver,
install the package dependencies as above and run:

    npm run dist

The bundle and accompanying files can now be found in the `dist`
subdirectory.

Alternatively, pre-compiled bundles can be found from the
[GitHub releases page](https://github.com/lumc-nested/nested-website/releases).

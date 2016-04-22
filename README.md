Nested
======

Online pedigree editor.

Actual rendering is done by [Madeline 2.0 PDE](http://madeline.med.umich.edu/).


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


Dependency management
---------------------

In order to have somewhat reproducible builds, we use
[npm shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) to lock down all
dependencies. To add or update a dependency, run:

    npm install --save --save-exact some-dependency@some-version

Or, if it's a dev dependency:

    npm install --save-dev --save-exact some-dev-dependency@some-version

Then update the shrinkwrap:

    npm shrinkwrap --dev

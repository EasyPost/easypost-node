# Builds the project
build:
    npm run build

# Cleans the project
clean:
    npm run clean

# Test the project and generate a coverage report
coverage:
    npm run coverage

# Generate docs for the library
docs:
    npm run docs

# Lint the project
eslint:
    npm run lint

# Fixes the lint
eslint-fix:
    npm run lintFix

# Initialize the examples submodule
init-examples-submodule:
    git submodule init
    git submodule update

# Install the styleguide (Unix only)
install-styleguide: init-examples-submodule
    sh examples/symlink_directory_files.sh examples/style_guides/node .

# Install project dependencies (Unix only)
install: init-examples-submodule
    npm install

# Lint the project
lint: eslint prettier scan

# Fix linting errors
lint-fix: eslint-fix prettier-fix

# Publish the built assets to NPM
publish:
    npm publish

# Publish the built assets to NPM for a release candidate
publish-next:
    npm publish --tag next

# Checks the format with prettier
prettier:
    npm run formatCheck

# Fixes the format with prettier
prettier-fix:
    npm run format

# Cuts a release for the project on GitHub (requires GitHub CLI)
# tag = The associated tag title of the release
# target = Target branch or full commit SHA
release tag target:
    gh release create {{tag}} dist/* --target {{target}}

# Runs security analysis on the project with Brakeman
scan:
    npm run scan

# Test the project
test:
    npm run test

# Check the built project works for older versions of Node
test-node-compatibility:
    npm run test:node-compatibility

# Update dependencies (Unix only)
update: update-examples-submodule
    npm update

# Update the examples submodule
update-examples-submodule:
    git submodule init
    git submodule update --remote

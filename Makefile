## help - Display help about make targets for this Makefile
help:
	@cat Makefile | grep '^## ' --color=never | cut -c4- | sed -e "`printf 's/ - /\t- /;'`" | column -s "`printf '\t'`" -t

## build - Builds the project
build:
	npm run build

## clean - Cleans the project
clean:
	npm run clean

## coverage - Test the project and generate a coverage report
coverage:
	npm run coverage

## docs - Generate docs for the library
docs:
	npm run docs

## eslint - Lint the project
eslint:
	npm run lint

## eslint-fix - Fixes the lint
eslint-fix:
	npm run lintFix

## init-examples-submodule - Initialize the examples submodule
init-examples-submodule:
	git submodule init
	git submodule update

## install-styleguide - Install the styleguide (Unix only)
install-styleguide: | update-examples-submodule
	sh examples/symlink_directory_files.sh examples/style_guides/node .

## install - Install project dependencies (Unix only)
install: | init-examples-submodule
	npm install

## lint - Lint the project
lint: eslint prettier scan

## fix - Fix linting errors
lint-fix: eslint-fix prettier-fix

## publish - Publish the built assets to NPM
publish:
	npm publish

## publish-next - Publish the built assets to NPM for a release candidate
publish-next:
	npm publish --tag next

## prettier - Checks the format with prettier
prettier:
	npm run formatCheck

## prettier-fix - Fixes the format with prettier
prettier-fix:
	npm run format

## release - Cuts a release for the project on GitHub (requires GitHub CLI)
# tag = The associated tag title of the release
# target = Target branch or full commit SHA
release:
	gh release create ${tag} dist/* --target ${target}

## scan - Runs security analysis on the project with Brakeman
scan:
	npm run scan

## test - Test the project
test:
	npm run test

## test - Test the project
test-node-compatibility:
	npm run test:node-compatibility

## update - Update dependencies (Unix only)
update: | update-examples-submodule
	npm update

## update-examples-submodule - Update the examples submodule
update-examples-submodule:
	git submodule init
	git submodule update --remote

.PHONY: help build clean coverage docs install lint lint-fix publish release scan test update update-examples-submodule

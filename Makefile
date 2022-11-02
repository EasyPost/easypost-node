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

## fix - Fix linting errors
fix:
	npm run fix

## format - Runs all formatting tools against the project
format:
	npm run format

## format-check - Checks if the project is formatted correctly against all formatting rules
format-check:
	npm run format

## install - Install project dependencies
# TODO:  Remove the `--force` flag once we've dropped support for Node 10 and can modernize the dependency matrix
install:
	git submodule init
	git submodule update
	npm install --force

## lint - Lint the project
lint:
	npm run lint

## publish - Publish the built assets to NPM
publish:
	npm publish

## release - Cuts a release for the project on GitHub (requires GitHub CLI)
# tag = The associated tag title of the release
release:
	gh release create ${tag} dist/*

## scan - Runs security analysis on the project with Brakeman
# TODO: lower this to something closer to `-m` when we modernize our dependencies
scan:
	npm run scan

## test - Test the project
test:
	npm run test

## update - Update dependencies
update:
	git submodule update --remote
	npm update

.PHONY: help build clean coverage docs fix format format-check install lint publish release scan test update

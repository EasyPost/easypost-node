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
	npm run formatCheck

# TODO: Change branch to master once examples are updated
## install-style - Download style guides
install-style:
	curl -LJs https://raw.githubusercontent.com/EasyPost/examples/style_guides/.prettierrc.yml -o .prettierrc.yml
	curl -LJs https://raw.githubusercontent.com/EasyPost/examples/style_guides/.eslintrc_node_cl -o .eslintrc

## install - Install project dependencies
install: | install-style
	git submodule init
	git submodule update
	npm install

## lint - Lint the project
lint:
	npm run lint

## publish - Publish the built assets to NPM
publish:
	npm publish

## publish-next - Publish the built assets to NPM for a release candidate
publish-next:
	npm publish --tag next

## release - Cuts a release for the project on GitHub (requires GitHub CLI)
# tag = The associated tag title of the release
release:
	gh release create ${tag} dist/*

## scan - Runs security analysis on the project with Brakeman
scan:
	npm run scan

## test - Test the project
test:
	npm run test

## update - Update dependencies
update:
	git submodule update --remote
	npm update

.PHONY: help build clean coverage docs fix format format-check install install-style lint publish release scan test update

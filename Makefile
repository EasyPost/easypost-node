## help - Display help about make targets for this Makefile
help:
	@cat Makefile | grep '^## ' --color=never | cut -c4- | sed -e "`printf 's/ - /\t- /;'`" | column -s "`printf '\t'`" -t

## clean - Runs the command to remove any build artifacts
clean:
	rm -f easypost*.js
	rm -f easypost*.map
	rm -f build.tar.gz

## build - Runs the commands to build this package
build:
	npm run build
	tar czvf build.tar.gz easypost*.js easypost*.map

## publish - Runs the commands to build this package
publish: build
	npm publish

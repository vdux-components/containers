#
# Vars
#

BIN = ./node_modules/.bin
.DEFAULT_GOAL := all

#
# Tasks
#

node_modules: package.json
	@npm install
	@touch node_modules

test: $(src) $(tests) node_modules
	@NODE_ENV=development hihat test/*.js -- \
		--debug \
		-t babelify \
		-p tap-dev-tool

validate: node_modules
	@standard

init:
	@git init
	@git add .
	@git commit -am "initial"
	@hub create vdux-components/containers -d "Container components that wrap the components in vdux-ui and provide them with stateful behavior"
	@travis enable
	@git push -u origin master

clean:
	@rm -rf lib

build: clean
	babel src --out-dir lib

all: validate test

#
# Phony
#

.PHONY: test validate clean build

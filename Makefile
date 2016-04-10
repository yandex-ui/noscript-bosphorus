NPM_BIN=$(CURDIR)/node_modules/.bin
export NPM_BIN

all: yate build

yate: test/tests.yate.js

build: *.js
	$(NPM_BIN)/webpack noscript-bosphorus.index.js noscript-bosphorus.js

test/tests.yate.js: test/tests.yate noscript-bosphorus.yate node_modules/noscript/yate/noscript.yate node_modules
	$(NPM_BIN)/yate $< > $@

node_modules: package.json
	npm install
	touch node_modules

publish: build
	npm publish

test: node_modules
	npm test

.PHONY: all

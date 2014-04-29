NPM_BIN=$(CURDIR)/node_modules/.bin
export NPM_BIN

yate: test/tests.yate.js

test/tests.yate.js: test/tests.yate noscript-bosphorus.yate node_modules/noscript/yate/noscript.yate node_modules
	$(NPM_BIN)/yate $< > $@

node_modules: package.json
	npm install
	touch node_modules

test: node_modules
	npm test

.PHONY: yate

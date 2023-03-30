lint:
	npx eslint .
install: 
	npm ci
publish:
	npm publish
test:
	npm test
test-covarage:
	npm test -- --coverage --coverageProvider=v8
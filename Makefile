init:
	# ln -s ../../.githooks/pre-commit .git/hooks
	npm i

build:
	npm run build

start-dev:
	npm run startDev

lint:
	npm run lint

test:
	npm test

test-updatesnapshots:
	npm test -- -u

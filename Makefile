.PHONY: clean publish help

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

dist: node_modules clean ## Builds dist scripts
	yarn build

clean: ## Removes artifacts
	yarn clean

publish: dist ## Publishes on npm
	npm publish

node_modules:
	yarn
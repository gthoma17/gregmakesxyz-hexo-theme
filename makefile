TEST_SITE 		:= tests/fixtures/hexo-site
DEV_SERVER_PID	:= $(shell lsof -i :4000 | grep node | awk '{print $$2}')

clean:
	@make stop; \
	rm -r ${TEST_SITE}/themes/THIS_THEME/* 2>/dev/null | true; \
	rm -r ${TEST_SITE}/db.json 2>/dev/null | true; \
	rm -r ${TEST_SITE}/public/* 2>/dev/null | true

inject-theme:
	@cp -r src/* ${TEST_SITE}/themes/THIS_THEME

run-playwright-full:
	npx playwright test --browser=all

run-playwright-quick:
	npx playwright test --browser=firefox

generate-test-fixtures:
	@yq -j eval tests/fixtures/hexo-site/_config.yml 2>/dev/null > tests/fixtures/hexo_site_config_as_json.json

generate-test-site: clean inject-theme
	npx hexo generate --cwd ${TEST_SITE};

stop-server: 
	@kill -9 $(DEV_SERVER_PID) 2>/dev/null | true

stop:
	@make stop-server

background-serve: clean inject-theme
	@screen -m -d -S ui make serve; \
	sleep 1

serve: clean inject-theme
	npx hexo server --draft --cwd ${TEST_SITE}

test: background-serve generate-test-fixtures run-playwright-full stop
	@echo "\n\n~--- Test Run Complete ---~"

test-quick: background-serve generate-test-fixtures run-playwright-quick stop
	@echo "~~~ 😎👉👉 ~~~";\

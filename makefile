TEST_SITE := tests/fixtures/hexo-site

clean:
	rm -r ${TEST_SITE}/themes/THIS_THEME/* | true; \
	rm -r ${TEST_SITE}/public/* | true

inject-theme:
	cp -r src/* ${TEST_SITE}/themes/THIS_THEME

generate-test-site: clean inject-theme
	npx hexo generate --cwd ${TEST_SITE}

test: generate-test-site
	npx jest

serve: clean inject-theme
	npx hexo server --draft --cwd ${TEST_SITE}
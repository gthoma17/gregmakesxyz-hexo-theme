TEST_SITE := test/fixtures/hexo-site

clean:
	rm -r ${TEST_SITE}/themes/THIS_THEME/* | true; \
	rm -r ${TEST_SITE}/public/* | true

inject-theme:
	cp -r src/* test/fixtures/hexo-site/themes/THIS_THEME

serve: clean inject-theme
	npx hexo server --draft --cwd ${TEST_SITE}
clean:
	rm -r tmp/* | true

copy-site-to-tmp:
	cp -r ~/workspace/gregmakesxyz/hexo-site/* tmp/

inject-theme:
	rm -r tmp/themes/gregmakesxyz-hexo-theme/*; \
	cp -r layout/ tmp/themes/gregmakesxyz-hexo-theme; \
	cp -r source/ tmp/themes/gregmakesxyz-hexo-theme; \
	cp _config.yml tmp/themes/gregmakesxyz-hexo-theme; \

serve: clean copy-site-to-tmp inject-theme
	npx hexo server --draft --cwd tmp
TS=$(shell date -u '+%Y/%m/%d %H:%M:%S')

all: install test

install:
	@sudo apt-get install -y npm
	@sudo npm install -g postcss-cli-simple autoprefixer
	@wget -O compiler-latest.zip https://dl.google.com/closure-compiler/compiler-latest.zip
	@unzip -d $(HOME)/bin/ compiler-latest.zip ; rm -f $(HOME)/bin/COPYING $(HOME)/bin/README.md compiler-latest.zip

test:
	@echo $(TS) Testing postcss with autoprefixer ...
	@postcss -u autoprefixer --autoprefixer.overrideBrowserslist "defaults, ie 10" -o styles.min.css web/design/boilerplate/styles.css
	@cat styles.min.css ; rm -f styles.min.css
	@echo $(TS) Testing closure-compiler ...
	java -jar /home/andygeiss/bin/closure-compiler.jar \
		--compilation_level SIMPLE_OPTIMIZATIONS \
		--language_out ECMASCRIPT_2018 \
		--js web/design/boilerplate/theme.js

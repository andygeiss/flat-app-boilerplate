all: install

install:
	sudo apt-get install -y npm
	npx install postcss-cli-simple autoprefixer

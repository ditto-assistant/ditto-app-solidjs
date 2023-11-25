set dotenv-load

dev: install
    bun dev

build: install
    bun run build

start:
    bun run start

install:
    bun i
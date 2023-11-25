set dotenv-load

dev: install
    bun dev

dev-open: install
    bun dev -- --open

build: install
    bun run build

start:
    bun run start

install:
    bun i
set dotenv-load

dev: install
    pnpm dev

dev-open: install
    pnpm dev -- --open

run-prod: build start

build: install
    pnpm run build

start:
    pnpm run start

install:
    pnpm i
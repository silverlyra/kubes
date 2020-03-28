.PHONY: all push

all: types/v1.14 types/v1.15 types/v1.16 types/v1.17 types/v1.18

types/%: $(shell find generate -type f -name '*.ts') openapi.ts
	@[ ! -d "$@" ] || rm -fr "$@"
	@echo Generating types for "$*"
	deno --allow-net --allow-write generate/main.ts $*

push: all
	./push
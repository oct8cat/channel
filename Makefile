dev:
	docker-compose \
		-f docker-compose.yml \
		-f docker-compose.development.yml \
		up

start:
	docker-compose up -d

stop:
	docker-compose stop

build:
	docker-compose \
		-f docker-compose.yml \
		-f docker-compose.development.yml \
		build

pull:
	docker pull oct8cat/channel_server
	docker pull oct8cat/channel_client
	docker pull oct8cat/channel_proxy

push:
	docker push oct8cat/channel_server
	docker push oct8cat/channel_client
	docker push oct8cat/channel_proxy

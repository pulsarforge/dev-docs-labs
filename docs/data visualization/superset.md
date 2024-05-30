---
sidebar_position: 1
---

# Superset

## Docker Compose

````yaml

x-superset-image: &superset-image apache/superset:latest
x-superset-depends-on: &superset-depends-on
  - db
  - redis
x-superset-volumes:
  &superset-volumes # /app/pythonpath_docker will be appended to the PYTHONPATH in the final container
  - ./docker:/app/docker
  - ./superset_home:/app/superset_home
version: "3.7"
services:
  redis:
    image: redis:latest
    container_name: superset_cache
    restart: always
    volumes:
      - ./redis:/data

  db:
    env_file: ./.env
    container_name: superset_db
    image: postgres:14
    restart: always
    volumes:
      - ./db_home:/var/lib/postgresql/data

  superset:
    env_file: ./.env
    image: *superset-image
    container_name: superset_app
    user: "root"
    restart: always
    ports:
      - 8088:8088
    depends_on: *superset-depends-on
    volumes: *superset-volumes

  superset-init:
    image: *superset-image
    container_name: superset_init
    env_file: ./.env
    depends_on: *superset-depends-on
    user: "root"
    volumes: *superset-volumes
    healthcheck:
      disable: true

  superset-worker:
    image: *superset-image
    container_name: superset_worker
    env_file: ./.env
    restart: always
    depends_on: *superset-depends-on
    user: "root"
    volumes: *superset-volumes

  superset-worker-beat:
    image: *superset-image
    container_name: superset_worker_beat
    env_file: ./.env
    restart: always
    depends_on: *superset-depends-on
    user: "root"
    volumes: *superset-volumes
    healthcheck:
      disable: true
volumes:
  redis:
    external: false  
````

## Commands
````sh
docker exec -it superset superset fab create-admin --username admin --firstname Superset --lastname Admin --email admin@superset.com --password admin
docker exec -it superset_app superset db upgrade
docker exec -it superset_app superset load_examples
docker exec -it superset_app superset init
````

## Config File

* SUPERSET_SECRET_KEY=
* DATABASE_DB=
* DATABASE_HOST=
* DATABASE_PASSWORD=
* DATABASE_USER=
* DATABASE_PORT=
* DATABASE_DIALECT=
* POSTGRES_DB=
* POSTGRES_USER=
* POSTGRES_PASSWORD=
* REDIS_HOST=
* REDIS_PORT=
* FLASK_ENV=
* SUPERSET_ENV=
* SUPERSET_LOAD_EXAMPLES=
* SUPERSET_PORT=
#!/bin/sh

docker build -t shindetanish/linting-as-a-service:latest .
docker run -d -p 3000:3000 shindetanish/linting-as-a-service:latest

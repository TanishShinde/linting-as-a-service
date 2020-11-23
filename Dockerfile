FROM koalaman/shellcheck-alpine
MAINTAINER Tanish Shinde <tanishvshinde@gmail.com>
RUN apk update
RUN apk upgrade
RUN apk add nodejs npm
RUN mkdir -p /nodejs/
RUN mkdir -p /nodejs/tmpFiles
RUN mkdir -p /nodejs/build
ADD app.ts            /nodejs/
ADD package.json      /nodejs/
ADD tsconfig.json     /nodejs/
ADD helpers /nodejs/helpers
ADD scripts /nodejs/scripts
RUN cd /nodejs/ && npm install && npm audit fix
RUN cd /nodejs/ && ./scripts/clean.sh
RUN cd /nodejs/ && ./scripts/build.sh
ENTRYPOINT "/nodejs/scripts/clean_build_run.sh"

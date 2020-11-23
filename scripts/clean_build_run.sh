#!/bin/sh
if [ -e "/nodejs/" ] ; then
  cd "/nodejs/"
fi
./scripts/clean.sh
./scripts/build.sh
./scripts/run.sh

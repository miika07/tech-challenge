#!/bin/sh

# script/test: Run test suite for application. Optionally pass in a path to an
#              individual test file to run a single test.


set -e

cd "$(dirname "$0")/.."

[ -z "$DEBUG" ] || set -x

export NODE_ENV="test"

echo '==> Runing TypeScript Build'
./node_modules/.bin/tsc

# Para atualizar os snapshots utilize:
# node_modules/.bin/jest --detectOpenHandles --forceExit -u
echo '==> Runing Jest'
node_modules/.bin/jest --detectOpenHandles --forceExit --noStackTrace --silent
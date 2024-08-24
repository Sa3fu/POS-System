#!/bin/sh

rm -rf ./node_modules 
rm -rf ./package-lock.json 


# packages
# - common
rm -rf ./packages/common/build
rm -rf ./packages/common/.rollup.cache
rm -rf ./packages/common/tsconfig.tsbuildinfo
rm -rf ./packages/common/node_modules
# - model
rm -rf ./packages/model/build
rm -rf ./packages/model/.rollup.cache
rm -rf ./packages/model/tsconfig.tsbuildinfo
rm -rf ./packages/model/node_modules
# - ui
rm -rf ./packages/ui/build
rm -rf ./packages/ui/.rollup.cache
rm -rf ./packages/ui/tsconfig.tsbuildinfo
rm -rf ./packages/ui/node_modules


# projects
# - api
# -- core
rm -rf ./projects/api/core/build
rm -rf ./projects/api/core/node_modules

# - app
# -- store
rm -rf ./projects/app/store/.next
rm -rf ./projects/app/store/node_modules
# -- admin
rm -rf ./projects/app/admin/.next
rm -rf ./projects/app/admin/node_modules
# -- delivery
rm -rf ./projects/app/delivery/.next
rm -rf ./projects/app/delivery/node_modules

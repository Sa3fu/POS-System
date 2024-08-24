# Buyo

Hyperlocal ecommerce store.

## Environments

- **Production**
  - api
    - [![core](https://github.com/sunverse-labs/buyo/actions/workflows/api.core.yml/badge.svg)](https://github.com/sunverse-labs/buyo/actions/workflows/api.core.yml)
  - app
    - [![admin](https://github.com/sunverse-labs/buyo/actions/workflows/app.admin.yml/badge.svg)](https://github.com/sunverse-labs/buyo/actions/workflows/app.admin.yml)
    - [![delivery](https://github.com/sunverse-labs/buyo/actions/workflows/app.delivery.yml/badge.svg)](https://github.com/sunverse-labs/buyo/actions/workflows/app.delivery.yml)
    - [![store](https://github.com/sunverse-labs/buyo/actions/workflows/app.store.yml/badge.svg)](https://github.com/sunverse-labs/buyo/actions/workflows/app.store.yml)

## Setup

- **Prerequisites**

  - Node (`v18.x`)
  - MongoDB
  - Redis

- Clone repository `git clone git@github.com:sunverse-labs/buyo.git buyo`
- Switch to directory `cd buyo`
- Setup
  - Install packages `npm install`

## Running

- Packages
  - common `npm run common`
  - model `npm run model`
  - ui `npm run ui`
- Projects
  - api
    - core
      - `npm run api.core`
      - [localhost:3001](http://localhost:3001)
      - [api.buyo.sunverse.ai](https://api.buyo.sunverse.ai)
  - app
    - admin
      - `npm run app.admin`
      - [localhost:4001](http://localhost:4001)
      - [admin.buyo.sunverse.ai](https://admin.buyo.sunverse.ai)
    - delivery
      - `npm run app.delivery`
      - [localhost:4002](http://localhost:4002)
      - [delivery.buyo.sunverse.ai](https://delivery.buyo.sunverse.ai)
    - store
      - `npm run app.store`
      - [localhost:4003](http://localhost:4003)
      - [buyo.sunverse.ai](https://buyo.sunverse.ai)

## Copyright notice

Copyright © 2024 [Sunverse Labs FZ-LLC](https://sunverse.ai).

All rights reserved.

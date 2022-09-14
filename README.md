# **Ink! Explorer**

## **About the explorer**

Ink Explorer is an application that provides Ink contracts related information on Substrate based blockchains. It subscribes to blockchain and Ink modules events and store the information on its own PostgreSQL database. The backend exposes an API that can interact with the DB and run fast queries to get specific information in a short time.

The idea of this project is to provide a tool that allows developers of Ink! explore and analyze the contracts found on the blockchain. This tool can be used to analyze the contracts found on Substrate based blockchains that are using Ink! modules. It can also be used to analyze contracts that are on a local blockchain.

This project serves useful information that is not available anywhere else. Since the back end is in charge of obtaining information related to the balances, transactions and more, of the contracts that use Ink modules. Ink Explorer uses polkadot.js to communicate with the Substrate / Polkadot networks. It is safe to say that this project is a must.

Blockcoders is a team that is always contributing to blockchain projects to help the growth of the ecosystem.

## **About us**

### Team members

- Jose Ramirez
- Fernando Sirni
- Ruben Gutierrez

### Contact

- **Contact Name:** Jose Ramirez
- **Contact Email:** jose@blockcoders.io
- **Website:** http://blockcoders.io/

### Team's experience

Our team has been contributing with different projects in blockchain for a few years, building APIs, SDKs and developer tools. Our goal is to continue to drive the crypto space forward by investing intellectual capital into projects, participating actively to help shape the ecosystems we believe in.

### Team Code Repos

- https://github.com/blockcoders
- https://github.com/blockcoders/ink-substrate-explorer-api
- https://github.com/blockcoders/nestjs-ethers
- https://github.com/blockcoders/harmony-marketplace-sdk
- https://github.com/blockcoders/near-rpc-providers
- https://github.com/athenafarm/athena-vault-contracts
- https://github.com/athenafarm/athena-sdk

### Team personal Githubs

- https://github.com/0xslipk
- https://github.com/fersirni
- https://github.com/RubenGutierrezC

### Team LinkedIn Profiles

- https://www.linkedin.com/in/jarcodallo/
- https://www.linkedin.com/in/fernando-sirni-1931ba122/
- https://www.linkedin.com/in/rubengutierrezc/

## **Get Started**

## Running the service locally

### Environment setup

- Install [Node.js](https://nodejs.org/)
  - Recommended method is by using [NVM](https://github.com/creationix/nvm)
  - Recommendeded Node.js version is v16.13
- Install [Docker](https://docs.docker.com/get-docker/)

### Install all the dependencies

```
pnpm i --frozen-lockfile
```

### Configure the environment variables

**Note**: The .env file has the configuration for GraphQL, the PostgreSQL database, Node and the RPC url of the Substrate Blockchain.

```
cp .env.sample .env
```

<span style="color:#2a98db"> **Service configurations** </span>

- **NODE_ENV**=development
- **PORT**=5000
- **LOG_NAME**=ink-substrate-explorer-frontend
- **LOG_LEVEL**=debug

<span style="color:#2a98db"> **GraphQL configurations** </span>

- **GRAPHQL_DEBUG**=true
- **GRAPHQL_PLAYGROUND**=true
- **GRAPHQL_SORT_SCHEMA**=true
- **GRAPHQL_INTROSPECTION**=true

<span style="color:#2a98db"> **Database configurations** </span>

- **DATABASE_HOST**=postgres
- **DATABASE_NAME**=ink
- **DATABASE_USERNAME**=root
- **DATABASE_PASSWORD**=password
- **DATABASE_RETRY_ATTEMPTS**=5
- **DATABASE_RETRY_DELAY**=3000

<span style="color:#2a98db"> **Blockchain and Sync configurations** </span>

- **WS_PROVIDER**=wss://rococo-contracts-rpc.polkadot.io
- **LOAD_ALL_BLOCKS**=false - <span style="color:#2a98db"> Set to _true_ to process every block from FIRST_BLOCK_TO_LOAD to the current block. Set to _false_ to only start processing blocks from the last existing block in the database.</span>

- **FIRST_BLOCK_TO_LOAD**=0 - <span style="color:#2a98db"> Block number from which the service will start to process blocks. (Can be genesis or some other block. For example, the first block supporting contracts) </span>

- **BLOCK_CONCURRENCY**=1000 - <span style="color:#2a98db"> Number of blocks to process concurrently. This can speed up or down the syncing process.</span>

### Start the backend using Docker

To start the project a **PostgreSQL DB** is needed. For that, the **dev-docker-compose.yaml** file already has an image set up ready to use.
Running this command it will also start a container for pgAdmin.

```
docker-compose up -f dev-docker-compose.yaml -d
```

A  way to run a local node is with [this paritytech guide](https://github.com/paritytech/substrate-contracts-node).

**Note**: Change the WS_PROVIDER var in the **.env** file to be `ws://127.0.0.1:9944`

### Starting the project (DEV)

- ### `pnpm start:dev`

Runs the service in the development mode.
The service will reload if you make edits.

### Starting the project (PROD)

To start both the Back-end and the Front-end run:

- ### `docker-compose up -d`

### Test

Running the unit tests.

- ### `pnpm test`

Running the test coverage.

- ### `pnpm test:cov`

## **Subscriptions**

The first time the node is started, it may need to start from the block 0 and load all blocks (LOAD_ALL_BLOCKS env var should be set to true). If you want to start from a specific block, you can use the FIRST_BLOCK_TO_LOAD env var to start from another block.

In case of a downtime of the node, the subscriptions will be reconnected automatically recovering all new blocks from the last block that was processed.

**Note**: Load all blocks may take a long time depending on the number of blocks that need to be loaded. It is recommended to use a node with a fast internet connection. The node will be able to process all blocks in a few hours. 

### Some benchmarks

#### Using BLOCK_CONCURRENCY = 100
- 100     blocks ~ 6 seconds
- 1000    blocks ~ 30.5 seconds
- 10000   blocks ~ 4:24 minutes
- 100000  blocks ~ 39.57 minutes

#### Using BLOCK_CONCURRENCY = 1000
- 100     blocks ~ 0.5 seconds
- 1000    blocks ~ 5 seconds
- 10000   blocks ~ 3 minutes
- 100000  blocks ~ 24 minutes


# Yager Contracts' API

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Start Application](#start-application)
  - [Stop Application](#stop-application)
  - [Open GraphQL Playground](#open-graphql-playground)
  - [Examples Of The Main Features](#examples-of-the-main-features)
- [License](#license)

## About The Project

This is the Yager Contracts' API, a platform for organizing and monitoring contracts.

This is a GraphQL API built with Node and TypeScript using polyglot persistence.
For this persistence we are using TypeORM with postgres for relational data, mongoose
with mongoDB for non-relational data and neo4j for graph data.

For a better understanding of the system, you can check the functional requirements and the modeling of the system that are in the pdf directory.

## Getting Started

This project requires at least docker version 19.03 and docker-compose version 1.24.
You can install these requirements following the links below:

- [Install docker](https://docs.docker.com/get-docker/)
- [Install docker-compose](https://docs.docker.com/compose/install/)

## Usage

### Start Application

From docker directory, start up the application by running:

```
$ docker-compose up --build
```

### Stop Application

From docker directory, stop the application by running:

```
$ docker-compose down
```

### Open GraphQL Playground

To interact with the API, start up the application then access:

http://localhost:3000/graphql

### API Documentation

The API documentation is generated by Graphql and can be accessed by pressing the "docs"
button located at the right side of the GraphQL playground

### Examples Of The Main Features

These are a few examples of how the main features described in the functional
requirements are satisfied:

- [Create A Contract](#create-a-contract)
- [Contract Termination](#contract-termination)
- [Create User With Signature](#create-user-with-signature)
- [Companies Recommendation](#companies-recommendation)

Note: You can check the [seed file](https://github.com/leolanavo/yager-contracts/tree/master/examples/seed.graphql) that contains examples of all mutations and queries of the
system and you can use it to populate your database.

#### Create A Contract

```
mutation contract {
  createContract(
    mainParty: "5b1add7c-07d0-4fcb-a941-d6692d0b938e"
    secondaryParty: "a5c82c87-acca-4ca6-8ea3-6c45c12e12dc"
    startDate: "1410739200000"
    endDate: "1461542400000"
    clauses: [
      {
        delayTolerance: 12
        numberNotifications: 1
        rescissory: true
        text: "Clause 1 description"
        payment: {
          baseCharge: 100.00
          kind: "single"
          paymentDeadline: 10
          increments: [
            { period: 365, relativeRate: 12.00, absoluteRate: 40.00 }
          ]
        }
      }
    ]
  ) {
    _id
    mainParty
    secondaryParty
    appliedClauses {
      clauseID
    }
  }
}
```

#### Contract Termination

```
mutation terminate {
  terminateContract(
    partyID: "16226aa0-8497-49b9-976b-e2e82d939049"
    contractID: "64bab711-dc67-479b-9071-e90efaa0f030"
  ) {
    _id
    mainParty
    secondaryParty
    terminatedBy
    terminatedDate
  }
}
```

#### Create User With Signature

```
mutation user {
  createUser(
    cpf: "42309164003", 
		email: "test2@test.com",
    name: "Lana",
		rg: "61651968498", 
    signature: "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mNk+P//PwMRgHFUIX0VAgAE3B3t0SaZ0AAAAABJRU5ErkJggg=="
  ){
		id
    party
  },
}
```

#### Companies Recommendation

```
query relatedCompanies {
  getRelatedCompanies(name: "Lana")
}
```

## License

Licensed under the MIT LICENSE. See `LICENSE` for more information.

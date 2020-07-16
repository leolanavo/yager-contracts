CREATE TABLE IF NOT EXISTS "parties" (
  id VARCHAR(36) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS "users" (
  id VARCHAR(36) PRIMARY KEY,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  rg VARCHAR(30) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  signature TEXT,
  "partyId" VARCHAR(36) REFERENCES "parties" (id) ON DELETE RESTRICT UNIQUE NOT NULL,
  CONSTRAINT valid_cpf CHECK (validateCPF(cpf))
);

CREATE TABLE IF NOT EXISTS "companies" (
  id VARCHAR(36) PRIMARY KEY,
  cnpj VARCHAR(14) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  segments TEXT NOT NULL,
  documents TEXT NOT NULL,
  "partyId" VARCHAR(36) REFERENCES "parties" (id) ON DELETE RESTRICT UNIQUE,
  CONSTRAINT valid_cnpj CHECK (validateCNPJ(cnpj))
);

CREATE TABLE IF NOT EXISTS "represents" (
  userId VARCHAR(36) REFERENCES "users" (id) ON DELETE CASCADE,
  companyId VARCHAR(36) REFERENCES "companies" (id) ON DELETE CASCADE
 );

CREATE TABLE IF NOT EXISTS "in_contract" (
  "constractId" VARCHAR(36) PRIMARY KEY,
  "mainParty" VARCHAR(36) REFERENCES "parties" (id) ON DELETE SET NULL,
  "secondaryParty" VARCHAR(36) REFERENCES "parties" (id) ON DELETE SET NULL,
  CONSTRAINT different_parties CHECK ("mainParty" <> "secondaryParty")
);
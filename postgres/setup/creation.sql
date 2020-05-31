CREATE TABLE IF NOT EXISTS "party" (
  id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  rg VARCHAR(30) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  signature_b64 TEXT,
  party_id INTEGER REFERENCES "party" (id) ON DELETE RESTRICT,
  CONSTRAINT valid_cpf CHECK (validateCPF(cpf))
);

CREATE TABLE IF NOT EXISTS "companies" (
  id SERIAL PRIMARY KEY,
  cnpj VARCHAR(14) UNIQUE NOT NULL,
  name TEXT,
  party_id INTEGER REFERENCES "party" (id) ON DELETE RESTRICT
  CONSTRAINT valid_cnpj CHECK (validateCNPJ(cnpj))
);

CREATE TABLE IF NOT EXISTS "company_docs" (
  company_id INTEGER REFERENCES "companies" (id) ON DELETE CASCADE,
  doc_b64 TEXT
);

CREATE TABLE IF NOT EXISTS "company_segments" (
  company_id INTEGER REFERENCES "companies" (id) ON DELETE CASCADE,
  segment VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS "represents" (
  user_id INTEGER REFERENCES "users" (id) ON DELETE CASCADE,
  company_id INTEGER REFERENCES "companies" (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "in_contract" (
  id SERIAL PRIMARY KEY,
  main_party INTEGER REFERENCES "party" (id) ON DELETE SET NULL,
  secondary_party INTEGER REFERENCES "party" (id) ON DELETE SET NULL
);
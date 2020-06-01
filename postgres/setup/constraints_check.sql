-- ***************** PARTIES *******************

-- The parties table only has an id field that is automatically
-- generated, so there is no point in trying to test the
-- constraints.
INSERT INTO "parties" values(default); -- id: 1
INSERT INTO "parties" values(default); -- id: 2
INSERT INTO "parties" values(default); -- id: 3
INSERT INTO "parties" values(default); -- id: 4
INSERT INTO "parties" values(default); -- id: 5
INSERT INTO "parties" values(default); -- id: 6
INSERT INTO "parties" values(default); -- id: 7
INSERT INTO "parties" values(default); -- id: 8
INSERT INTO "parties" values(default); -- id: 9
INSERT INTO "parties" values(default); -- id: 10
INSERT INTO "parties" values(default); -- id: 11
INSERT INTO "parties" values(default); -- id: 12
INSERT INTO "parties" values(default); -- id: 13

-- //// --> ON DELETE RESTRICT check
INSERT INTO "users" values('31739742044', '88888', 'party_deletion@test.com', NULL, 6); -- id: 1
INSERT INTO "companies" values('59905452000165', 'Austrian Travel', 7); -- id: 1

-- both these deletions should fail
DELETE FROM "users" WHERE cpf='31739742044';
DELETE FROM "companies" WHERE cnpj='59905452000165';
-- ////

-- //// --> ON DELETE SET NULL check
INSERT INTO "in_contract" values(12, 13);
DELETE FROM "parties" WHERE id=12;
-- main_party field should be null
SELECT * FROM "in_contract" WHERE secondary_party=13;
-- ////

-- ***************** USERS *******************
-- //// --> null checks
-- cpf
INSERT INTO "users" values (NULL, '111111111', 'test@test.com', NULL, 1);
-- rg
INSERT INTO "users" values ('35790497802', NULL, 'test@test.com', NULL, 1);
-- email
INSERT INTO "users" values ('35790497802', '11111111', NULL, NULL, 1);
-- party
INSERT INTO "users" values ('35790497802', '11111111', 'test@test.com', NULL, NULL);
-- //// 

-- //// --> unique checks
-- cpf
INSERT INTO "users" values ('99635351003', '111111111', 'test23@test.com', NULL, 1); -- id: 2
INSERT INTO "users" values ('99635351003', '2222222222', 'test24@test.com', NULL, 1);
-- rg
INSERT INTO "users" values ('35790497802', '11111', 'test25@test.com', NULL, 1); -- id: 3
INSERT INTO "users" values ('18267186050', '11111', 'test26@test.com', NULL, 1);
-- email
INSERT INTO "users" values ('65081101010', '22222', 'test27@test.com', NULL, 1); -- id: 4
INSERT INTO "users" values ('86932516004', '33333', 'test28@test.com', NULL, 1);
-- party
INSERT INTO "users" values ('92530698058', '44444', 'test29@test.com', NULL, 1); -- id: 5
INSERT INTO "users" values ('31739742044', '55555', 'test30@test.com', NULL, 1);
-- //// 

-- //// --> references checks
INSERT INTO "users" values ('02415838020', '66666', NULL, 'test28@test.com', 999);
-- //// 

-- //// --> valid cpf checks
INSERT INTO "users" values ('11111111111', '77777777', 'test31@test.com', NULL, 1); -- invalid
INSERT INTO "users" values ('35790497803', '88888888', 'test32@test.com', NULL, 2); -- invalid
-- //// 

-- //// --> ON DELETE CASCADE
INSERT INTO "users" ('87606458065', '978798987', 'user_deletion@test.com', NULL, 8); -- id: 6
INSERT INTO "companies" ('94545234000168', 'Disnye', 9); -- id: 2
INSERT INTO "represents" values(6, 2);
-- ////

-- ***************** COMPANIES *******************
-- //// --> null checks
-- cnpj
INSERT INTO "companies" values (NULL, 'Monsters INC', 3);
-- name
INSERT INTO "companies" values ('14479725000119', NULL, 4);
-- ////

-- //// --> unique checks
-- cnpj
INSERT INTO "companies" values ('14479725000119', 'SmartFact', 3); -- id: 3
INSERT INTO "companies" values ('14479725000119', 'Impressive', 4);
-- party
INSERT INTO "companies" values('86436965000147', 'Divan Psicologia', 5); -- id: 4
INSERT INTO "companies" values('63402193000127', 'Divan Psicologia', 5);
-- ////

-- //// --> referencs checks
-- party
INSERT INTO "companies" values('92425920000170', 'Divan Psicologia', 999);
-- ////

-- //// --> valid cnpj checks
INSERT INTO "companies" values('92425920000171', 'Divan Psicologia', 999);
-- ////

-- //// --> ON DELETE CASCADE check
INSERT INTO "users" values('23468444036', '91919849', 'company_deletion@test.com', NULL, 10); -- id: 7
INSERT INTO "companies" values('92425920000170', 'Divan Psicologia', 11); -- id: 5
INSERT INTO "company_docs" values(5, 'text for doc');
INSERT INTO "company_segments" values(5, 'travel');
INSERT INTO "represents" values(7, 5);
DELETE FROM "companies" WHERE id = 5;

-- all these selects should return empty
SELECT * FROM "company_docs" WHERE company_id = 5;
SELECT * FROM "company_segments" WHERE company_id = 5;
SELECT * FROM "represents" WHERE company_id = 5;
-- ////

-- ***************** COMPANY_DOCS *******************
-- //// --> null checks
-- company_id
INSERT INTO "company_docs" values(NULL, 'text for doc');
-- doc_b64
INSERT INTO "company_docs" values(1, NULL);
-- ////

-- //// --> referencs checks
-- party
INSERT INTO "company_docs" values(9999, 'Divan Psicologia');
-- ////

-- ***************** COMPANY_SEGMENTS *******************
-- //// --> null checks
-- company_id
INSERT INTO "company_segments" values(NULL, 'travel');
-- segment
INSERT INTO "company_segments" values(1, NULL);
-- ////

-- //// --> referencs checks
-- party
INSERT INTO "company_segments" values(9999, 'travel');
-- ////

-- ***************** REPRESENTS *******************
-- //// --> null checks
-- user_id
INSERT INTO "represents" values(NULL, 1);
-- company_id
INSERT INTO "represents" values(1, NULL);
-- ////

-- //// --> referencs checks
-- user_id
INSERT INTO "represents" values(9999, 1);
-- company_id
INSERT INTO "represents" values(1, 9999);
-- ////

-- ***************** IN_CONTRACT *******************
-- //// --> null checks
-- main_party
INSERT INTO "in_contract" values(NULL, 1);
-- secondary_party
INSERT INTO "in_contract" values(1, NULL);
-- ////

-- //// --> references checks
-- main_pary
INSERT INTO "in_contract" values(9999, 1);
-- secondary_party
INSERT INTO "in_contract" values(1, 9999);
-- ////

-- //// --> different parties checks
INSERT INTO "in_contract" values(1, 1);
-- ////

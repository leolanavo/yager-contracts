-- ***************** PARTIES *******************

-- The parties table only has an id field that is automatically
-- generated, so there is no point in trying to test the
-- constraints.
INSERT INTO "parties" values(1);
INSERT INTO "parties" values(2);
INSERT INTO "parties" values(3); 
INSERT INTO "parties" values(4); 
INSERT INTO "parties" values(5); 
INSERT INTO "parties" values(6); 
INSERT INTO "parties" values(7); 
INSERT INTO "parties" values(8); 
INSERT INTO "parties" values(9); 
INSERT INTO "parties" values(10);
INSERT INTO "parties" values(11);
INSERT INTO "parties" values(12);
INSERT INTO "parties" values(13);

-- //// --> ON DELETE RESTRICT check
INSERT INTO "users" values(1, '31739742044', '88888', 'party_deletion@test.com', 'Luiz', NULL, 6); -- id: 1
INSERT INTO "companies" values(1, '59905452000165', 'Austrian Travel', 7); -- id: 1

-- both these deletions should fail
DELETE FROM "parties" WHERE id=6;
DELETE FROM "parties" WHERE id=7;
-- ////

-- //// --> ON DELETE SET NULL check
INSERT INTO "in_contract" values(default, 12, 13);
DELETE FROM "parties" WHERE id=12;
-- main_party field should be null
SELECT * FROM "in_contract" WHERE secondary_party=13;
-- ////

-- ***************** USERS *******************
-- //// --> null checks
-- cpf
INSERT INTO "users" values (default, NULL, '111111111', 'test@test.com', 'Luiz', NULL, 1);
-- rg
INSERT INTO "users" values (default, '35790497802', NULL, 'test@test.com', 'Luiz', NULL, 1);
-- email
INSERT INTO "users" values (default, '35790497802', '11111111', NULL, 'Luiz', NULL, 1);
-- name
INSERT INTO "users" values (default, '35790497802', '11111111', 'test@test.com', 'Luiz', NULL, 1);
-- party
INSERT INTO "users" values (default, '35790497802', '11111111', 'test@test.com', 'Luiz', NULL, NULL);
-- //// 

-- //// --> unique checks
-- cpf
INSERT INTO "users" values (2, '99635351003', '111111111', 'test23@test.com', 'Luiz', NULL, 1);
INSERT INTO "users" values (default, '99635351003', '2222222222', 'test24@test.com', 'Luiz', NULL, 2);
-- email
INSERT INTO "users" values (3, '65081101010', '22222', 'test25@test.com', 'Luiz', NULL, 2);
INSERT INTO "users" values (default, '86932516004', '33333', 'test25@test.com', 'Luiz', NULL, 3);
-- party
INSERT INTO "users" values (4, '92530698058', '44444', 'test26@test.com', 'Luiz', NULL, 3);
INSERT INTO "users" values (default, '61072157004', '55555', 'test27@test.com', 'Luiz', NULL, 3);
-- //// 

-- //// --> references checks
INSERT INTO "users" values (default, '02415838020', '66666', 'test28@test.com', 'Luiz', NULL, 999);
-- //// 

-- //// --> valid cpf checks
INSERT INTO "users" values (default, '11111111111', '77777777', 'test31@test.com', 'Luiz', NULL, 12); -- invalid
INSERT INTO "users" values (default, '35790497803', '88888888', 'test32@test.com', 'Luiz', NULL, 13); -- invalid
-- //// 

-- //// --> ON DELETE CASCADE
INSERT INTO "users" values (6, '87606458065', '978798987', 'user_deletion@test.com', 'Luiz', NULL, 8); -- id: 6
INSERT INTO "companies" values (default, '94545234000168', 'Disnye', 'Luiz', 9); -- id: 2
INSERT INTO "represents" values (6, 2);
DELETE FROM "users" WHERE id=6;
SELECT * FROM "represents" WHERE user_id="6";
-- ////

-- ***************** COMPANIES *******************
-- //// --> null checks
-- cnpj
INSERT INTO "companies" values (default, NULL, 'Monsters INC', 3);
-- name
INSERT INTO "companies" values (default, '14479725000119', NULL, 4);
-- ////

-- //// --> unique checks
-- cnpj
INSERT INTO "companies" values (3, '14479725000119', 'SmartFact', 3); -- id: 3
INSERT INTO "companies" values (default, '14479725000119', 'Impressive', 4);
-- party
INSERT INTO "companies" values(4, '86436965000147', 'Divan Psicologia', 5); -- id: 4
INSERT INTO "companies" values(default, '63402193000127', 'Divan Psicologia', 5);
-- ////

-- //// --> referencs checks
-- party
INSERT INTO "companies" values(default, '92425920000170', 'Divan Psicologia', 999);
-- ////

-- //// --> valid cnpj checks
INSERT INTO "companies" values(default, '92425920000171', 'Divan Psicologia', 999);
-- ////

-- //// --> ON DELETE CASCADE check
INSERT INTO "users" values(7, '23468444036', '91919849', 'company_deletion@test.com', 'Luiz', NULL, 10); -- id: 7
INSERT INTO "companies" values(5, '92425920000170', 'Divan Psicologia', 11); -- id: 5
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
INSERT INTO "in_contract" values(default, NULL, 1);
-- secondary_party
INSERT INTO "in_contract" values(default, 1, NULL);
-- ////

-- //// --> references checks
-- main_pary
INSERT INTO "in_contract" values(default, 9999, 1);
-- secondary_party
INSERT INTO "in_contract" values(default, 1, 9999);
-- ////

-- //// --> different parties checks
INSERT INTO "in_contract" values(default, 1, 1);
-- ////

-- parties
INSERT INTO "parties" values(1); -- id: 1
INSERT INTO "parties" values(2); -- id: 2
INSERT INTO "parties" values(3); -- id: 3
INSERT INTO "parties" values(4); -- id: 4
INSERT INTO "parties" values(5); -- id: 5
INSERT INTO "parties" values(6); -- id: 6

-- users
INSERT INTO "users" values(1, '82246539005', '3895229406', 'test1@test.com', NULL, 1);
INSERT INTO "users" values(2, '42309164003', '61651968498', 'test2@test.com', NULL, 2);
INSERT INTO "users" values(3, '41330958047', '16516515616', 'test3@test.com', NULL, 3);

-- companies
INSERT INTO "companies" values(1, '78589118000194', 'Disneylândia', 4);
INSERT INTO "companies" values(2, '28594513000197', 'Australian Migration', 5);
INSERT INTO "companies" values(3, '78005752000132', 'Purple Lights', 6);

-- company_docs
INSERT INTO "company_docs" values(1, 'text_for_doc');
INSERT INTO "company_docs" values(2, 'text_for_doc');
INSERT INTO "company_docs" values(3, 'text_for_doc');

-- company_segments
INSERT INTO "company_segments" values(1, 'entertainment');
INSERT INTO "company_segments" values(2, 'travel');
INSERT INTO "company_segments" values(2, 'tourism');
INSERT INTO "company_segments" values(3, 'housing');
INSERT INTO "company_segments" values(3, 'renovation');

-- represents
INSERT INTO "represents" values(1, 1);
INSERT INTO "represents" values(1, 2);
INSERT INTO "represents" values(2, 2);

-- in_contract
INSERT INTO "in_contract" values(1, 3);
INSERT INTO "in_contract" values(2, 5);
INSERT INTO "in_contract" values(5, 4);
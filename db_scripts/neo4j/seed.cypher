//Create users

CREATE (:User {id:1, name:'Victor', party_id:1, cpf:'82246539005', rating: -1});
CREATE (:User {id:2, name:'Lana', party_id:2, cpf:'42309164003', rating: 1});
CREATE (:User {id:3, name:'Scholl', party_id:3, cpf:'41330958047', rating: 2});

//Create companies

CREATE (:Company {id:1, name:'Disneylândia', party_id:4, cnpj:'78589118000194', rating: 3});
CREATE (:Company{id:2, name:'Australian Migration', party_id:5, cnpj:'28594513000197', rating: -2});
CREATE (:Company {id:3, name:'Purple Lights', party_id:6, cnpj:'78005752000132', rating: -3});

//Create segments

CREATE(:Segment {name: 'entertainment'});
CREATE(:Segment {name: 'travel'});
CREATE(:Segment {name: 'tourism'});
CREATE(:Segment {name: 'housing'});
CREATE(:Segment {name: 'renovation'});

//Create IN_CONTRACT relationships

MATCH (a), (b)
WHERE a.party_id = 1 AND b.party_id = 3
CREATE (a)-[r:IN_CONTRACT]->(b)
RETURN type(r);

MATCH (a), (b)
WHERE a.party_id = 2 AND b.party_id = 5
CREATE (a)-[r:IN_CONTRACT]->(b)
RETURN type(r);

MATCH (a), (b)
WHERE a.party_id = 5 AND b.party_id = 4
CREATE (a)-[r:IN_CONTRACT]->(b)
RETURN type(r);

MATCH (a), (b)
WHERE a.party_id = 4 AND b.party_id = 6
CREATE (a)-[r:IN_CONTRACT]->(b)
RETURN type(r);

MATCH (a), (b)
WHERE a.party_id = 2 AND b.party_id = 1
CREATE (a)-[r:IN_CONTRACT]->(b)
RETURN type(r);

MATCH (a), (b)
WHERE a.party_id = 6 AND b.party_id = 3
CREATE (a)-[r:IN_CONTRACT]->(b)
RETURN type(r);

//Create COMPANY_SEGMENT relationships

MATCH (a:Company), (b:Segment)
WHERE a.id = 1 AND b.name = 'entertainment'
CREATE (a)-[r:COMPANY_SEGMENT]->(b)
RETURN type(r);

MATCH (a:Company), (b:Segment)
WHERE a.id = 2 AND b.name = 'travel'
CREATE (a)-[r:COMPANY_SEGMENT]->(b)
RETURN type(r);

MATCH (a:Company), (b:Segment)
WHERE a.id = 2 AND b.name = 'tourism'
CREATE (a)-[r:COMPANY_SEGMENT]->(b)
RETURN type(r);

MATCH (a:Company), (b:Segment)
WHERE a.id = 3 AND b.name = 'housing'
CREATE (a)-[r:COMPANY_SEGMENT]->(b)
RETURN type(r);

MATCH (a:Company), (b:Segment)
WHERE a.id = 3 AND b.name = 'renovation'
CREATE (a)-[r:COMPANY_SEGMENT]->(b)
RETURN type(r);
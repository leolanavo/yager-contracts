//Return all entertenment companies related to Lana

MATCH (lana:User {name: "Lana"}) - [:IN_CONTRACT*1..5] -> (c:Company) - [:COMPANY_SEGMENT] -> (s:Segment {name: 'entertainment'})
RETURN c.name as Company;

//Return the min path between Lana and an entertainment company

MATCH p = ((lana:User {name: "Lana"}) - [:IN_CONTRACT*2..5] -> (c:Company) - [:COMPANY_SEGMENT] -> (s:Segment {name: 'entertainment'}))
RETURN p as Path;

//Return the entertenment company with more contracts related to Lana

MATCH (lana:User {name: "Lana"}) - [:IN_CONTRACT*1..5] -> (c:Company) - [:COMPANY_SEGMENT] -> (s:Segment {name: 'entertainment'})
WITH c
MATCH (c) - [r:IN_CONTRACT] - (d)
WITH c, count(*) as numberOfContracts
WITH c, MAX(numberOfContracts) as max_contracts
RETURN c.name as Company, max_contracts as `Number of Contracts`;

//Return the best rated entertainment company related to Lana 

MATCH (lana:User {name: "Lana"}) - [:IN_CONTRACT*1..5] -> (c:Company) - [:COMPANY_SEGMENT] -> (s:Segment {name: 'entertainment'})
RETURN c.name as Company, MAX(c.rating) as Rating;

//Return a list of all companies related to Lana and its respective segments

MATCH (lana:User {name: "Lana"}) - [:IN_CONTRACT*1..5] -> (c:Company), (c) - [:COMPANY_SEGMENT] -> (s:Segment)
return c.name as Company, collect(s.name) as Segments;

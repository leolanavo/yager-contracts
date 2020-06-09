-- todas as empresas de um certo ramo, aqui usaremos 'tourism'
SELECT cnpj, name 
FROM "company_segments" AS s INNER JOIN "companies" AS c 
ON c.id = s.company_id WHERE s.segment = 'tourism';

-- usuário que possui o maior número de contratos
SELECT u.id, cpf, COUNT(cpf) AS contracts 
FROM "users" AS u INNER JOIN "in_contract" AS ic ON u.party_id = ic.main_party
GROUP BY cpf
ORDER BY contracts DESC
LIMIT 1;

-- usuário que representa mais empresas
SELECT cpf, COUNT(r.user_id) AS representations
FROM "users" AS u INNER JOIN "represents" AS r ON u.id = r.user_id 
GROUP BY cpf
ORDER BY representations DESC
LIMIT 1;

-- quais empresas um usuário com id=1 representa
SELECT cnpj, name 
FROM "companies" AS c INNER JOIN "represents" AS r ON c.id = r.company_id
INNER JOIN "users" AS u ON u.id = r.user_id
WHERE u.id = 1;

-- quais contratos são de empresas que não possuem representantes, para efeito desta query, irei
-- considerar somente o main_party
SELECT cnpj, name 
FROM "companies" AS c INNER JOIN "in_contract" AS ic ON ic.main_party = c.party_id
WHERE c.id NOT IN (
  SELECT DISTINCT company_id FROM "represents"
);


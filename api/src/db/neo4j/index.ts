import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  'bolt://neo4j:7687',
  neo4j.auth.basic('neo4j', 'yager'),
);

const session = driver.session({
  defaultAccessMode: "WRITE",
  database: 'yager'
});

export default {
  driver,
  session
};
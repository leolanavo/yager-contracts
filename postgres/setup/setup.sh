#!/bin/sh

psql -U yager -f /usr/src/scripts/setup/cpf_functions.sql
psql -U yager -f /usr/src/scripts/setup/cnpj_functions.sql
psql -U yager -f /usr/src/scripts/setup/creation.sql
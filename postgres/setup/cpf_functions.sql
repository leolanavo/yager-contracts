CREATE OR REPLACE FUNCTION sumCPF(cpf VARCHAR(11), digit_offset INTEGER)
RETURNS INTEGER AS $$
DECLARE 
  index INTEGER := 1;
  sum INTEGER := 0;
  result INTEGER;
  dig_temp INTEGER;
BEGIN
  WHILE (index <= 9) LOOP
    dig_temp := CAST(substring(cpf, index, 1) AS INTEGER);
    sum := sum + dig_temp * ((11 - index) + digit_offset);
    index := index + 1;
  END LOOP;

  result := 11 - (sum % 11);
  IF result > 9 THEN
    result := 0;
  END IF;

  RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION checkAllEquals(cpf VARCHAR(11))
RETURNS BOOLEAN AS $$
DECLARE
  index INTEGER := 1;
  allEquals BOOLEAN := TRUE;
BEGIN
  WHILE (index <= 10 AND allEquals) LOOP
    IF SUBSTRING(cpf, index, 1) <> SUBSTRING(cpf, index + 1, 1) THEN
      allEquals := FALSE;
    END IF;
    index := index + 1;
  END LOOP;

  RETURN allEquals;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validateCPF(cpf VARCHAR(11))
RETURNS BOOLEAN AS $$
DECLARE 
  dig1 INTEGER := CAST(SUBSTRING(cpf, 10, 1) AS INTEGER);
  dig2 INTEGER := CAST(SUBSTRING(cpf, 11, 1) AS INTEGER);
  dig1_calc INTEGER := sumCPF(cpf, 0);
  dig2_calc INTEGER := sumCPF(cpf, 1);
  allEquals BOOLEAN := checkAllEquals(cpf);
BEGIN
  RETURN NOT allEquals AND dig1 = dig1_calc AND dig2 = dig2_calc;
END;
$$ LANGUAGE plpgsql;
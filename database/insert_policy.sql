DROP POLICY IF EXISTS "insercion publica" ON universidad_carreras;

CREATE POLICY "insercion publica" ON universidad_carreras
  FOR INSERT TO anon
  WITH CHECK (
    length(trim(nombre_universidad)) > 0
    AND length(trim(carrera_profesional)) > 0
  );

CREATE TABLE IF NOT EXISTS universidad_carreras (
  id SERIAL PRIMARY KEY,
  nombre_universidad VARCHAR(150) NOT NULL,
  carrera_profesional VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (nombre_universidad, carrera_profesional)
);

ALTER TABLE universidad_carreras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lectura publica" ON universidad_carreras
  FOR SELECT TO anon USING (true);

INSERT INTO universidad_carreras (nombre_universidad, carrera_profesional) VALUES
  ('Universidad César Vallejo', 'Derecho'),
  ('Universidad César Vallejo', 'Psicología'),
  ('Universidad César Vallejo', 'Ingeniería de Sistemas'),
  ('Universidad César Vallejo', 'Administración de Empresas'),
  ('Universidad César Vallejo', 'Contabilidad'),
  ('Universidad César Vallejo', 'Enfermería'),
  ('Universidad César Vallejo', 'Arquitectura'),
  ('Universidad César Vallejo', 'Ingeniería Civil'),
  ('Universidad César Vallejo', 'Marketing')
ON CONFLICT (nombre_universidad, carrera_profesional) DO NOTHING;

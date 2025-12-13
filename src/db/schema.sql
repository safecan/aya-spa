-- schema.sql
CREATE TABLE IF NOT EXISTS guests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  food_intolerance TEXT NOT NULL,
  bus_location TEXT,
  bus_schedule TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

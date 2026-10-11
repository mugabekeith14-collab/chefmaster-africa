
CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT 'Other',
  ingredients TEXT NOT NULL,
  steps TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

DATABASE = SQLite3::Database.new("/Users/hilarysk/Code/2015-03-08-tabs-database/database/slideshow.db")

DATABASE.results_as_hash = true

DATABASE.execute("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, general_info TEXT, where_to_buy TEXT, technical_specs TEXT)")


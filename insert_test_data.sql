-- insert_test_data.sql - Insert sample books into `berties_books` database

USE berties_books;

INSERT INTO books (name, price) VALUES
	('Brighton Rock', 20.25),
	('Brave New World', 25.00),
	('Animal Farm', 12.99);

-- Insert test user 'gold' with password 'smiths' (hashed)
INSERT INTO users (username, first_name, last_name, email, hashedPassword) VALUES
  ('gold', 'Gold', 'Smith', 'gold@example.com', '$2b$10$Jdjt6lZh36qOqedlpY9Du.QOLMmFaiXjBy2snESku2cO0Gi2lNmbW');
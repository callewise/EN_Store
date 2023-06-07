-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS en_store_test_db;
CREATE USER IF NOT EXISTS 'en_store_test'@'localhost' IDENTIFIED BY 'en_store_test_pwd001';
GRANT ALL PRIVILEGES ON `en_store_test_db`.* TO 'en_store_test'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'en_store_test'@'localhost';
FLUSH PRIVILEGES;

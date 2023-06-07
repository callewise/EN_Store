-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS en_store_dev_db;
CREATE USER IF NOT EXISTS 'en_store_dev'@'localhost' IDENTIFIED BY 'en_store_dev_pwd001';
GRANT ALL PRIVILEGES ON `en_store_dev_db`.* TO 'en_store_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'en_store_dev'@'localhost';
FLUSH PRIVILEGES;

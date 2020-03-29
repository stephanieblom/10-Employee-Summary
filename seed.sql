DROP DATABASE IF EXISTS employee_summary;

CREATE DATABASE employee_summary;
USE employee_summary;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NULL,
PRIMARY KEY(id)
);


CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NULL,
salary DECIMAL(10,2) NULL,
department_id INT NULL,
PRIMARY KEY(id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
role_id INT NULL,
manager_id INT NULL,
PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("Logistics");

INSERT INTO role (title, salary, department_id)
VALUES ("Jr. Sales Rep","50000.00", "1");
INSERT INTO role (title, salary, department_id)
VALUES ("Sr. Sales Rep","65000.00", "1");
INSERT INTO role (title, salary, department_id)
VALUES ("Director of Sales","80000.00", "1");
INSERT INTO role (title, salary, department_id)
VALUES ("Jr. Engineer","50000.00", "2");
INSERT INTO role (title, salary, department_id)
VALUES ("Sr. Engineer","70000.00", "2");
INSERT INTO role (title, salary, department_id)
VALUES ("Chief Technology Officer","180000.00", "2");
INSERT INTO role (title, salary, department_id)
VALUES ("Brand Coordinator","50000.00", "3");
INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Director","68000.00", "3");
INSERT INTO role (title, salary, department_id)
VALUES ("Buyer","47000.00", "4");
INSERT INTO role (title, salary, department_id)
VALUES ("Commodity Manager","65000.00", "4");
INSERT INTO role (title, salary, department_id)
VALUES ("Director of Logistics","68000.00", "4");
INSERT INTO role (title, salary, department_id)
VALUES ("Chief Procurement Officer","200000.00", "4");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dan", "Scott", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "Brown", 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sara", "Don", 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Ross", 4, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Maureen", "Scott", 5, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dale", "Barns", 6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sydney", "Rays", 7, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Paula", "Scarth", 8, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Malone", 9, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwane", "Johnson", 10, 11);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Martha", "Stweart", 11, 12);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shania", "Twain", 12, NULL);

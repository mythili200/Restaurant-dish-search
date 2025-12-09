CREATE DATABASE IF NOT EXISTS restaurant_db1;
USE restaurant_db1;

CREATE TABLE restaurants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  city VARCHAR(255)
);

CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT,
  dish_name VARCHAR(255),
  price INT,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menu_item_id INT,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);


INSERT INTO restaurants (name, city) VALUES
('Hyderabadi Spice House', 'Hyderabad'),
('Biryani Palace', 'Chennai'),
('Paradise Biryani', 'Hyderabad'),
('Royal Biryani', 'Bangalore'),
('Tandoori Nights', 'Delhi');


INSERT INTO menu_items (restaurant_id, dish_name, price) VALUES
(1, 'Chicken Biryani', 220),
(1, 'Mutton Biryani', 300),
(1, 'Veg Biryani', 150),
(2, 'Chicken Biryani', 180),
(2, 'Paneer Biryani', 200),
(3, 'Chicken Biryani', 250),
(3, 'Mutton Biryani', 320),
(4, 'Chicken Biryani', 210),
(4, 'Egg Biryani', 160),
(5, 'Mutton Biryani', 310),
(5, 'Chicken Biryani', 230);


INSERT INTO orders (menu_item_id) VALUES
(1),(1),(1),(1),(1),(1),(1),(1),(1),(1),   
(2),(2),(2),(2),(2),(2),                  
(3),(3),(3),(3),(3),                        

(4),(4),(4),(4),(4),(4),(4),(4),(4),(4),(4),(4),
(5),(5),(5),(5),(5),                              

(6),(6),(6),(6),(6),(6),(6),(6),(6),(6),(6),     
(7),(7),(7),(7),(7),(7),(7),                     


(8),(8),(8),(8),(8),(8),(8),(8),(8),(8),(8),     
(9),(9),(9),(9),(9),(9),                         


(10),(10),(10),(10),(10),(10),(10),              
(11),(11),(11),(11),(11),(11),(11),(11),(11),(11); 

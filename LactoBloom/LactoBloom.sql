-- DROP DATABASE LactoBloom;
CREATE DATABASE LactoBloom;

USE LactoBloom;

CREATE TABLE Role (
    Role_id INT AUTO_INCREMENT PRIMARY KEY,
    Role_name VARCHAR(50) NOT NULL
);

CREATE TABLE User (
    User_id INT AUTO_INCREMENT PRIMARY KEY,
    Full_name NVARCHAR(100) NOT NULL,
    Role_id INT,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Phone VARCHAR(15),
    Address TEXT,
    Point INT DEFAULT 0,
    FOREIGN KEY (Role_id) REFERENCES Role(Role_id)
);

CREATE TABLE Chat (
    Chat_id INT AUTO_INCREMENT PRIMARY KEY,
    User_id INT,
    Staff_id INT,
    Message TEXT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (User_id) REFERENCES User(User_id),
    FOREIGN KEY (Staff_id) REFERENCES User(User_id)
);

CREATE TABLE BlogCategory (
    Blog_category_id INT AUTO_INCREMENT PRIMARY KEY,
    Blog_category_name VARCHAR(50) NOT NULL
);

CREATE TABLE Blog (
    Blog_id INT AUTO_INCREMENT PRIMARY KEY,
    Blog_category_id INT,
    User_id INT,
    Title NVARCHAR(255) NOT NULL,
    Content TEXT NOT NULL,
    Publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (User_id) REFERENCES User(User_id),
    FOREIGN KEY (Blog_category_id) REFERENCES BlogCategory(Blog_category_id)
);

CREATE TABLE Brand (
    Brand_id INT AUTO_INCREMENT PRIMARY KEY,
    Brand_name VARCHAR(100) NOT NULL
);

CREATE TABLE Category (
    Category_id INT AUTO_INCREMENT PRIMARY KEY,
    Category_name NVARCHAR(100) NOT NULL
);

CREATE TABLE Product (
    Product_id INT AUTO_INCREMENT PRIMARY KEY,
    Product_name NVARCHAR(100) NOT NULL,
    Brand_id INT,
    Category_id INT,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    Discount DECIMAL(5, 2) DEFAULT 0,
    Stock INT NOT NULL,
    FOREIGN KEY (Brand_id) REFERENCES Brand(Brand_id),
    FOREIGN KEY (Category_id) REFERENCES Category(Category_id)
);

CREATE TABLE Review (
    Review_id INT AUTO_INCREMENT PRIMARY KEY,
    User_id INT,
    Product_id INT,
    Rate INT CHECK (Rate BETWEEN 1 AND 5),
    Comment TEXT,
    Review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (User_id) REFERENCES User(User_id),
    FOREIGN KEY (Product_id) REFERENCES Product(Product_id)
);

CREATE TABLE Image (
    Image_id INT AUTO_INCREMENT PRIMARY KEY,
    Product_id INT,
    Image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (Product_id) REFERENCES Product(Product_id)
);

CREATE TABLE Wishlist (
    Wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    User_id INT,
    Product_id INT,
    FOREIGN KEY (User_id) REFERENCES User(User_id),
    FOREIGN KEY (Product_id) REFERENCES Product(Product_id)
);

CREATE TABLE Voucher (
    Voucher_id INT AUTO_INCREMENT PRIMARY KEY,
    User_id INT,
    Discount DECIMAL(5, 2) NOT NULL,
    Start_date DATE NOT NULL,
    Expiration_date DATE NOT NULL,
    Status BIT,
    FOREIGN KEY (User_id) REFERENCES User(User_id)
);

CREATE TABLE `Order` (
    Order_id INT AUTO_INCREMENT PRIMARY KEY,
    User_id INT,
    Full_name NVARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    Address TEXT NOT NULL,
    Voucher_id INT,
    Shipping_fee DECIMAL(10, 2) NOT NULL,
    Total_price DECIMAL(10, 2) NOT NULL,
    Order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    Payment_method VARCHAR(50) NOT NULL,
    FOREIGN KEY (User_id) REFERENCES User(User_id),
    FOREIGN KEY (Voucher_id) REFERENCES Voucher(Voucher_id)
);

CREATE TABLE OrderDetail (
    Order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    Order_id INT,
    Product_id INT,
    Quantity INT NOT NULL,
    Total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (Order_id) REFERENCES `Order`(Order_id),
    FOREIGN KEY (Product_id) REFERENCES Product(Product_id)
);

-- Insert data into tables

-- Role table
INSERT INTO Role (Role_name) VALUES 
('Member'), ('Admin'), ('Staff');

-- User table
INSERT INTO User (Full_name, Role_id, Email, Password, Phone, Address, Point) VALUES
('John Doe', 1, 'john.doe@example.com', '123', '1234567890', '123 Main St', 10),
('Jane Smith', 2, 'jane.smith@example.com', '123', '0987654321', '456 Elm St', 20),
('Michael Brown', 3, 'michael.brown@example.com', '123', '1231231234', '789 Maple St', 30),
('Emily Davis', 1, 'emily.davis@example.com', '123', '9879879876', '101 Oak St', 40),
('Chris Wilson', 2, 'chris.wilson@example.com', '123', '6546546543', '102 Pine St', 50),
('Amanda Taylor', 3, 'amanda.taylor@example.com', '123', '3213213211', '103 Birch St', 60),
('Joshua Moore', 1, 'joshua.moore@example.com', '123', '5555555555', '104 Cedar St', 70),
('Megan Jackson', 2, 'megan.jackson@example.com', '123', '4444444444', '105 Spruce St', 80),
('Matthew White', 3, 'matthew.white@example.com', '123', '3333333333', '106 Fir St', 90),
('Laura Harris', 1, 'laura.harris@example.com', '123', '2222222222', '107 Ash St', 100);

-- Chat table
INSERT INTO Chat (User_id, Staff_id, Message, Timestamp) VALUES
(1, 3, 'I need help finding the right milk for my baby.', '2023-05-10 11:00:00'),
(3, 1, 'Sure, what age is your baby?', '2023-05-10 11:01:00'),
(1, 3, 'She is 6 months old.', '2023-05-10 11:02:00'),
(3, 1, 'We have a great selection for 0-1 year olds. Would you like some recommendations?', '2023-05-10 11:03:00'),
(1, 3, 'Yes, please. That would be great.', '2023-05-10 11:04:00'),

(4, 6, 'Hi, I have a question about my recent order.', '2023-05-11 09:00:00'),
(6, 4, 'Sure, how can I help?', '2023-05-11 09:01:00'),
(4, 6, 'I received the wrong product.', '2023-05-11 09:02:00'),
(6, 4, 'I apologize for the mistake. Could you please provide your order number?', '2023-05-11 09:03:00'),
(4, 6, 'The order number is 12345.', '2023-05-11 09:04:00'),
(6, 4, 'Thank you. I will look into this and get back to you shortly.', '2023-05-11 09:05:00'),

(7, 9, 'Can I pre-order a product that is out of stock?', '2023-05-12 14:00:00'),
(9, 7, 'Yes, you can. Which product are you interested in?', '2023-05-12 14:01:00'),
(7, 9, 'I want to pre-order the Similac Advance for 1-2 years.', '2023-05-12 14:02:00'),
(9, 7, 'I can help with that. How many units would you like to pre-order?', '2023-05-12 14:03:00'),
(7, 9, 'I would like to pre-order 2 units.', '2023-05-12 14:04:00'),
(9, 7, 'Your pre-order has been placed. You will be notified once the product is back in stock.', '2023-05-12 14:05:00'),

(10, 9, 'Do you have any discounts available?', '2023-05-13 16:00:00'),
(9, 10, 'Yes, we have several discount vouchers available. How can I assist you?', '2023-05-13 16:01:00'),
(10, 9, 'I am looking for a 10% discount voucher.', '2023-05-13 16:02:00'),
(9, 10, 'I can provide you with a 10% discount voucher. The code is DISC10B.', '2023-05-13 16:03:00'),
(10, 9, 'Thank you so much!', '2023-05-13 16:04:00'),

(4, 3, 'Can you recommend a milk for toddlers?', '2023-05-14 10:00:00'),
(3, 4, 'Of course. For toddlers over 2 years old, I recommend Similac Go & Grow or Enfamil Toddler.', '2023-05-14 10:01:00'),
(4, 3, 'Thank you, I will check them out.', '2023-05-14 10:02:00');

-- Blog table
INSERT INTO BlogCategory (Blog_category_name) VALUES
('Product Reviews'), ('Nutrition and Health'), ('Formula Feeding'), ('Baby Care'), ('Mom''s Wellbeing'), ('Others');

-- Blog table
INSERT INTO Blog (Blog_category_id, User_id, Title, Content, Publish_date) VALUES
(1, 3, 'New Product Launch', 'We are excited to announce our new product line.', '2023-05-10'),
(6, 3, 'Summer Sale', 'Get ready for our biggest summer sale yet.', '2023-06-10'),
(2, 3, 'Health Benefits of Dairy', 'Learn about the numerous health benefits of consuming dairy.', '2024-01-10'),
(2, 6, 'Sustainable Practices', 'Our commitment to sustainable practices.', '2024-02-12'),
(5, 6, 'Customer Testimonials', 'Hear from our satisfied customers.', '2023-05-18'),
(6, 6, 'Holiday Specials', 'Exclusive holiday deals just for you.', '2024-03-20'),
(6, 9, 'Behind the Scenes', 'A look behind the scenes at our production process.', '2023-12-17'),
(6, 9, 'Employee Spotlight', 'Meet some of the amazing people behind our brand.', '2024-02-23'),
(3, 9, 'Recipe Ideas', 'Delicious recipes you can make with our products.', '2024-04-01'),
(5, 3, 'Community Involvement', 'How we are giving back to the community.', '2023-05-15');

-- Brand table
INSERT INTO Brand (Brand_name) VALUES
('Similac'), ('Meiji'), ('Bubs'), ('Kid Essentials'), ('PediaSure'), 
('Nestle'), ('Aptamil'), ('Vinamilk'), ('Friso Gold');
-- ('Hipp'), ('Blackmores'), ('Abbott Grow'), ('Glico'), ('Morinaga'), ('Gerber'), ('Colos'), ('Nutifood');

-- Category table
INSERT INTO Category (Category_name) VALUES
('Sữa Mỹ'), ('Sữa Nhật'), ('Sữa Úc'), ('Sữa Châu Âu'), ('Sữa Việt Nam'), ('Sữa bầu');

-- Product table
INSERT INTO Product (Product_name, Brand_id, Category_id, Description, Price, Discount, Stock) VALUES
-- Similac products
('Sữa Similac 5G số 2 900g (6-12 tháng)', 1, 1, 'Sữa Similac 5G số 2 là sản phẩm dinh dưỡng cho bé từ 6-12 tháng đến từ thương hiệu uy tín Abbott.', 559000, 0, 50),
('Sữa Similac Total Protection 1 400g (0 - 6 tháng)', 1, 1, 'Sữa Similac Total Protection 1 là sản phẩm bổ sung dinh dưỡng hoặc thay thế bữa ăn cho trẻ 0-6 tháng tuổi bị thiếu hoặc mất sữa mẹ.', 329000, 0, 20),
('Combo 3 Sữa Similac 5G số 4 1,7kg (2-6 tuổi)', 1, 1, 'Thực phẩm bổ sung cho trẻ 2-6 tuổi: Combo Similac 4 x3', 2607000, 10, 10),
('Sữa Similac Total Protection 2 900g (6-12 tháng)', 1, 1, 'Sữa Similac Total Protection số 2 là sản phẩm bổ sung dinh dưỡng hoặc thay thế bữa ăn cho trẻ 6-12 tháng tuổi bị thiếu hoặc mất sữa mẹ.', 659000, 5, 50),
('Sữa bầu Similac Mom 900g hương Vani', 1, 6, 'Sữa bầu Similac Mom là thức uống dinh dưỡng dành cho mẹ đang mang thai và cho con bú. Với hệ dưỡng chất IQ Plus, sản phẩm cung cấp Vitamin E tự nhiên, Lutein, DHA giúp bé phát triển trí não từ trong bụng mẹ.', 455000, 0, 37),
('Similac Mom Hương Vani, 400g', 1, 6, 'Sữa bầu Similac Mom có công thức dinh dưỡng đã được chứng minh lâm sàng với nhiều lợi ích với các mẹ bầu.', 235000, 0, 61),

-- Meiji products
('Sữa Meiji Infant Formula 800g (0-12 tháng)', 2, 2, 'Sữa Meiji Infant Formula 800g (0-12 tháng) là sữa bột công thức được nhập khẩu chính hãng từ Nhật Bản. Sản phẩm dành cho trẻ sơ sinh từ 0 - 12 tháng tuổi.', 529000, 0, 15),
('Sữa Meiji Growing up Formula 800g (12-36 tháng)', 2, 2, 'Sữa Meiji Growing up Formula 800g (12-36 tháng) thuộc thương hiệu Meiji nổi tiếng hàng đầu Nhật Bản.', 465000, 5, 50),
('Sữa Meiji thanh Infant Formula Ezcube 540g (0-12 tháng)', 2, 2, 'Sữa Meiji thanh Infant Formula Ezcube 540g là sữa bột công thức dạng viên cho trẻ sơ sinh (0 - 12 tháng tuổi).', 455000, 5, 21),
('Sữa Meiji Growing up Formula Ezcube 560g (1-3 tuổi)', 2, 2, 'Sản phẩm dinh dưỡng công thức cho trẻ từ 1-3 tuổi: Meiji 1-3 years old Growing up Formula Ezcube 560g.', 399000, 0, 34),
('Sữa bầu Meiji mama 350g', 2, 6, 'Sữa bầu Meiji Mama Milk 350g cung cấp các chất dinh dưỡng cần thiết hỗ trợ sức khỏe cho người mẹ đang mang thai và đang cho con bú cũng như sức khỏe và sự tăng trưởng của thai nhi và trẻ sơ sinh. Sản phẩm có chứa không chỉ các chất dinh dưỡng cơ bản như là protein, chất béo, và carbohydrates, mà còn cả các loại vitamin và khoáng chất bao gồm sắt, can-xi, kẽm, axit folic, những thành phần thường khó hấp thụ qua đường ăn uống trong quá trình mang thai và dưỡng sức.', 219000, 5, 120),

-- Bubs products
('Sữa Bubs Supreme số 3 800g (12-36 tháng)', 3, 3, 'Bubs Supreme là dòng sản phẩm cao cấp nhất của BUBS dành cho trẻ từ 12-36 tháng tuổi.', 975000, 0, 43),
('Combo 2 Sữa Bubs Supreme Junior Nutrition 800g (3-12 tuổi)', 3, 3, 'Bubs Supreme Junior Nutrition là dòng sản phẩm cao cấp nhất của BUBS dành cho trẻ từ 3 - 12 tuổi, sữa được làm từ nguồn đạm A2 tự nhiên của sữa bò, cung cấp cho bé nguồn dinh dưỡng tối ưu.', 1950000, 20, 23),

-- Kid Essentials products
('Kid Essentials Nutritionally Complete 800g (1-10 tuổi)', 4, 3, 'Thực phẩm dinh dưỡng y học Kid Essentials Australia 800g hương vani (1-10 tuổi).', 695000, 10, 28),
('Combo 4 thực phẩm dinh dưỡng y học Kid Essentials Australia 800g hương vani (1-10 tuổi)', 4, 3, '4x Thực phẩm dinh dưỡng y học Kid Essentials Australia 800g hương vani (1-10 tuổi).', 2780000, 15, 32),

-- PediaSure products
('Thực phẩm dinh dưỡng y học cho trẻ 1-10 tuổi: Pediasure vani 850g', 5, 3, 'Thực phẩm dinh dưỡng y học cho trẻ 1-10 tuổi: Pediasure vani', 629000, 12, 38),
('Pediasure dạng lỏng hương vani 237ml (Lốc 6 chai)', 5, 3, 'Lốc 6 chai sữa bột pha sẵn Abbott PediaSure vani chai 237ml hương vị thơm ngon, đóng lốc tiện dùng', 229000, 0, 50),

-- Nestle products
('Sữa NAN INFINIPRO A2 800g số 1 (0-1 tuổi)', 6, 4, 'Sữa NAN INFINIPRO A2 số 1 là sản phẩm dinh dưỡng dành cho bé 0-12 tháng đến từ thương hiệu nổi tiếng Nestle.', 729000, 15, 20),
('Combo 1 thùng thực phẩm bổ sung Nestlé NANGROW 6 (8x110ml)', 6, 5, 'Thực phẩm bổ sung Nestlé NANGROW 6 (8x110ml) Mua 6 tặng 2', 405000, 5, 50),
('Sữa NAN SUPREME PRO số 2 800g (6-24 tháng)', 6, 4, 'Nestle NAN Supreme Pro số 2 là sữa bột công thức dành riêng cho trẻ 6-24 tháng tuổi.', 605000, 0, 32),
('Sữa Nan Optipro PLUS 2 800g, với 5HMO, sản xuất tại Thụy Sỹ (6-12 tháng)', 6, 4, 'Với công thức cải tiến được phát triển bởi Nestlé Thụy Sĩ, Nan Optipro PLUS 2, với 5HMO là sản phẩm dành cho trẻ từ 6-12 tháng tuổi.', 539000, 0, 32),

-- Aptamil products
('Sữa Aptamil số 2 900g (1-2 tuổi)', 7, 4, 'Sữa Aptamil số 2 là sản phẩm dinh dưỡng dành riêng cho bé từ 1 - 2 tuổi.', 664000, 10, 56),
('Sữa Aptamil Profutura Duobiotik 2 800g (6-36 tháng)', 7, 4, 'Sản phẩm dinh dưỡng công thức Aptamil Profutura Duobiotik 2 dành riêng cho bé từ 6 đến 36 tháng tuổi.', 795000, 15, 13),

-- Vinamilk products
('Vinamilk Optimum Gold 4, 850g, 2-6 tuổi', 8, 5, 'Optimum Gold 4 với công thức dễ tiêu hóa, là nền tảng cho việc hấp thu các dưỡng chất thiết yếu cho trẻ từ 2 - 6 tuổi, giúp tăng cường sức đề kháng, phát triển não bộ và thể chất.', 349000, 0, 38),
('Sữa uống dinh dưỡng Optimum Gold 110ml (Lốc 4 hộp)', 8, 5, 'Lốc 4 hộp sữa uống dinh dưỡng Optimum Gold hộp 110ml hương vị thơm ngon, dễ uống, bé nào cũng mê.', 37000, 0, 13),
('Combo 6 Sữa uống dinh dưỡng Optimum Gold 180ml (Lốc 4 hộp)', 8, 5, 'Sữa uống Optimum Gold 180ml là sản phẩm đến từ thương hiệu uy tín của Việt Nam - Vinamilk. Sản phẩm giúp bé phát triển khoẻ mạnh và phù hợp với các bé từ 1 tuổi trở lên.', 348000, 0, 33),
('Thùng Sữa non Vinamilk ColosGold 110ml (từ 1 tuổi) lốc 4 hộp - 12 lốc', 8, 5, 'Thùng 48 hộp sữa uống dinh dưỡng Vinamilk ColosGold hộp 110 ml (từ 1 tuổi) bổ sung đạm whey giàu alpha-lactalbumin cung cấp nhiều axit amin thiết yếu.', 468000, 0, 23),
('Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)', 8, 5, 'Sữa Non Vinamilk Colos Gold 3 800g (sữa bột cho trẻ từ 2 - 6 tuổi) - Miễn dịch khỏe, Bé lớn nhanh', 399000, 5, 41),

-- Friso Gold products
('Sữa bầu Friso Mum Gold 900g hương cam', 9, 6, 'Thực phẩm bổ sung cho mẹ mang thai và cho con bú, hương cam nhãn hiệu Frisomum Gold DualCare+TM.', 539000, 0, 28),
('Sữa Friso Gold số 4 850g (2 - 6 tuổi)', 9, 5, 'Sữa Friso® Gold 4 là sản phẩm dinh dưỡng dành cho trẻ em từ 2 - 6 tuổi. Đây là giai đoạn trẻ phát triển mạnh mẽ về thể chất, trí tuệ và tò mò khám phá về thế giới xung quanh.', 495000, 0, 34);

-- Review table
INSERT INTO Review (User_id, Product_id, Rate, Comment, Review_date) VALUES
(1, 1, 5, 'Great quality!', '2023-05-01'),
(2, 2, 4, 'Very tasty.', '2023-06-01'),
(3, 3, 3, 'Good, but a bit expensive.', '2023-05-16'),
(4, 4, 5, 'Crispy and delicious!', '2024-05-01'),
(4, 1, 5, 'Excellent product for my baby!', '2023-05-01'),
(4, 2, 4, 'Very good, but a bit expensive.', '2023-05-02'),
(5, 1, 4, 'Good quality, my baby likes it.', '2023-05-03'),
(5, 3, 3, 'Not bad, but my baby prefers another brand.', '2023-05-04'),
(5, 5, 4, 'Very fresh.', '2024-02-01'),
(6, 1, 5, 'Best formula we have tried.', '2023-05-05'),
(6, 4, 4, 'Great for pregnant moms.', '2023-05-06'),
(6, 6, 5, 'Best product ever!', '2023-12-30'),
(7, 5, 5, 'My newborn loves it.', '2023-05-07'),
(7, 6, 4, 'Good product, but shipping was slow.', '2023-05-08'),
(7, 7, 3, 'Effective but pricey.', '2023-11-28'),
(8, 8, 4, 'Nice taste, not that I tasted it.', '2024-03-24'),
(9, 9, 5, 'My child loves it.', '2024-02-24'),
(10, 10, 4, 'Healthy and tasty.', '2024-01-19');

-- Image table
INSERT INTO Image (Product_id, Image_url) VALUES
(1, 'milk.jpg'),
(2, 'bread.jpg'),
(3, 'juice.jpg'),
(4, 'chips.jpg'),
(5, 'apples.jpg'),
(6, 'icecream.jpg'),
(7, 'detergent.jpg'),
(8, 'shampoo.jpg'),
(9, 'dogfood.jpg'),
(10, 'pasta.jpg');

-- Wishlist table
INSERT INTO Wishlist (User_id, Product_id) VALUES
(1, 1), (1, 5), (1, 9),
(1, 2), (4, 6), (4, 10),
(7, 3), (7, 7), (7, 11),
(10, 4), (10, 8), (10, 12);

-- Voucher table
INSERT INTO Voucher (User_id, Discount, Start_date, Expiration_date, Status) VALUES
(1, 10.00, '2023-12-01', '2024-08-01', 1),
(4, 20.00, '2024-01-01', '2025-01-01', 1),
(4, 15.00, '2024-3-30', '2024-04-30', 0),
(7, 5.00, '2023-06-01', '2023-09-30', 0),
(10, 25.00, '2024-01-01', '2024-02-28', 0),
(10, 10.00, '2024-03-30', '2024-09-30', 1),
(1, 10.00, '2024-03-30', '2024-10-31', 0),
(7, 5.00, '2024-01-30', '2024-08-29', 1),
(1, 5.00, '2023-12-31', '2024-01-02', 0),
(7, 20.00, '2023-12-31', '2024-10-01', 1);

-- Order table
INSERT INTO `Order` (User_id, Full_name, Email, Phone, Address, Voucher_id, Shipping_fee, Total_price, Order_date, Payment_method) VALUES
(1, 'John Doe', 'john.doe@example.com', '1234567890', '123 Main St', 7, 15000, 1300350, '2023-07-21', 'Credit Card'),
(4, 'Emily Davis', 'emily.davis@example.com', '9879879876', '101 Oak St', 3, 30000, 606300, '2024-04-05', 'PayPal'),
(7, 'Joshua Moore', 'joshua.moore@example.com', '5555555555', '104 Cedar St', NULL, 10000, 687000, '2024-05-23', 'VnPay'),
(1, 'John Doe', 'john.doe@example.com', '1234567890', '123 Main St', NULL, 0, 1944750 , '2024-03-27', 'PayPal'),
(10, 'Laura Harris', 'laura.harris@example.com', '2222222222', '107 Ash St', 5, 20000, 1117640, '2024-01-22', 'Momo');

-- OrderDetail table with 10 entries
INSERT INTO OrderDetail (Order_id, Product_id, Quantity, Total_price) VALUES
(1, 1, 2, 1118000),
(1, 6, 1, 235000),
(2, 2, 1, 329000),
(2, 24, 1, 349000),
(3, 7, 1, 529000),
(3, 25, 4, 148000),
(4, 13, 1, 1560000),
(4, 19, 1, 384750),
(5, 5, 2, 910000),
(5, 16, 1, 553520);
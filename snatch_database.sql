-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 02, 2021 at 09:47 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `snatch`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `user_email` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_name` text NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_description` text NOT NULL,
  `product_age` int(11) DEFAULT NULL,
  `category` text NOT NULL,
  `product_mrp` int(11) NOT NULL,
  `product_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `user_email`, `created_at`, `product_name`, `product_price`, `product_description`, `product_age`, `category`, `product_mrp`, `product_image`) VALUES
(1, 'srajanchansoriya@gmail.com', '2021-05-31 13:01:52', 'Nike T-Shirt', 1799, 'Cool Nike T-Shirt', 0, 'fashion', 2599, 'snatch_default.png'),
(2, 'pragyachansoriya@gmail.com', '2021-05-31 13:01:58', 'Adidas T-Shirt Women', 2399, 'Black Adidas Original T-Shirt', 2, 'home', 3999, 'snatch_default.png'),
(6, 'arti@khan.com', '2021-05-31 13:08:16', 'Nokia Lumia 520', 12999, 'This is Microsoft Lumia 520', NULL, 'home', 23999, 'snatch_default.png'),
(11, 'arti@khan.com', '2021-06-01 09:22:34', 'Dell Prisma Z', 73999, 'A Great Laptop must have good battery life and must be Lightweight! It must also be sturdy and strong for Student, Professionals and Children.', NULL, 'home', 99999, '60d01ff8eba2de90873be90d63c097ad'),
(17, 'arti@khan.com', '2021-06-01 09:34:50', 'HP LATITUDE X3', 78456, 'A Great Laptop must have good battery life and must be Lightweight! It must also be sturdy and strong for Student, Professionals and Children.', NULL, 'home', 120000, 'd5624e61997dbef0ded354cb0719c152'),
(21, 'arti@khan.com', '2021-06-01 09:42:34', 'POCO X3', 7899, 'This is a very fast gaming mobile.This is a very fast gaming mobile.This is a very fast gaming mobile.This is a very fast gaming mobile.This is a very fast gaming mobile.This is a very fast gaming mobile.This is a very fast gaming mobile.This is a very fast gaming mobile.This is a very fast gaming mobile.This is a very fast gaming mobile.This is a very fast gaming mobile.', NULL, 'home', 13999, '07af070df18d642d88481548884a7154'),
(27, 'arti@khan.com', '2021-06-01 19:29:37', 'Zandu Balm', 79, 'Zandu Balm Pain Medicine', NULL, 'undefined', 99, 'f402d25f817f222a7284e7d82cc20fbf'),
(28, 'arti@khan.com', '2021-06-01 19:31:48', 'Chawanprash Coronil', 799, 'Corona Medicine Immunity', NULL, 'undefined', 999, 'b22f67778805361f4f41c0053fae7b89'),
(29, 'arti@khan.com', '2021-06-01 19:33:42', 'Zandu KESARI', 799, 'zANDU bALM FOR PAIN MEDICINE', NULL, 'undefined', 999, '44feb5a472818e22adda86c548ccd1d8'),
(30, 'arti@khan.com', '2021-06-01 19:38:16', 'Zebra', 799, 'This is an animal print jacket', NULL, 'electronics', 999, '8f431302ea16e6a8307261736d08a726'),
(31, 'arti@khan.com', '2021-06-01 19:40:29', 'Azhar', 788, 'tHIS IS A HEADPHONES', NULL, 'gadget', 999, '25fedfefe05407d68a2b3eb95aea9eef'),
(32, 'arti@khan.com', '2021-06-01 20:39:44', 'FiberFit', 1299, 'Fiberfit Protein powder for healthy living.', NULL, 'grocery', 1999, 'a8758bb933b384e7d093d1ce59eb779a'),
(33, 'arti@khan.com', '2021-06-01 20:46:51', 'Oppo2 Virat Dhoni', 1700, 'Oppo Virat Kohli Dhoni', NULL, 'books', 2399, '437dfb54e7c2e680fcc3d8cd9bc083ca');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `product_name` text NOT NULL,
  `tag_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tag_id`, `product_name`, `tag_name`) VALUES
(1, 'HP LATITUDE X3', 'latitude'),
(2, 'HP LATITUDE X3', 'great'),
(3, 'HP LATITUDE X3', 'laptop'),
(4, 'HP LATITUDE X3', 'must'),
(5, 'HP LATITUDE X3', 'have'),
(6, 'HP LATITUDE X3', 'good'),
(7, 'HP LATITUDE X3', 'battery'),
(8, 'HP LATITUDE X3', 'life'),
(9, 'HP LATITUDE X3', 'and'),
(10, 'HP LATITUDE X3', 'lightweight'),
(11, 'HP LATITUDE X3', 'also'),
(12, 'HP LATITUDE X3', 'sturdy'),
(13, 'HP LATITUDE X3', 'strong'),
(14, 'HP LATITUDE X3', 'for'),
(15, 'HP LATITUDE X3', 'student'),
(16, 'HP LATITUDE X3', 'professionals'),
(17, 'HP LATITUDE X3', 'professional'),
(18, 'HP LATITUDE X3', 'children'),
(19, 'POCO X3', 'poco'),
(20, 'POCO X3', 'this'),
(21, 'POCO X3', 'thi'),
(22, 'POCO X3', 'very'),
(23, 'POCO X3', 'fast'),
(24, 'POCO X3', 'gaming'),
(25, 'POCO X3', 'mobile'),
(26, 'POCO X3', 'mobile.this'),
(27, 'POCO X3', 'mobile.thi'),
(28, 'POCO X3', 'mobile.'),
(29, 'One Plus 8T', 'one'),
(30, 'One Plus 8T', 'plus'),
(31, 'One Plus 8T', 'plu'),
(32, 'One Plus 8T', 'this'),
(33, 'One Plus 8T', 'thi'),
(34, 'One Plus 8T', 'great'),
(35, 'One Plus 8T', 'gaming'),
(36, 'One Plus 8T', 'mobile'),
(37, 'Zandu Balm', 'zandu'),
(38, 'Zandu Balm', 'balm'),
(39, 'Zandu Balm', 'pain'),
(40, 'Zandu Balm', 'medicine'),
(41, 'Chawanprash Coronil', 'chawanprash'),
(42, 'Chawanprash Coronil', 'coronil'),
(43, 'Chawanprash Coronil', 'corona'),
(44, 'Chawanprash Coronil', 'medicine'),
(45, 'Chawanprash Coronil', 'immunity'),
(46, 'Zandu KESARI', 'zandu'),
(47, 'Zandu KESARI', 'kesari'),
(48, 'Zandu KESARI', 'balm'),
(49, 'Zandu KESARI', 'for'),
(50, 'Zandu KESARI', 'pain'),
(51, 'Zandu KESARI', 'medicine'),
(52, 'Zebra', 'zebra'),
(53, 'Zebra', 'an'),
(54, 'Zebra', 'animal'),
(55, 'Zebra', 'print'),
(56, 'Zebra', 'jacket'),
(57, 'Azhar', 'azhar'),
(58, 'Azhar', 'a'),
(59, 'Azhar', 'headphones'),
(60, 'Azhar', 'headphone'),
(61, 'FiberFit', 'fiberfit'),
(62, 'FiberFit', 'protein'),
(63, 'FiberFit', 'powder'),
(64, 'FiberFit', 'for'),
(65, 'FiberFit', 'healthy'),
(66, 'FiberFit', 'living'),
(67, 'Oppo', 'oppo'),
(68, 'Oppo', 'virat'),
(69, 'Oppo', 'kohli');

-- --------------------------------------------------------

--
-- Table structure for table `users_login`
--

CREATE TABLE `users_login` (
  `user_id` int(11) NOT NULL,
  `email_id` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `password_hash` text NOT NULL,
  `city` text DEFAULT NULL,
  `name` text NOT NULL,
  `cart` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cart`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_login`
--

INSERT INTO `users_login` (`user_id`, `email_id`, `created_at`, `password_hash`, `city`, `name`, `cart`) VALUES
(1, 'srajanchansoriya@gmail.com', '2021-05-30 17:19:58', 'b5bd1bdafe97118f4aa3f8c98cf4f2ec2c662d821aa3cecf9f6178fc3b00ddaa', 'Rampur, MP', '', NULL),
(2, 'pragyachansoriya@gmail.com', '2021-05-30 17:20:08', 'dc3ec87f7b18b45cd169bbf67fcf8d1bac08ee9471c244c269f6e30612875968', 'Guwahati, Assam', '', NULL),
(3, 'prakashchansoriya@gmail.com', '2021-05-30 17:20:18', 'dc3ec87f7b18b45cd169bbf67fcf8d1bac08ee9471c244c269f6e30612875968', 'Nalanda,Bihar', '', NULL),
(4, 'arti@khan.com', '2021-06-01 17:17:32', 'd8c845fb612698b921dd19837fd855a6796e1908f498a6989d6516d07f1e9bf8', 'Ajmer, Rajasthan', 'Aarti Khan', '[]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- Indexes for table `users_login`
--
ALTER TABLE `users_login`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `users_login`
--
ALTER TABLE `users_login`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

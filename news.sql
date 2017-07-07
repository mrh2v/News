-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 07, 2017 lúc 03:28 PM
-- Phiên bản máy phục vụ: 10.1.24-MariaDB
-- Phiên bản PHP: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `news`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `binh_luan`
--

CREATE TABLE `binh_luan` (
  `ID` int(11) NOT NULL,
  `ID_TIN` int(11) NOT NULL,
  `NOI_DUNG` varchar(255) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `NGUOI_BINH_LUAN` varchar(255) NOT NULL,
  `THOI_GIAN` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhom_tt`
--

CREATE TABLE `nhom_tt` (
  `ID` int(11) NOT NULL,
  `TEN_NHOM` varchar(255) NOT NULL,
  `HIEN_THI` tinyint(1) NOT NULL,
  `THU_TU` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `nhom_tt`
--

INSERT INTO `nhom_tt` (`ID`, `TEN_NHOM`, `HIEN_THI`, `THU_TU`) VALUES
(1, 'Thế giới', 1, 1),
(2, 'Thời sự', 1, 2),
(3, 'Kinh doanh', 1, 3),
(4, 'Pháp luật', 1, 4),
(5, 'Công nghệ', 1, 5),
(6, 'Xe 360', 1, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `theo_doi`
--

CREATE TABLE `theo_doi` (
  `ID` int(11) NOT NULL,
  `THOI_GIAN` date NOT NULL,
  `TRUY_CAP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tin_tuc`
--

CREATE TABLE `tin_tuc` (
  `ID` int(11) NOT NULL,
  `ID_LOAI_TIN` int(11) NOT NULL,
  `ID_NGUOI_DANG` int(11) NOT NULL,
  `TIEU_DE` varchar(255) NOT NULL,
  `NOI_DUNG_TT` varchar(255) NOT NULL,
  `NOI_DUNG` text NOT NULL,
  `THOI_GIAN` datetime NOT NULL,
  `SO_LAN_XEM` int(11) NOT NULL,
  `TU_KHOA` varchar(255) NOT NULL,
  `ANH_TD` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tin_tuc`
--

INSERT INTO `tin_tuc` (`ID`, `ID_LOAI_TIN`, `ID_NGUOI_DANG`, `TIEU_DE`, `NOI_DUNG_TT`, `NOI_DUNG`, `THOI_GIAN`, `SO_LAN_XEM`, `TU_KHOA`, `ANH_TD`) VALUES
(1, 1, 1, 'Test tin tức đầu tiên', 'dkm kdmdkm kdmdkm kdmdkm kdmdkm kdm', 'Nhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích tNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuhương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếu', '2017-07-07 07:00:48', 0, 'tin dau tien, dkm', NULL),
(2, 1, 1, 'Test tin tức t2', 'dkm kdmdkm kdmdkm kdmdkm kdmdkm kdm', 'Nhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích tNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuhương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếu', '2017-07-07 07:01:15', 0, 'tin dau tien, dkm', NULL),
(3, 2, 1, 'Test tin tức 3', 'dkm kdmdkm kdmdkm kdmdkm kdmdkm kdm', 'Nhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích tNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuhương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếu', '2017-07-07 07:01:27', 0, 'tin dau tien, dkm', NULL),
(4, 2, 1, 'Test tin tức 4', 'dkm kdmdkm kdmdkm kdmdkm kdmdkm kdm', 'Nhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích tNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuhương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếuNhận thức được nhu cầu tìm hiểu thông tin, giải trí của xã hội, là sự ra đời của hàng loạt website cho các mục đích thương mại, giải trí, tin tức…Để đáp ứng với việc cập nhật thông tin hàng ngày, tình hình xã hội, chính trị, thời sự, và sức khỏe… thì website tin tức ra đời là một nhu cầu tất yếu', '2017-07-07 07:01:33', 0, 'tin dau tien, dkm', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `HO_TEN` varchar(255) NOT NULL,
  `TEN_DANG_NHAP` varchar(50) NOT NULL,
  `MAT_KHAU` varchar(255) NOT NULL,
  `TEN_HIEN_THI` varchar(50) DEFAULT NULL,
  `GIOI_TINH` tinyint(1) DEFAULT NULL,
  `QUYEN` tinyint(4) DEFAULT NULL,
  `THOI_GIAN_CAP_NHAT` datetime NOT NULL,
  `CMND` int(11) DEFAULT NULL,
  `SDT` varchar(50) DEFAULT NULL,
  `ANH` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`ID`, `HO_TEN`, `TEN_DANG_NHAP`, `MAT_KHAU`, `TEN_HIEN_THI`, `GIOI_TINH`, `QUYEN`, `THOI_GIAN_CAP_NHAT`, `CMND`, `SDT`, `ANH`) VALUES
(1, 'Hoàng Văn Hùng', 'mrh2v', 'mrh2v', NULL, 1, 99, '2017-07-07 03:16:31', NULL, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `binh_luan`
--
ALTER TABLE `binh_luan`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `nhom_tt`
--
ALTER TABLE `nhom_tt`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `theo_doi`
--
ALTER TABLE `theo_doi`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `tin_tuc`
--
ALTER TABLE `tin_tuc`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `binh_luan`
--
ALTER TABLE `binh_luan`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `nhom_tt`
--
ALTER TABLE `nhom_tt`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT cho bảng `theo_doi`
--
ALTER TABLE `theo_doi`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `tin_tuc`
--
ALTER TABLE `tin_tuc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

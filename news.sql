-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 06, 2017 lúc 02:45 PM
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
  `NGUOI_BINH_LUAN` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhom_tt`
--

CREATE TABLE `nhom_tt` (
  `ID` int(11) NOT NULL,
  `TEN_NHOM` varchar(255) NOT NULL,
  `HIEN_THI` tinyint(4) NOT NULL,
  `THU_TU` tinyint(4) NOT NULL,
  `LINH_VUC` tinyint(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `QUYEN` tinyint(4) NOT NULL,
  `THOI_GIAN_CAP_NHAT` datetime NOT NULL,
  `CMND` int(11) DEFAULT NULL,
  `SDT` int(11) DEFAULT NULL,
  `ANH` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `theo_doi`
--
ALTER TABLE `theo_doi`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `tin_tuc`
--
ALTER TABLE `tin_tuc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

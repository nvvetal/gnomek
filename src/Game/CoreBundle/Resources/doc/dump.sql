-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Ноя 06 2012 г., 17:21
-- Версия сервера: 5.5.25a
-- Версия PHP: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- База данных: `gnomek`
--

-- --------------------------------------------------------

--
-- Структура таблицы `item_types`
--

CREATE TABLE IF NOT EXISTS `item_types` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `collisionType` enum('none','wall') NOT NULL DEFAULT 'none',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `item_types`
--

INSERT INTO `item_types` (`id`, `name`, `collisionType`) VALUES
(1, 'wall', 'wall'),
(2, 'tunnel', 'none'),
(4, 'gnomek', 'none');

-- --------------------------------------------------------

--
-- Структура таблицы `map`
--

CREATE TABLE IF NOT EXISTS `map` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `x` int(10) unsigned NOT NULL,
  `y` int(10) unsigned NOT NULL,
  `mapData` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `map`
--

INSERT INTO `map` (`id`, `x`, `y`, `mapData`) VALUES
(1, 9, 2, ''),
(2, 10, 2, ''),
(3, 11, 2, ''),
(4, 12, 2, '');

-- --------------------------------------------------------

--
-- Структура таблицы `map_items`
--

CREATE TABLE IF NOT EXISTS `map_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mapId` int(10) unsigned NOT NULL,
  `itemType` smallint(5) unsigned NOT NULL,
  `itemAnimation` varchar(50) NOT NULL,
  `itemAction` varchar(50) NOT NULL,
  `itemPosition` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `map_items`
--

INSERT INTO `map_items` (`id`, `mapId`, `itemType`, `itemAnimation`, `itemAction`, `itemPosition`) VALUES
(1, 1, 1, 'wall', '', ''),
(2, 2, 2, 'tunnelUp', '', ''),
(3, 3, 2, 'tunnel', '', ''),
(4, 4, 1, 'wall', '', ''),
(5, 2, 4, 'stay', 'none', 'none');

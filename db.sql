--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.0

-- Started on 2023-05-26 15:57:24 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3621 (class 1262 OID 16408)
-- Name: sportFinder; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "sportFinder" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


ALTER DATABASE "sportFinder" OWNER TO postgres;

\connect "sportFinder"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3611 (class 0 OID 16442)
-- Dependencies: 217
-- Data for Name: court; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.court (court_id, court_name, court_longitude, court_latitude, image) VALUES (1, 'Livada
', 25.58550284700226, 45.646770238651406, 'https://res.cloudinary.com/davrg4fxd/image/upload/v1682857499/sublivada_wit1na.jpg');
INSERT INTO public.court (court_id, court_name, court_longitude, court_latitude, image) VALUES (2, 'Sub Tampa', 25.59484653437567, 45.64041359556766, 'https://res.cloudinary.com/davrg4fxd/image/upload/v1682856363/sub_tampa_pgvaso.jpg');
INSERT INTO public.court (court_id, court_name, court_longitude, court_latitude, image) VALUES (3, 'Andrei Saguna', 25.585306882806222, 45.63890835734231, 'https://res.cloudinary.com/davrg4fxd/image/upload/v1682856810/Screenshot_2023-04-30_at_15.13.18_koazf0.png');
INSERT INTO public.court (court_id, court_name, court_longitude, court_latitude, image) VALUES (4, 'Bartolomeu', 25.57714242235894, 45.66422023060615, 'https://res.cloudinary.com/davrg4fxd/image/upload/v1682857667/bartolomeu_z5rltc.png');
INSERT INTO public.court (court_id, court_name, court_longitude, court_latitude, image) VALUES (5, 'Parcul Soarelui', 25.632877657266768, 45.63690083647725, 'https://res.cloudinary.com/davrg4fxd/image/upload/v1682857547/parcul_soarelui_rr446a.jpg');
INSERT INTO public.court (court_id, court_name, court_longitude, court_latitude, image) VALUES (6, 'McDonalds', 25.633925893655793, 45.63377240970454, 'https://res.cloudinary.com/davrg4fxd/image/upload/v1682857185/mcdonalds_rmnneb.jpg');
INSERT INTO public.court (court_id, court_name, court_longitude, court_latitude, image) VALUES (8, 'Johann Seuler', 25.6094451367956, 45.65189607574903, 'https://res.cloudinary.com/davrg4fxd/image/upload/v1682858007/afi_rqfoo2.webp');
INSERT INTO public.court (court_id, court_name, court_longitude, court_latitude, image) VALUES (7, 'Christianus Hirscher', 25.61131500843435, 45.65319749655533, 'https://res.cloudinary.com/davrg4fxd/image/upload/v1682857371/johan_seuler_umcdfp.jpg');


--
-- TOC entry 3613 (class 0 OID 16452)
-- Dependencies: 219
-- Data for Name: lobby; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (386, 2, 1, 4, '2023-04-30');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (390, 2, 1, 1, '2023-04-30');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (393, 1, 1, 1, '2023-04-30');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (394, 1, 1, 4, '2023-04-30');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (395, 1, 1, 8, '2023-04-30');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (467, 1, 3, 1, '2023-05-16');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (403, 1, 4, 8, '2023-05-01');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (471, 1, 3, 11, '2023-05-16');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (406, 2, 5, 8, '2023-05-01');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (408, 1, 5, 1, '2023-05-14');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (409, 1, 4, 1, '2023-05-14');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (410, 1, 4, 4, '2023-05-14');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (411, 5, 5, 4, '2023-05-14');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (412, 1, 5, 4, '2023-05-14');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (419, 8, 6, 1, '2023-05-15');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (420, 1, 7, 7, '2023-05-15');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (421, 1, 7, 1, '2023-05-15');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (424, 4, 7, 11, '2023-05-15');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (321, 2, 1, 1, '2023-04-22');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (373, 2, 1, 4, '2023-04-23');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (377, 2, 2, 4, '2023-04-23');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (378, 2, 1, 1, '2023-04-24');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (379, 2, 1, 4, '2023-04-24');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (380, 2, 1, 7, '2023-04-23');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (381, 2, 1, 1, '2023-04-23');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (491, 1, 7, 1, '2023-05-16');
INSERT INTO public.lobby (lobby_id, court_id, time_id, player_id, date) OVERRIDING SYSTEM VALUE VALUES (496, 1, 1, 1, '2023-05-17');


--
-- TOC entry 3608 (class 0 OID 16427)
-- Dependencies: 214
-- Data for Name: player; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.player (playerid, username, passwordhash, rating, userid, height, age) OVERRIDING SYSTEM VALUE VALUES (2, 'claudiu', '$2b$10$vKHF7VjAua.O520zbCPAK.i2416kehGU17pYderzPflFJNON/x/2i', NULL, '7c8eb88c-97ba-425e-8e33-4582652998b5', NULL, NULL);
INSERT INTO public.player (playerid, username, passwordhash, rating, userid, height, age) OVERRIDING SYSTEM VALUE VALUES (3, 'sergiu', '$2b$10$mnUjB4VT/BcOWGEauwidu.bIEpRLMFn1UDsESI0c.PWx5UcfGskCi', NULL, '35189535-f1b1-475c-8ad1-ec078bf9deb5', NULL, NULL);
INSERT INTO public.player (playerid, username, passwordhash, rating, userid, height, age) OVERRIDING SYSTEM VALUE VALUES (8, 'aldesmaria', '$2b$10$34MvXvm52zKyfZ8ZugE8AOOSFoiHt/gCCWyh46GOW/OVDWzzpv4RK', NULL, 'e429802d-f916-40e7-ac37-790579dcf488', NULL, NULL);
INSERT INTO public.player (playerid, username, passwordhash, rating, userid, height, age) OVERRIDING SYSTEM VALUE VALUES (9, 'marian', '$2b$10$h.AtxYyJUq8fDZqWZEjNkeT82roGry3bZo/jEN/pwLzchcS4k.9/S', NULL, '7500f956-1c61-4b28-bec6-22f4d092ce2c', NULL, NULL);
INSERT INTO public.player (playerid, username, passwordhash, rating, userid, height, age) OVERRIDING SYSTEM VALUE VALUES (10, 'mircea', '$2b$10$fyFnEQ5SMcn04aw4iRNqJeqyCe6c/xgRZ.nhUecNv4p9vVlXjkyv2', NULL, '76fdd3da-4e14-4c53-8d9f-5c37bd745761', NULL, NULL);
INSERT INTO public.player (playerid, username, passwordhash, rating, userid, height, age) OVERRIDING SYSTEM VALUE VALUES (7, 'sergione', '$2b$10$.kXagFtHJIbgyTGDHnG2ZePSfxHQC22tlvourqneXsKgGWgri4Zcy', 4, '8fbfabd9-0e08-42e5-a2d8-2748691e42b5', 190, 18);
INSERT INTO public.player (playerid, username, passwordhash, rating, userid, height, age) OVERRIDING SYSTEM VALUE VALUES (4, 'claudio', '$2b$10$X9QOJ5/k70h/OC/q2pCzJuhQwwgyuXgv0H9z6gT4G8MU0Wm3MN.Ay', 3.8585205078125, 'a187d95d-1223-4a18-87ae-abd644a03035', 187, 48);
INSERT INTO public.player (playerid, username, passwordhash, rating, userid, height, age) OVERRIDING SYSTEM VALUE VALUES (11, 'gheorghe', '$2b$10$EJZXWAYLPiQ2N1liUWYUHet7uMiTRlAjPtSKOC0fW0zRsHv2DIA5i', 5, 'efe68c7d-5bf9-426b-8390-0fbc16e33b52', 168, 28);
INSERT INTO public.player (playerid, username, passwordhash, rating, userid, height, age) OVERRIDING SYSTEM VALUE VALUES (1, 'sergiu811', '$2b$10$b0CuDqT.RKl75LeG/BrJBuAZP3H0xIDgo4he6kJ5a/PnfwBtcgQhG', 4.069091796875, 'f625ef29-cef0-4161-9d05-0f0d5f88ad6c', 197, 21);


--
-- TOC entry 3615 (class 0 OID 16463)
-- Dependencies: 221
-- Data for Name: time_interval; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.time_interval (time_id, time_interval) OVERRIDING SYSTEM VALUE VALUES (1, '8:00 to 10:00');
INSERT INTO public.time_interval (time_id, time_interval) OVERRIDING SYSTEM VALUE VALUES (2, '10:00 to 12:00');
INSERT INTO public.time_interval (time_id, time_interval) OVERRIDING SYSTEM VALUE VALUES (3, '12:00 to 14:00');
INSERT INTO public.time_interval (time_id, time_interval) OVERRIDING SYSTEM VALUE VALUES (4, '14:00 to 16:00');
INSERT INTO public.time_interval (time_id, time_interval) OVERRIDING SYSTEM VALUE VALUES (5, '16:00 to 18:00');
INSERT INTO public.time_interval (time_id, time_interval) OVERRIDING SYSTEM VALUE VALUES (6, '18:00 to 20:00');
INSERT INTO public.time_interval (time_id, time_interval) OVERRIDING SYSTEM VALUE VALUES (7, '20:00 to 22:00');


--
-- TOC entry 3623 (class 0 OID 0)
-- Dependencies: 216
-- Name: basketball_courts_court_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.basketball_courts_court_id_seq', 11, true);


--
-- TOC entry 3624 (class 0 OID 0)
-- Dependencies: 218
-- Name: lobby_lobby_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lobby_lobby_id_seq', 499, true);


--
-- TOC entry 3625 (class 0 OID 0)
-- Dependencies: 215
-- Name: player_playerid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.player_playerid_seq', 11, true);


--
-- TOC entry 3626 (class 0 OID 0)
-- Dependencies: 220
-- Name: time_interval_time_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.time_interval_time_id_seq', 7, true);


-- Completed on 2023-05-26 15:57:24 EEST

--
-- PostgreSQL database dump complete
--


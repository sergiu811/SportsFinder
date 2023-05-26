--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.3

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: court; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.court (
    court_id integer NOT NULL,
    court_name character varying(100) NOT NULL,
    court_longitude numeric NOT NULL,
    court_latitude numeric NOT NULL,
    image character varying(255)
);


ALTER TABLE public.court OWNER TO postgres;

--
-- Name: basketball_courts_court_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.basketball_courts_court_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.basketball_courts_court_id_seq OWNER TO postgres;

--
-- Name: basketball_courts_court_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.basketball_courts_court_id_seq OWNED BY public.court.court_id;


--
-- Name: lobby; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lobby (
    lobby_id integer NOT NULL,
    court_id integer NOT NULL,
    time_id integer NOT NULL,
    player_id integer NOT NULL,
    date character varying(255) NOT NULL
);


ALTER TABLE public.lobby OWNER TO postgres;

--
-- Name: lobby_lobby_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.lobby ALTER COLUMN lobby_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.lobby_lobby_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.player (
    playerid integer NOT NULL,
    username character varying(255) NOT NULL,
    passwordhash character varying(255) NOT NULL,
    rating double precision,
    userid character varying(255) NOT NULL,
    height integer,
    age integer
);


ALTER TABLE public.player OWNER TO postgres;

--
-- Name: player_playerid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.player ALTER COLUMN playerid ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.player_playerid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: time_interval; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.time_interval (
    time_id integer NOT NULL,
    time_interval character varying(255)
);


ALTER TABLE public.time_interval OWNER TO postgres;

--
-- Name: time_interval_time_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.time_interval ALTER COLUMN time_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.time_interval_time_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: court court_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.court ALTER COLUMN court_id SET DEFAULT nextval('public.basketball_courts_court_id_seq'::regclass);


--
-- Data for Name: court; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.court (court_id, court_name, court_longitude, court_latitude, image) FROM stdin;
1	Livada\n	25.58550284700226	45.646770238651406	https://res.cloudinary.com/davrg4fxd/image/upload/v1682857499/sublivada_wit1na.jpg
2	Sub Tampa	25.59484653437567	45.64041359556766	https://res.cloudinary.com/davrg4fxd/image/upload/v1682856363/sub_tampa_pgvaso.jpg
3	Andrei Saguna	25.585306882806222	45.63890835734231	https://res.cloudinary.com/davrg4fxd/image/upload/v1682856810/Screenshot_2023-04-30_at_15.13.18_koazf0.png
4	Bartolomeu	25.57714242235894	45.66422023060615	https://res.cloudinary.com/davrg4fxd/image/upload/v1682857667/bartolomeu_z5rltc.png
5	Parcul Soarelui	25.632877657266768	45.63690083647725	https://res.cloudinary.com/davrg4fxd/image/upload/v1682857547/parcul_soarelui_rr446a.jpg
6	McDonalds	25.633925893655793	45.63377240970454	https://res.cloudinary.com/davrg4fxd/image/upload/v1682857185/mcdonalds_rmnneb.jpg
8	Johann Seuler	25.6094451367956	45.65189607574903	https://res.cloudinary.com/davrg4fxd/image/upload/v1682858007/afi_rqfoo2.webp
7	Christianus Hirscher	25.61131500843435	45.65319749655533	https://res.cloudinary.com/davrg4fxd/image/upload/v1682857371/johan_seuler_umcdfp.jpg
\.


--
-- Data for Name: lobby; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lobby (lobby_id, court_id, time_id, player_id, date) FROM stdin;
386	2	1	4	2023-04-30
390	2	1	1	2023-04-30
393	1	1	1	2023-04-30
394	1	1	4	2023-04-30
395	1	1	8	2023-04-30
467	1	3	1	2023-05-16
403	1	4	8	2023-05-01
471	1	3	11	2023-05-16
406	2	5	8	2023-05-01
408	1	5	1	2023-05-14
409	1	4	1	2023-05-14
410	1	4	4	2023-05-14
411	5	5	4	2023-05-14
412	1	5	4	2023-05-14
419	8	6	1	2023-05-15
420	1	7	7	2023-05-15
421	1	7	1	2023-05-15
424	4	7	11	2023-05-15
321	2	1	1	2023-04-22
373	2	1	4	2023-04-23
377	2	2	4	2023-04-23
378	2	1	1	2023-04-24
379	2	1	4	2023-04-24
380	2	1	7	2023-04-23
381	2	1	1	2023-04-23
491	1	7	1	2023-05-16
496	1	1	1	2023-05-17
\.


--
-- Data for Name: player; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.player (playerid, username, passwordhash, rating, userid, height, age) FROM stdin;
2	claudiu	$2b$10$vKHF7VjAua.O520zbCPAK.i2416kehGU17pYderzPflFJNON/x/2i	\N	7c8eb88c-97ba-425e-8e33-4582652998b5	\N	\N
3	sergiu	$2b$10$mnUjB4VT/BcOWGEauwidu.bIEpRLMFn1UDsESI0c.PWx5UcfGskCi	\N	35189535-f1b1-475c-8ad1-ec078bf9deb5	\N	\N
8	aldesmaria	$2b$10$34MvXvm52zKyfZ8ZugE8AOOSFoiHt/gCCWyh46GOW/OVDWzzpv4RK	\N	e429802d-f916-40e7-ac37-790579dcf488	\N	\N
9	marian	$2b$10$h.AtxYyJUq8fDZqWZEjNkeT82roGry3bZo/jEN/pwLzchcS4k.9/S	\N	7500f956-1c61-4b28-bec6-22f4d092ce2c	\N	\N
10	mircea	$2b$10$fyFnEQ5SMcn04aw4iRNqJeqyCe6c/xgRZ.nhUecNv4p9vVlXjkyv2	\N	76fdd3da-4e14-4c53-8d9f-5c37bd745761	\N	\N
7	sergione	$2b$10$.kXagFtHJIbgyTGDHnG2ZePSfxHQC22tlvourqneXsKgGWgri4Zcy	4	8fbfabd9-0e08-42e5-a2d8-2748691e42b5	190	18
4	claudio	$2b$10$X9QOJ5/k70h/OC/q2pCzJuhQwwgyuXgv0H9z6gT4G8MU0Wm3MN.Ay	3.8585205078125	a187d95d-1223-4a18-87ae-abd644a03035	187	48
11	gheorghe	$2b$10$EJZXWAYLPiQ2N1liUWYUHet7uMiTRlAjPtSKOC0fW0zRsHv2DIA5i	5	efe68c7d-5bf9-426b-8390-0fbc16e33b52	168	28
1	sergiu811	$2b$10$b0CuDqT.RKl75LeG/BrJBuAZP3H0xIDgo4he6kJ5a/PnfwBtcgQhG	4.069091796875	f625ef29-cef0-4161-9d05-0f0d5f88ad6c	197	21
\.


--
-- Data for Name: time_interval; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.time_interval (time_id, time_interval) FROM stdin;
1	8:00 to 10:00
2	10:00 to 12:00
3	12:00 to 14:00
4	14:00 to 16:00
5	16:00 to 18:00
6	18:00 to 20:00
7	20:00 to 22:00
\.


--
-- Name: basketball_courts_court_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.basketball_courts_court_id_seq', 11, true);


--
-- Name: lobby_lobby_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lobby_lobby_id_seq', 499, true);


--
-- Name: player_playerid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.player_playerid_seq', 11, true);


--
-- Name: time_interval_time_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.time_interval_time_id_seq', 7, true);


--
-- Name: court basketball_courts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.court
    ADD CONSTRAINT basketball_courts_pkey PRIMARY KEY (court_id);


--
-- Name: lobby lobby_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lobby
    ADD CONSTRAINT lobby_pkey PRIMARY KEY (lobby_id);


--
-- Name: player player_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.player
    ADD CONSTRAINT player_pkey PRIMARY KEY (playerid);


--
-- Name: time_interval time_interval_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.time_interval
    ADD CONSTRAINT time_interval_pkey PRIMARY KEY (time_id);


--
-- Name: lobby lobby_court; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lobby
    ADD CONSTRAINT lobby_court FOREIGN KEY (court_id) REFERENCES public.court(court_id);


--
-- Name: lobby lobby_player; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lobby
    ADD CONSTRAINT lobby_player FOREIGN KEY (player_id) REFERENCES public.player(playerid) NOT VALID;


--
-- Name: lobby lobby_time; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lobby
    ADD CONSTRAINT lobby_time FOREIGN KEY (time_id) REFERENCES public.time_interval(time_id) NOT VALID;


--
-- PostgreSQL database dump complete
--


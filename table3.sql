-- CREATE SCHEMA IF NOT EXISTS public
--     AUTHORIZATION postgres;

-- COMMENT ON SCHEMA public
--     IS 'standard public schema';

-- GRANT ALL ON SCHEMA public TO PUBLIC;

-- GRANT ALL ON SCHEMA public TO postgres;

CREATE TABLE IF NOT EXISTS public.user
(
	id serial primary key,
name text NOT NULL,
password text NOT NULL,
	weight real NOT NULL,
rost real NOT NULL,
pol real NOT NULL,
	podpiska integer NOT NULL,
	age integer NOt NULL,
	aim text not null
);

ALTER TABLE public."user" owner to postgres;


CREATE TABLE IF NOT EXISTS public.userfood
(
	id serial primary key,
	name text NOT NULL,
	calories real not null,
	user_id integer not null
);

ALTER TABLE public."userfood" owner to postgres;

CREATE TABLE IF NOT EXISTS public.type
(
	id serial primary key,
	type text not null
);

ALTER TABLE public."type" owner to postgres;

CREATE TABLE IF NOT EXISTS public.food
(
	id serial primary key,
	name text NOT NULL,
	calories real not null,
	id_type integer not null,
	opisanie text not null
);

ALTER TABLE public."food" owner to postgres;
	
CREATE TABLE IF NOT EXISTS public.foodportions
(
	id serial primary key,
	type text NOT NULL,
	food_id integer not null,
	user_id integer not null,
	weight real not null,
	dates date not null
);

ALTER TABLE public."foodportions" owner to postgres;


CREATE TABLE IF NOT EXISTS public.activity
(
	id serial primary key,
	name text NOT NULL,
	coeficent real NOT NULL
);

ALTER TABLE public."activity" owner to postgres;

CREATE TABLE IF NOT EXISTS public.activityuser
(
	id serial primary key,
	user_id integer not null,
	time real not null,
	activity_id integer not null,
	dates date not null
);

ALTER TABLE public."activityuser" owner to postgres;
	
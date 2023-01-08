-- SCHEMA: public

-- DROP SCHEMA IF EXISTS public ;


CREATE SCHEMA IF NOT EXISTS public
    AUTHORIZATION postgres;

COMMENT ON SCHEMA public
    IS 'standard public schema';

GRANT ALL ON SCHEMA public TO PUBLIC;

GRANT ALL ON SCHEMA public TO postgres;

CREATE TABLE IF NOT EXISTS public.user
(
	id serial primary key,
    name text NOT NULL,
    password text NOT NULL,
	weight real NOT NULL,
	rost real Not null,
	pol real not null,
	podpiska integer NOT NULL
);

ALTER TABLE public."user" owner to postgres;

CREATE TABLE IF NOT EXISTS public.count
(
	id serial primary key,
    count integer NOT NULL
);

ALTER TABLE public."count" owner to postgres;

CREATE TABLE IF NOT EXISTS public.date
(
	id serial primary key,
    date_ date NOT NULL
);

ALTER TABLE public."date" owner to postgres;

CREATE TABLE IF NOT EXISTS public.User_Food
(
	id serial primary key,
    name integer NOT NULL REFERENCES public."name"(id),
	calories integer not null REFERENCES public."calories"(id),
	user_id integer not null REFERENCES public."user"(id)
);

ALTER TABLE public."User_Food" owner to postgres;

CREATE TABLE IF NOT EXISTS public.Lover_food
(
	id serial primary key,
    id_food integer NOT NULL REFERENCES public."Food"(id),
	id_count integer not null REFERENCES public."count"(id),
	id_date integer not null REFERENCES public."date"(id)
);

ALTER TABLE public."Lover_food" owner to postgres;

CREATE TABLE IF NOT EXISTS public.calories
(
	id serial primary key,
    calories integer NOT NULL
);

ALTER TABLE public."calories" owner to postgres;

CREATE TABLE IF NOT EXISTS public.type
(
	id serial primary key,
    type text NOT NULL
);

ALTER TABLE public."type" owner to postgres;

CREATE TABLE IF NOT EXISTS public.name
(
	id serial primary key,
    name text NOT NULL
);

ALTER TABLE public."name" owner to postgres;

CREATE TABLE IF NOT EXISTS public.Food
(
	id serial primary key,
    id_name integer NOT NULL REFERENCES public."name"(id),
	id_calories integer not null REFERENCES public."calories"(id),
	id_type integer not null REFERENCES public."type"(id),
	id_opisanie integer not null REFERENCES public."opisanie"(id)
);

ALTER TABLE public."Food" owner to postgres;

CREATE TABLE IF NOT EXISTS public.opisanie
(
	id serial primary key,
    opisanie text NOT NULL 
);

ALTER TABLE public."opisanie" owner to postgres;



CREATE TABLE IF NOT EXISTS public.Coeficent
(
	id serial primary key,
	coeficent real not null
);

ALTER TABLE public."Coeficent" owner to postgres;

CREATE TABLE IF NOT EXISTS public.Activity
(
	id serial primary key,
    id_name integer NOT NULL REFERENCES public."name"(id),
	id_coeficent integer not null REFERENCES public."Coeficent"(id)
);

ALTER TABLE public."Activity" owner to postgres;

CREATE TABLE IF NOT EXISTS public.Food_portions
(
	id serial primary key,
    id_food integer NOT NULL REFERENCES Food."Food"(id),
	id_lover_food integer NOT NULL REFERENCES Food."User_Food"(id),
	weight integer not null
);

ALTER TABLE public."Food_portions" owner to postgres;

CREATE TABLE IF NOT EXISTS public.Dairy_on_day
(
	id serial primary key,
    user_id integer NOT NULL REFERENCES public."user"(id),
	foodsmth_id integer REFERENCES public."Food_portions"(id),
	activity_id integer REFERENCES public."Activity"(id),
	time_activity real,
	id_calories integer REFERENCES public."calories"(id),
	id_date integer not null REFERENCES public."date"(id)
);

ALTER TABLE public."Dairy_on_day" owner to postgres;

CREATE TABLE IF NOT EXISTS public.Dairy_for_period
(
	id serial primary key,
	date_left date NOT NULL,
	date_right date NOT NULL
);

ALTER TABLE public."Dairy_for_period" owner to postgres;


	
	
	
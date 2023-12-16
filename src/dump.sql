create database accounts;

drop table if exists users;

create table users (
	id serial primary key,
	name text not null,
	email text not null unique,
	password text not null
);

drop table if exists categories;

create table categories (
	id serial primary key,
	name text not null
);

drop table if exists accounts;

create table accounts (
	id serial primary key,
	user_id integer references users(id),
	category_id integer references categories(id),
	description text not null,
	value numeric(15) not null,
	due_date date not null,
	installment integer not null,
	status VARCHAR(10) CHECK (status IN ('pago', 'pendente')) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT Now()
);

create table messages (
	id serial primary key,
	user_id integer references users(id),
	destination varchar(18),
	description text not null,
	due_date date not null,
	created_at TIMESTAMPTZ DEFAULT Now()
)

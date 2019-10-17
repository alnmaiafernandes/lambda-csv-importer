create table users
(
	id integer auto_increment,
	full_name varchar(128) not null,
	nickname varchar(12) null,
	email varchar(128) null,
	enabled boolean null,
	created_at datetime null,
	constraint users_pk
		primary key (id)
);
CREATE TABLE transaction_log
(
    tx_local_id    serial primary key,
    tx_id        VARCHAR(66) not null,
    create_time        DATE,
	metadata json NOT NULL,
	status json NOT NULL
);
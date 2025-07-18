CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`completed` integer DEFAULT 0,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
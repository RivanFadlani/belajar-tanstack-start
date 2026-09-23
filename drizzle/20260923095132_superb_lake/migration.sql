ALTER TABLE "notes" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");
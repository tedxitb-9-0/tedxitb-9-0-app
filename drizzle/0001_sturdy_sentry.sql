-- Create order_type enum if it doesn't exist
DO $$ BEGIN
 CREATE TYPE "public"."order_type" AS ENUM('pre_event_ticket', 'main_event_ticket', 'merchandise');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;--> statement-breakpoint
ALTER TABLE "pg-drizzle_order_item" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "pg-drizzle_order_item" CASCADE;--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" ALTER COLUMN "status" SET DEFAULT 'pending'::text;--> statement-breakpoint
DROP TYPE "public"."status" CASCADE;--> statement-breakpoint
-- Create status enum
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('pending', 'paid', 'confirmed', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."status";--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" ADD COLUMN "order_type" "order_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" ADD COLUMN "merch_json" json;--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" ADD COLUMN "ticket_json" json;--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" ADD COLUMN "payment_proof_url" text;--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" ADD COLUMN "qr_code" text;--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" DROP COLUMN "delivery_type";--> statement-breakpoint
ALTER TABLE "pg-drizzle_order" DROP COLUMN "shipping_details";--> statement-breakpoint
DROP TYPE "public"."delivery_type";
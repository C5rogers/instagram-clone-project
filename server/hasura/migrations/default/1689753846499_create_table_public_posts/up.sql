CREATE TABLE "public"."posts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "post_url" text NOT NULL, "caption" text NOT NULL, "location" text, "comment_count" integer NOT NULL DEFAULT 0, "like_count" integer NOT NULL DEFAULT 0, "hashtag" json NOT NULL, "saved_count" integer NOT NULL DEFAULT 0, "view_count" integer NOT NULL DEFAULT 0, "is_vidio" boolean NOT NULL DEFAULT false, "duration" text, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE no action ON DELETE no action, UNIQUE ("id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_posts_updated_at"
BEFORE UPDATE ON "public"."posts"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_posts_updated_at" ON "public"."posts"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

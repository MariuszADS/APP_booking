-- AlterTable
CREATE SEQUENCE booking_id_seq;
ALTER TABLE "Booking" ALTER COLUMN "id" SET DEFAULT nextval('booking_id_seq');
ALTER SEQUENCE booking_id_seq OWNED BY "Booking"."id";

-- AlterTable
CREATE SEQUENCE service_id_seq;
ALTER TABLE "Service" ALTER COLUMN "id" SET DEFAULT nextval('service_id_seq');
ALTER SEQUENCE service_id_seq OWNED BY "Service"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

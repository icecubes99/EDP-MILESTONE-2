-- CreateTable
CREATE TABLE "Employees" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "barangay" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "Country" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

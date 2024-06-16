## How to Use

### Install Required Packages
1. Install Nodejs, which must be 18.20.0 and above.
2. Install Visual Studio Code
3. Install Docker

### Use the this project

Clone a project from github to run the following command:

```bash
https://github.com/chingakhamronald/college-web.git
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

For this project, we use Prisma to connect to the database. so, we need to install Prisma, you can follow from here
```bash
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-typescript-postgresql
```
After installation is done, we need to init prisma for starting
Run
```bash
npm run prisma init
```
This command initializes a new Prisma project in your current directory. It sets up the necessary files and folders for your Prisma configuration. This will create a directory prisma, inside that schema.prisma. In this schema.prisma, here we are going to the models
```bash
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      String?  @default("")
  teacher   Teacher?
  student   Student?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Teacher {
  id            String    @id @default(uuid())
  name          String?
  address       String?
  mobile_number String?
  department    String?
  project       Project[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  user          User?     @relation(fields: [userId], references: [id])
  userId        String    @unique
}

model Student {
  id            String          @id @default(uuid())
  name          String?
  address       String?
  fatherName    String?
  semester      String?
  mobile_number String?
  department    String?
  doc           Doc[]
  assignProject AssignProject[]
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  user          User?           @relation(fields: [userId], references: [id])
  userId        String          @unique
}

model Doc {
  id        String   @id @default(uuid())
  docName   String?
  path      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  student   Student? @relation(fields: [studentId], references: [id])
  studentId String?
  project   Project? @relation(fields: [projectId], references: [id])
  projectId String?

  @@unique([projectId, studentId])
}

model Project {
  id            String          @id @default(uuid())
  question      String?
  semester      String?
  subject       String?
  assignProject AssignProject[]
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  teacher       Teacher?        @relation(fields: [teacherId], references: [id])
  teacherId     String
  doc           Doc[]
}

model AssignProject {
  id         String   @id @default(uuid())
  project    Project? @relation(fields: [projectId], references: [id])
  projectId  String?
  status     Boolean? @default(false)
  student    Student? @relation(fields: [studentId], references: [id])
  studentId  String?
  assignedAt DateTime @default(now())
  assignedBy String

  @@unique([projectId, studentId])
}
```

and run
```bash
npm run prisma migrate dev
```
This command applies any pending/new migrations to your database

### Creating a Database
We use docker for this database, in docker we create a container with image PostgreSQL for our project. So, we need to create a yml file
to run the docker
```bash
docker-compose.yml
```
```bash
services:
  postgres_master:
    image: postgres:16.3
    container_name: container_name
    hostname: "primary.postgresql.college-web"
    restart: unless-stopped
    environment:
      POSTGRES_USER: "user"
      POSTGRES_PASSWORD: "password"
      POSTGRES_DB: "db_name"
      PGDATA: /var/lib/postgresql/data/pgdata
    ports:
      - 5455:5432
```
and running this docker-compose.yml will create database container.

### Following this command to run a project 

```bash
npm run dev
```

# Database setup (Supabase)

This repository contains the database schema and seed data used for the take-home assignment.

---

## Database overview

The dataset is based on a subset of the Open Food Facts database (10,000 products).

Tables:
- products
- brands
- categories
- product_categories

Relationships:
- A product belongs to one brand
- A product can belong to multiple categories

---

## Prerequisites

- Supabase account (cloud project)
- Supabase CLI
- psql (PostgreSQL client)

---

## Setup instructions

### 1. Create a Supabase project

Create a new Supabase project using the Supabase dashboard.

---

### 2. Link the project locally

Run the following commands:

    supabase login
    supabase link --project-ref PROJECT_REF

You can find PROJECT_REF in:
Supabase Dashboard → Project Settings → General

---

### 3. Apply database schema

Run:

    supabase db push

This will create all required tables.

---

### 4. Seed the database

Run:

    psql "DATABASE_URL" -f supabase/seed.sql

You can find DATABASE_URL in:
Supabase Dashboard → Project Settings → Database → Connection string (URI)

---

### 5. Verify setup (optional)

Run:

    select count(*) from products;

Expected result: approximately 10,000 products.

---

## Notes

- The schema is intentionally minimal.
- You are free to add indexes or adjust the schema if needed.

---

## Data source

Product data is sourced from the open Open Food Facts database:
https://world.openfoodfacts.org

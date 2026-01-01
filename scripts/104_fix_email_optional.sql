-- Make customer_email optional since it's marked as optional in the checkout form
ALTER TABLE orders ALTER COLUMN customer_email DROP NOT NULL;

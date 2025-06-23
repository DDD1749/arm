/*
  # Clear existing orders and update order display

  1. Changes:
    - Clear all existing orders and order items
    - Add delivery address display to orders
*/

-- Clear existing orders and order items
DELETE FROM order_items;
DELETE FROM orders;
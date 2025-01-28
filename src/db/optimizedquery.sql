SELECT id, from_account, to_account, amount, date 
FROM transactions
WHERE customer_id = '12345'
ORDER BY date DESC
LIMIT 50;
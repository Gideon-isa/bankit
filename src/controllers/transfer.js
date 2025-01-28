
const crypto = require('crypto');

/**
 * @swagger
 * /api/user/transfer/:
 *   post:
 *     summary: Send amount to another account.
 *     tags:
 *       - transfer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountNumber:
 *                 type: integer
 *                 example: 0000000000
 *               amount: 
 *                  type: decimal
 *                  example: 0.00
 *               receipientAccountNumber:
 *                  type: interger
 *                  example: 0000000000
 *     responses:
 *       200:
 *         description: amount sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Amount has been tranferred successfuklly
 *                 account number:
 *                   type: integer
 *                   example: 000000000
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed Transaction
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to transfer
*/



const transfer = async (req, res) => {
  // In-memory storage for transactions (replace with a database in a real-world scenario)
  const transactions = [];
    const { accountNumber, amount, receipientAccountNumber } = req.body;


    // Check for duplicate transactions
  const existingTransaction = transactions.find(
    (t) => t.fromAccount === accountNumber 
    && t.toAccount === receipientAccountNumber 
    && t.amount === amount);

  if (existingTransaction) {
    return res.status(400).json({ error: 'Duplicate transaction' });
  }

  
    try {
      // trnasfering fund transfer
      console.log(`Transferring ${amount} from sender ${accountNumber} to receiver ${receipientAccountNumber}`);
  
      // Generate a unique transaction ID
      const transactionId = crypto.randomUUID();

      // Add transaction ID to the processed set
      transactions.push({ id: transactionId, accountNumber, receipientAccountNumber, amount });
  
      // Respond with success
      return res.status(200).json({
        message: 'Transfer successful',
        transactionId: transactionId,
      });
    } catch (error) {
      // Handle unexpected errors
      return res.status(500).json({
        error: 'An error occurred during the transfer',
        details: error.message,
      });
    }
};

module.exports = {
    transfer
};

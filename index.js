document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Render expenses
    function renderExpenses() {
        expenseList.innerHTML = '';
        let total = 0;
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
        <span>${expense.description}</span>
        <span>₹${expense.amount.toFixed(2)}</span>
        <button onclick="deleteExpense(${index})">Delete</button>
      `;
            expenseList.appendChild(li);
            total += parseFloat(expense.amount);
        });
        totalAmount.textContent = `₹${total.toFixed(2)}`;
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // Add expense
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value.trim();
        const amount = parseFloat(document.getElementById('amount').value);

        if (description && !isNaN(amount) && amount > 0) {
            expenses.push({
                description,
                amount
            });
            renderExpenses();
            form.reset();
        } else {
            alert('Please enter a valid description and amount!');
        }
    });

    // Delete expense
    window.deleteExpense = (index) => {
        if (confirm('Are you sure you want to delete this expense?')) {
            expenses.splice(index, 1);
            renderExpenses();
        }
    };

    // Initial render
    renderExpenses();
});
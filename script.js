// Loading expense from local storage on page lo
let expenses = [];
window.onload = function () {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (savedExpenses) {
        expenses = savedExpenses;
        updateExpenses();
    }
};

// Save expenses to local storage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function addExpense() {
    const description = document.getElementById('new-description').value;
    const amount = parseFloat(document.getElementById('new-amount').value);
    const date = document.getElementById('new-date').value;

    if (description && ! isNaN(amount) && date) {
        const expense = { description, amount, date };
        expenses.push(expense);
        updateExpenses();
        saveExpenses();
    } else {
        alert("Please fill in all fields correctly.");
        return;
    }

    document.getElementById('new-description').value = "";
    document.getElementById('new-amount').value = "";
    document.getElementById('new-date').value = "";
}

function updateExpenses() {
    const expenseTbody = document.getElementById('expense-tbody');
    
    //Clear existing rows except the input row
    expenseTbody.innerHTML = expenseTbody.rows[0].outerHTML;

    //Add each expense as a new row in the table
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td 
        contenteditable="true" 
        onblur="editExpense(${index},
        'description', this.innerText)">${expense.description}</td>

        <td 
        contenteditable="true" 
        onblur="editExpense(${index},
        'amount', this.innerText)">N${expense.amount.toFixed(2)}</td>

        <td 
        contenteditable="true" 
        onblur="editExpense(${index},
        'date', this.innerText)">${expense.date}
        </td>

        <td><button onclick="deleteExpense(${index})">Delete</button></td>
        `;
        
        expenseTbody.appendChild(row);
    }); 

    updateTotal();
    saveExpenses();
}

function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    document.getElementById('total').textContent = total.toFixed(2);
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenses();
    saveExpenses();
}

function editExpense(index, field, value) {
    if (field, value) {
        value = parseFloat(value.replace('N', '')) || 0;
    }
    expenses[index][field] = value;
    updateTotal();
    saveExpenses();
}

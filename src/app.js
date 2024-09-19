// app.js

document.getElementById('userForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const age = document.getElementById('age').value;

  if (!username || !age) {
      displayMessage('Please fill in all fields.', 'error');
      return;
  }

  if (parseInt(age, 10) < 18) {
      displayMessage('You must be at least 18 years old.', 'error');
  } else {
      displayMessage(`Welcome, ${username}!`, 'success');
  }
});

function displayMessage(message, type) {
  const output = document.getElementById('output');
  output.textContent = message;
  output.className = type;
}

// Export the functions for testing
module.exports = { displayMessage };

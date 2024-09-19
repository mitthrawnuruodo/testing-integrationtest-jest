import { displayMessage, setupFormHandler } from '../src/app';  // Import the setupFormHandler

describe('Form integration tests', () => {
  beforeEach(() => {
    // Set up the HTML structure before each test
    document.body.innerHTML = `
      <div class="container">
        <form id="userForm">
          <label for="username">Username:</label>
          <input type="text" id="username" required>
          <label for="age">Age:</label>
          <input type="number" id="age" required>
          <button type="submit">Submit</button>
        </form>
        <div id="output"></div>
      </div>
    `;

    // Call the function to attach event listeners after setting up the DOM
    setupFormHandler();
  });

  // Directly test the displayMessage function
  it('should update the DOM when displayMessage is called', () => {
    displayMessage('Test message', 'success');

    const output = document.getElementById('output');
    expect(output.textContent).toBe('Test message');  // Check if the text content is correct
    expect(output.className).toBe('success');  // Check if the className is correctly set
  });

  it('should show error if fields are empty on form submission', () => {
    // Simulate form submission with empty fields
    const form = document.getElementById('userForm');
    form.dispatchEvent(new Event('submit'));

    // Check if the error message is displayed
    const output = document.getElementById('output');
    expect(output.textContent).toBe('Please fill in all fields.');
    expect(output.className).toBe('error');
  });

  it('should show error if age is less than 18 on form submission', () => {
    // Set form values
    document.getElementById('username').value = 'JohnDoe';
    document.getElementById('age').value = '17';

    // Simulate form submission
    const form = document.getElementById('userForm');
    form.dispatchEvent(new Event('submit'));

    // Check if the age-related error message is displayed
    const output = document.getElementById('output');
    expect(output.textContent).toBe('You must be at least 18 years old.');
    expect(output.className).toBe('error');
  });

  it('should display welcome message for valid input on form submission', () => {
    // Set form values
    document.getElementById('username').value = 'JohnDoe';
    document.getElementById('age').value = '25';

    // Simulate form submission
    const form = document.getElementById('userForm');
    form.dispatchEvent(new Event('submit'));

    // Check if the welcome message is displayed
    const output = document.getElementById('output');
    expect(output.textContent).toBe('Welcome, JohnDoe!');
    expect(output.className).toBe('success');
  });
});

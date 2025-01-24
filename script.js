body {
    font-family: Arial, sans-serif;
    background-color: #ffe6f0;
    color: #333;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  
  h1 {
    color: #ff66a3;
    margin: 20px;
  }
  
  button {
    background-color: #ff66a3;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    margin: 10px;
    border-radius: 8px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #e05591;
  }
  
  .card, .history {
    background: white;
    margin: 20px auto;
    padding: 20px;
    width: 90%;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .history ul {
    padding: 0;
    list-style-type: none;
  }
  
  .history li {
    border-bottom: 1px solid #ddd;
    padding: 5px 0;
  }
  
  @media (max-width: 600px) {
    h1 {
      font-size: 20px;
    }
    button {
      font-size: 14px;
      padding: 8px 16px;
    }
  }
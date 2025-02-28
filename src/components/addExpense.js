import { api, setAuthToken } from "../api";
import styleClasses from "../styles/style.module.css";
import { useState } from "react";

const AddExpense = ({ refreshExpenses }) => {
  const [expense, setExpense] = useState({
    amt: "",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleExpenseAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);

    try {
      await api.post("expenses/add", expense);
      setExpense({ amt: "", category: "", description: "", date: "" });

     
      refreshExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styleClasses.formContainer}>
      <h4>Add new expense</h4>
      <form onSubmit={handleExpenseAdd}>
        <input
          type="number"
          name="amt"
          placeholder="Amount $"
          value={expense.amt}
          onChange={handleChange}
          required
        />
        <select name="category" value={expense.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="school">School</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;

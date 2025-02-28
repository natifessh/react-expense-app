import { useEffect, useState } from "react";
import { api, setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";
import AddExpense from "../components/addExpense";
import styleClasses from "../styles/style.module.css";

const DashBoard = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
    
    try {
      const response = await api.get("/expenses/all");
      setExpenses(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching expenses");
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);

    try {
      await api.delete(`/expenses/delete/${id}`);
      setExpenses(expenses.filter((exp) => exp.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className={styleClasses.dashboardContainer}>
      
      <AddExpense refreshExpenses={fetchExpenses} />

      {expenses.length === 0 ? (
        <p>You have no expenses currently.</p>
      ) : (
        <div className={styleClasses.expensesList}>
          <h2>Your Expenses</h2>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                <p>Category: {expense.category}</p>
                <p>Amount: ${expense.amount}</p>
                <p>Description: {expense.description}</p>
                <p>Date: {expense.date}</p>
                <div className={styleClasses.btnsDiv}>
                  <button onClick={() => navigate(`/DashBoard/update/${expense.id}`)}>Update</button>
                  <button onClick={() => handleDelete(expense.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashBoard;

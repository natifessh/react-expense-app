import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../api"; 
import styleClasses from "../styles/style.module.css";

const UpdateExpense = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [updatedExpense, setUpdatedExpense] = useState({
    amt: '',
    description: '',
    category: '',
    date: '',
    id: ''
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchExpenseData = async () => {
      if (id) {
        const token = localStorage.getItem("token");
        if (token) {
          setAuthToken(token);
        }
        try {
          const response = await api.get(`expenses/expense/${id}`); 
          const expenseData = response.data;
          setUpdatedExpense({
            amt: expenseData.amount,
            description: expenseData.description,
            category: expenseData.category,
            date: expenseData.date,
            id: expenseData.id
          });
        } catch (err) {
          setError('Error fetching the expense data');
          console.error(err);
        }
      }
    };

    fetchExpenseData();
  }, [id]);

  const handleAmountChange = (e) => {
    e.preventDefault();
    setUpdatedExpense({
      ...updatedExpense,
      amt: e.target.value
    });
  };
  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setUpdatedExpense({
      ...updatedExpense,
      description: e.target.value
    });
  };
  const handleCategoryChange = (e) => {
    e.preventDefault();
    setUpdatedExpense({
      ...updatedExpense,
      category: e.target.value
    });
  };
  const handleDateChange = (e) => {
    e.preventDefault();
    setUpdatedExpense({
      ...updatedExpense,
      date: e.target.value
    });
  };
  const handleExpenseUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token); 
    }
    try {
      const response = await api.put(`/expenses/update/${updatedExpense.id}`, {
        amt: updatedExpense.amt,
        description: updatedExpense.description,
        category: updatedExpense.category,
        date: updatedExpense.date
      });
      if (response.status === 200) {
        navigate("/dashboard"); 
      }
    } catch (err) {
      setError('An error occurred while updating the expense');
      console.error(err);
    }
  };

  return (
    <div className={styleClasses.formContainer}>
      <h2>Update Expense</h2>
      <form onSubmit={handleExpenseUpdate}>
        <input
          type="number"
          placeholder="Amount $"
          value={updatedExpense.amt}
          onChange={handleAmountChange}
          required
        />
        <select value={updatedExpense.category} onChange={handleCategoryChange} required>
          <option value="school">School</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <textarea
          placeholder="Description"
          value={updatedExpense.description}
          onChange={handleDescriptionChange}
          required
        ></textarea>
        <input
          type="date"
          value={updatedExpense.date}
          onChange={handleDateChange}
          required
        />
        <button type="submit">Update Expense</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateExpense;

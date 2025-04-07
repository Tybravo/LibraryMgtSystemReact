import { React, useState } from "react";
import axios from "axios";
import '../styles/admindashboard.css'
import '../assetz/dist/styles.css';
import '../assetz/dist/all.css'; 
import CustomButton from "../reusables/CustomButton";
import styles from "../reusables/AddBook.module.css"
import responseStyles from "../reusables/ResponseMessage.module.css"

const AddBook = () => {
    const initialData = {
        bookTitle: "",
        bookAuthor: "",
        bookIsbn: 0,
        bookDescription: "",
        bookLink: "",
        bookCurrency: "",
        bookQuantity: 0,
        bookPrice: 0
      };
    
      const [formData, setFormData] = useState(initialData);
      const [loading, setLoading] = useState(false);
      const [responseMessage, setResponseMessage] = useState("");
      const [responseColor, setResponseColor] = useState("");
    

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    

      const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setResponseMessage("");
      
        console.log("Submitting Data:", JSON.stringify(formData, null, 2));
      
        try {
          const response = await addBook(formData);
          handleSuccess(response.data?.regMsg || "Book added successfully!");
        } catch (error) {
          handleError(error);
        } finally {
          setLoading(false);
        }
      };
      

      const addBook = async (data) => {
        return await axios.post("http://localhost:8080/api/book/addBook", data, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
      };
      

      const handleSuccess = (message) => {
        setResponseMessage(message);
        setResponseColor("green");
        setFormData(initialData);
      };
      
      const handleError = (error) => {
        console.error("Error Response:", error.response?.data || error.message);
        setResponseMessage(error.response?.data || "Failed to add book.");
        setResponseColor("red");
      };
      
    
    
      return (
        <>
              {/* Body */}
              {/* Display the response message only when it's not empty */}
              {responseMessage && (
                <p className={responseColor === "green" ? responseStyles.success : responseStyles.error}>
                  {responseMessage}
                </p>
              )}
                <h2 className={styles.mainHeading}>Add Book Here</h2>


                {/* <div className="main-content"> */}
                <div className="mainBlockPanel">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="bookTitle"
                      className="form-control"
                      placeholder="Book Title"
                      value={formData.bookTitle}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="bookAuthor"
                      className="form-control"
                      placeholder="Book Author"
                      value={formData.bookAuthor}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="bookIsbn"
                      className="form-control"
                      placeholder="Book ISBN"
                      value={formData.bookIsbn === 0 ? "" : formData.bookIsbn}
                      onChange={handleChange}
                      required
                    />
                    <textarea
                      type="text"
                      name="bookDescription"
                      className="form-control"
                      placeholder="Book Description"
                      value={formData.bookDescription}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="bookLink"
                      className="form-control"
                      placeholder="Book Link"
                      value={formData.bookLink}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="bookCurrency"
                      className="form-control"
                      placeholder="Currency"
                      value={formData.bookCurrency}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="bookQuantity"
                      className="form-control"
                      placeholder="Book Quantity"
                      value={formData.bookQuantity === 0 ? "" : formData.bookQuantity}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="bookPrice"
                      className="form-control"
                      placeholder="Book Price"
                      value={formData.bookPrice === 0 ? "" : formData.bookPrice}
                      onChange={handleChange}
                      required
                    />
                    
                    
                    
                    <CustomButton
                      className="btn btn-secondary"
                      type="submit"
                      textContent={loading ? "Adding..." : "Add Book"}
                      disabled={loading} // Disable button when submitting
                    />
                  </form>
                  {/* </div> */}
                </div>
        </>
      );
}

export default AddBook
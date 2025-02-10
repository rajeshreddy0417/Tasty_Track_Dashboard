import React,{useState} from 'react'
import {API_URL} from "../../data/apiPath";


const AddProduct = () => {
  const [productName,setProductName]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState([]);
  const [bestSeller,setBestSeller]=useState(false);
  const [image,setImage]=useState(null);
  const [description,setDescription]=useState("");

  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item !==value));
    }
    else{
      setCategory([...category,value]);
    }
  }

  const handleBestSeller=(event)=>{
    const value=event.target.value==='true'
    setBestSeller(value);
  }

  const handleImageUpload=(event)=>{
    const selectImage=event.target.files[0];
    setImage(selectImage);

  }

  const handleAddProduct=async(e)=>{
     e.preventDefault();
     try {
      const loginToken=localStorage.getItem('loginToken');
      const firmId=localStorage.getItem('firmId');
      if(!loginToken || !firmId){
        console.error("User not authenticated...");
      }

      const formData=new FormData();
      formData.append('productName',productName);
      formData.append('price',price);
      formData.append('description',description);
      formData.append('image',image);
      category.forEach((value)=>{
        formData.append('category',value);
      });
      
      const response=await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        body:formData
      })
      const data=await response.json()
      if(response.ok){
        alert('Product added succesfully');
      }
      setProductName("");
      setPrice("");
      setCategory([]);
      setBestSeller(false);
      setImage(null);
      setDescription("");

     } catch (error) {
      
      alert('Failed to addd Product');
     }
  }



  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleAddProduct}>
          <h3>Add Product</h3>
            <label>Product Name</label>
            <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)}/><br/>
            <label>Price</label>
            <input type='text' onChange={(e)=>setPrice(e.target.value)}/><br/>
            {/* <label>Category</label>
            <input type='text' /><br/> */}
            <div className="checkInp">
              <label>Category</label>
              <div className="inputsContiner">
                <div className="checkboxContainer">
                  <label>Veg</label>
                  <input type='checkbox' value="Veg" checked={category.includes('Veg')} onChange={handleCategoryChange}/>
                </div>
                <div className="checkboxContainer">
                  <label>Non-Veg</label>
                  <input type='checkbox' value="Non-Veg" checked={category.includes('Non-Veg')} onChange={handleCategoryChange}/>
                </div>
              </div>
            </div><br/>
            {/* <label>BestSellet</label>
            <input type='text' /><br/> */}
            <div className="checkInp">
              <label>BestSeller</label>
              <div className="inputsContiner">
                <div className="checkboxContainer">
                  <label>Yes</label>
                  <input type='radio' value="true" checked={bestSeller===true} onChange={handleBestSeller}/>
                </div>
                <div className="checkboxContainer">
                  <label>No</label>
                  <input type='radio' value="false" checked={bestSeller===false} onChange={handleBestSeller}/>
                </div>
              </div>
            </div><br/>
            <label>Description</label>
            <input type='text' onChange={(e)=>setDescription(e.target.value)}/><br/>
            <label>Firm Image</label>
            <input type='file' onChange={handleImageUpload}/><br/>
            <div className='btnSubmit'>
              <button type='submit'>Submit</button>
            </div><br/>
        </form>
    </div>
  )
}

export default AddProduct

import React,{useState} from 'react'
import{API_URL} from '../../data/apiPath'

const AddFirm = () => {
  const [firmName,setFirmName]=useState("")
  const [area,setArea]=useState("")
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);

  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item !==value));
    }
    else{
      setCategory([...category,value]);
    }
  }

  const handleRegionChange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item !==value));

    }
    else{
      setRegion([...region,value]);
    }
  }

  const handleImageUpload=(event)=>{
    const selectImage=event.target.files[0];
    setFile(selectImage);

  }

  const handleFirmSubmit=async(e)=>{
    e.preventDefault();
    try {
      const loginToken=localStorage.getItem('loginToken');
      if(!loginToken){
        console.error("Token not found or user not authenticated");
      }

      const formData=new FormData();
      formData.append('firmname',firmName);
      formData.append('area',area);
      formData.append('offer',offer);
      formData.append('image',file);
      category.forEach((value)=>{
        formData.append('category',value);
      });
      region.forEach((value)=>{
        formData.append('region',value);
      })

      const response=await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
        body:formData
      });
      const data=await response.json();
      if(response.ok){
        console.log(data);
        alert("Firm added Successfully");
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      }else if(data.message==="Vendor can have only one firm"){
        alert("Firm exists 🥗. Only 1 firm can be added ")
      }
      else{
        alert("Failed to add firm");  
      }
      console.log("this is firmId",data.firmId);
      const mango=data.firmId;
      localStorage.setItem("firmId",mango);
    } catch (error) {
      console.error("failed to add firm");
    }
  }


  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
          <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input type='text' name="firmName" value={firmName} onChange={(e)=>setFirmName(e.target.value)}/><br/>
            <label>Area</label>
            <input type='text' name='area' value={area} onChange={(e)=>{setArea(e.target.value)}}/><br/>
            {/* <label>Category</label>
            <input type='text' /><br/> */}
            <div className="checkInp">
              <label>Category</label>
              <div className="inputsContiner">
                <div className="checkboxContainer">
                  <label>Veg</label>
                  <input type='checkbox' checked={category.includes('Veg')} value="Veg" onChange={handleCategoryChange}/>
                </div>
                <div className="checkboxContainer">
                  <label>Non-Veg</label>
                  <input type='checkbox' checked={category.includes('Non-Veg')} value="Non-Veg" onChange={handleCategoryChange}/>
                </div>
              </div>
            </div><br/>
            {/* <label>Region</label>
            <input type='text' /><br/> */}
    
            <div className="checkInp">
              <label>Region</label>
              <div className="inputsContiner">
                <div className="RegionboxContainer">
                  <label>South-Indian</label>
                  <input type='checkbox' value="South-Indian" checked={region.includes('South-Indian')} onChange={handleRegionChange}/>
                </div>
                <div className="RegionboxContainer">
                  <label>North-Indian</label>
                  <input type='checkbox' value="North-Indian" checked={region.includes('North-Indian')} onChange={handleRegionChange}/>
                </div>
                <div className="RegionboxContainer">
                  <label>Chinese</label>
                  <input type='checkbox' value="Chinese" checked={region.includes('Chinese')} onChange={handleRegionChange}/>
                </div>
                <div className="RegionboxContainer">
                  <label>Bakery</label>
                  <input type='checkbox' value="Bakery" checked={region.includes('Bakery')} onChange={handleRegionChange}/>
                </div>
              </div>
            </div><br/>      
            <label>Offer</label>
            <input type='text' name='offer' value={offer} onChange={(e)=>{setOffer(e.target.value)}}/><br/>
            <label>Firm Image</label>
            <input type='file' onChange={handleImageUpload}/><br/>
            <div className='btnSubmit'>
              <button type='submit'>Submit</button>
            </div><br/>
        </form>
    </div>
  )
}

export default AddFirm

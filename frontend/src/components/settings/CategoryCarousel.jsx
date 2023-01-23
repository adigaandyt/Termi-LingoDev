
function CategoryCarousel({category,index,isDisabled,formData,setFormData}){
    const {categoryNameEnglish,categoryNameArabic,categoryNameHebrew}=formData
    const onChange=(e)=>{
        e.preventDefault();
        setFormData((prev)=>{
            return({
                ...prev,
                [e.target.name]:e.target.value
            })
        })
    }
    return (<>
    <div id={`carouselExample${index}`} class="carousel slide h-auto w-auto"  style={{"margin":"auto"}}>
  <div class="carousel-inner">
  <div className='row w-100'>
      <div className='col-6 text-start' >
<button className=" text-dark btn btn-sm" type="button"  data-bs-target={`#carouselExample${index}`} data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden text-top">Previous</span>
</button>
</div>
<div className='col-6 text-end' >
<button className=" text-dark btn btn-sm" type="button"  data-bs-target={`#carouselExample${index}`} data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div>
</div>
    <div class="carousel-item active ">
      {/* <img src="..." class="d-block w-100" alt="..."/> */}
      <div class="mb-1 text-start">
          <label for="recipient-name" class="col-form-label">Category Name in English:<img className=' ' src={require('../../flags/united-states-xs.gif')}/></label>
          <input onChange={onChange} name='categoryNameEnglish' value={categoryNameEnglish} disabled={isDisabled} defaultValue={category.categoryName.english}    type="text" class="form-control" id="recipient-name"/>
        </div>
    </div>
    <div class="carousel-item">
      {/* <img src="..." class="d-block w-100" alt="..."/> */}
      <div class="mb-1 text-start">
          <label for="recipient-name" class="col-form-label">Category Name in Arabic:<img className='text-end' src={require('../../flags/saudi-arabia-xs.gif')}/> </label>
          <input onChange={onChange} name='categoryNameArabic' value={categoryNameArabic} disabled={isDisabled} defaultValue={category.categoryName.arabic}    type="text" class="form-control" id="recipient-name"/>
        </div>

    </div>
    <div class="carousel-item">
      {/* <img src="..." class="d-block w-100" alt="..."/> */}
      <div class="mb-1 text-start">
          <label for="recipient-name" class="col-form-label">Category Name in Hebrew: <img className=' text-start ' src={require('../../flags/israel-xs.gif')}/></label>
          <input onChange={onChange} name='categoryNameHebrew' value={categoryNameHebrew} disabled={isDisabled} defaultValue={category.categoryName.hebrew}      type="text" class="form-control" id="recipient-name"/>
        </div>

    </div>
  </div>
  {/* <button class="carousel-control-prev text-green" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next text-green" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button> */}
</div>
    </>)
}
export default CategoryCarousel
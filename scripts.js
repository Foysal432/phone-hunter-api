const loadData =async(searchText, isShowAll)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones =data.data
    ShowPhone(phones, isShowAll)
}

const ShowPhone = (phones, isShowAll) =>{
// console.log(phones)
const placeDiv =document.getElementById('card-container')
// clear phone container cards before adding new cards
placeDiv.textContent='';
// remove and add show all btn
const button =document.getElementById('show-all-container')
if (phones.length >12 && !isShowAll) {
    button.classList.remove('hidden')
}
else{
    button.classList.add('hidden')
}
// console.log('is Show all', isShowAll)
// phones slice is not show all
if (!isShowAll) {
    phones =phones.slice(0,12)
}
phones.forEach(phone => {
    // console.log(phone)
    // create a div
    const phoneDiv =document.createElement('div');
    phoneDiv.classList =`card bg-gray-100 shadow-xl`;
    phoneDiv.innerHTML =`
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button  onclick="ShowModal('${phone.slug}');show_modal_5.showModal()" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `
// 4 append child
 placeDiv.appendChild(phoneDiv)
})
// off loading
toggleLoading(false)
}

// show details button 

const ShowModal =async (id)=>{
    // console.log(id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data
     showTheModalDetails(phone)
}


// show the modal
const showTheModalDetails =(phones)=>{
   console.log(phones)
   const phoneName =document.getElementById('show-phone-name');
   phoneName.innerText=phones.name
const divContainer = document.getElementById('div-container');
divContainer.innerHTML =`
<img src="${phones.image}" alt="" />
<p>Storage:${phones.mainFeatures.storage}</p>
<p>DisplaySize:${phones.mainFeatures.displaySize}</p>
<p>ChipSet:${phones.mainFeatures.chipSet}</p>
<h2>Memory:${phones.mainFeatures.memory}</h2>
<h2>Slug:${phones?.slug}</h2>
<h2>ReleaseDate:${phones?.releaseDate}</h2>
<h2>Brand:${phones?.brand}</h2>
<h1>GPS:${phones?.others?.GPS}</h1>
`
}





// heandel search

const handleSearch = (isShowAll) =>{

    toggleLoading(true)
  const field = document.getElementById('input-field').value;
//   console.log(field)
  loadData(field,isShowAll)
  field.value =''
}
const toggleLoading =(isLoading)=>{
    const load =document.getElementById('loading-container')
   if (isLoading) {
    load.classList.remove('hidden')
   }
   else{
    load.classList.add('hidden')
   }
}

// handle show all

const handleShowAll =()=>{
    handleSearch(true)
}





// another input
// const handleSearch2 =() =>{
//     const field2 = document.getElementById('input-field2').value;
   
//     loadData(field2)
//     field2.value=''
// }

// loadData()
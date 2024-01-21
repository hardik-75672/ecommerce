import { last } from "prelude-ls";

// A mock function to mimic making an async request for data
export  function fetchAllProducts() {
  return new Promise( async (resolve) =>{
    const response=await fetch('http://localhost:8080/products');
    const data=response.json();
    resolve({data});
    
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products/'+id) 
    const data = await response.json()
    console.log(data)
    resolve({data})
  }
  );
}

export function fetchProductBySearch(search) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response=await fetch('http://localhost:8080/products?brand='+search);
    const data = await response.json()
    const l =response.headers.get('X-Total-Count');
    console.log(data)
    resolve({data:{products:data,totalItems:l}})
  }
  );
}

export  function fetchProductByFilters(filter,sort,page) {

  // filter={"category":["smartphone","laptops"]}
  //sort={_sort:"proce",order:"desc"}
  //page={_page=7&_limit=20}
  let queryString='';
  for(let key in filter){
    const categoryValues=filter[key];
    if(categoryValues.length>0){
      const lastValue=categoryValues[categoryValues.length-1]
      queryString+=`${key}=${lastValue}&`
    }
  }
  for(let key in sort){
    queryString+=`${key}=${sort[key]}&`
  }

  for(let key in page){
    queryString+=`${key}=${page[key]}&`
  }
  
  return new Promise( async (resolve) =>{
    const response=await fetch('http://localhost:8080/products?'+queryString);
    const data=await response.json();
    const l =response.headers.get('X-Total-Count');
    // const l=data.length;
    resolve({data:{products:data,totalItems:l}})
    
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:8080/products/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
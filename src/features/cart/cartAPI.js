// A mock function to mimic making an async request for data
export function addCartApi(item) {
  return new Promise( async (resolve) =>{
    const response=await fetch('http://localhost:8080/cart',{
      method:'POST',
      body:JSON.stringify(item),
      headers:{'content-type':'application/json'}
    });
    const data=response.json();
    resolve({data});
  }
  );
}
 
export function fetchByUserId(userid) {
  return new Promise( async (resolve) =>{
    const response=await fetch('http://localhost:8080/cart?user='+userid);
    const data=response.json();
    // console.log(data);
    resolve({data});
  }
  );
}

export function changeQty(update) {
  return new Promise( async (resolve) =>{
    console.log(update.id);
    const response=await fetch('http://localhost:8080/cart/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    });
    const data=response.json();
    // console.log(data)
    resolve({data});
  }
  );
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => { 
    const response = await fetch('http://localhost:8080/cart/'+itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data:{id:itemId} });
  });
}


export function resetCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchByUserId(userId);
    const items = await response.data;
    console.log(items)
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({status:'success'})
  });
}
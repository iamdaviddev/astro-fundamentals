import type { APIRoute } from "astro";


export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  if(!data.isRead){
    data.isRead = false;
  }

  if(data.rating === ""){
    data.rating = null;
  }

  for(const item in data){
    item.trim()
  }
  
  try {

    const res = await fetch("http://localhost:3000/links", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if(!res.ok){
      throw new Error("There was a problem with the db connection")
    }

    const dbRes = await res.json();
    if(dbRes.id){
      return new Response(
        JSON.stringify({
          message: "Success!",
          sucess: true,
        }),
        {
          status: 200,
        }
      )
    } else{
      throw new Error("There was a problem with the db response")
    }

  } catch (e) {

    console.error(e)
    return new Response(JSON.stringify({
      message: e,
      sucess: false,
    }),
    {
      status: 404,
    }
    );

  }
}
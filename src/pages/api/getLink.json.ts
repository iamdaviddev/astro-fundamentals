import type { APIRoute } from "astro";

export const GET : APIRoute = async ({ params, request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get("id");
  
  if(id){

    try {
        
      const res = await fetch(`http://localhost:3000/links${id}`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
        },
      })
  
      if(!res.ok){
        throw new Error("There was a problem with the db connection")
      }
  
      const dbRes = await res.json();
      if(dbRes.id){
        return new Response(
          JSON.stringify({
            data: dbRes,
            sucess: true,
          }),
          {
            status: 200,
          }
        )
      } else{
        throw new Error("There was a problem with the db response")
      } 
        
    } catch (e){
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
  try {
    
    const res = await fetch(`http://localhost:3000/links`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
      },
    })

    if(!res.ok){
      throw new Error("There was a problem with the db connection")
    }

    const dbRes = await res.json();
    if(dbRes.length){
      return new Response(
        JSON.stringify({
          data: dbRes,
          sucess: true,
        }),
        {
          status: 200,
        }
      )
    } else{
      throw new Error("There was a problem with the db response")
    } 
      
  } catch (e){
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
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function Testai(req,res){
  model.invoke("What is ai explain under 100 words").then((response)=>{
     console.log(response.text)
  })
}
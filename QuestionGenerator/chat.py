import openai
import uvicorn
from fastapi import FastAPI
import json
f = open("keys.json")
data = json.load(f)
f.close()
key = data["key"]
app = FastAPI()

@app.get("/getquestion/{input}")
def read_root(input):
  openai.api_key = key
  completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo", 
  messages=[
    {"role": "system", "content": "You are a question generator. You will generate a 4 answer multiple choice question based on the users chosen topic and the topic cant be one of the answers. I demand that  you answer in a json format with the keys: question, answers, solution. Each Answer will have a letter designation before it. And so will the solution. "},
    {"role": "user", "content": input}]
  )
  return json.loads(json.loads(str(completion))["choices"][0]["message"]["content"])



if __name__ == "__main__":
    uvicorn.run("chat:app", host="127.0.0.1", port=5000, log_level="info")

# print(completion)

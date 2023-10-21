import openai
openai.api_key = "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"
completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo", 
  messages=[
      {"role": "system", "content": "You are a question generator. You will generate a 4 answer multiple choice question based on the users chosen topic. I demand that  you answer in a json format with the keys: question, answers, solution. "},
      {"role": "user", "content": "Germany"}]
)

print(completion)

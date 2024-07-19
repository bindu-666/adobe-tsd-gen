const API_URL = "https://firefall-stage.adobe.io/v1/chat/completions";
const API_KEY = "eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEtc3RnMS1rZXktYXQtMS5jZXIiLCJraWQiOiJpbXNfbmExLXN0ZzEta2V5LWF0LTEiLCJpdHQiOiJhdCJ9.eyJpZCI6IjE3MjEyODUxOTQwMjRfNWFlZmJlOTktNzlhYi00NDYxLWIyM2EtYjgxZjcyZWY0ZWI5X3ZhNmMyIiwidHlwZSI6ImFjY2Vzc190b2tlbiIsImNsaWVudF9pZCI6Ik1hcmtldG9HRENWMiIsInVzZXJfaWQiOiJNYXJrZXRvR0RDVjJAQWRvYmVTZXJ2aWNlIiwiYXMiOiJpbXMtbmExLXN0ZzEiLCJhYV9pZCI6Ik1hcmtldG9HRENWMkBBZG9iZVNlcnZpY2UiLCJjdHAiOjAsInBhYyI6Ik1hcmtldG9HRENWMl9zdGciLCJydGlkIjoiMTcyMTI4NTE5NDAyNF9jM2RlOTZmZS04MjRkLTRhMDItOThlOS03YjdiZmIwNTFhOGJfdmE2YzIiLCJtb2kiOiJmOWQ4MWVhZSIsInJ0ZWEiOiIxNzIyNDk0Nzk0MDI0IiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwiY3JlYXRlZF9hdCI6IjE3MjEyODUxOTQwMjQiLCJzY29wZSI6InN5c3RlbSJ9.hWSi69sIpu6ogsT_qVBhqAu7eDW5Zxq0XHxMvfkj-3-C3OJkhoPNLunNKfe5iWNtQfItLqmd5ABVOihDqPuIxR5Hn6sScVrrEkuBLlmVJfYZaJFhnCvJkTb4bquBnM2Iw6qBupdy4VawqNFy3zXHY2JUgZtpd5ORiUGFuaqb2b2YxMISwouRNv1_jKPNM-cl0WDr1-tHkHi4qTENf5zkc5LhM_di5n0bvIOFP9leJyTzzQD6TR-Od6olblBO8a4sn20TelcFOPjnWk50Xw5qBkzvL6jFV8fqwStrYzP2QeNCSXzlL-n17Ml859xUDDBOCEzt_6o48gfCBnLMb-xDyQ"; // Replace with your actual API key

const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
    "x-api-key": "MarketoGDCV2",
    "x-gw-ims-org-id": "154340995B76EEF60A494007@AdobeOrg"
  },
  body: JSON.stringify({
    "messages": [
      {
        "role": "system",
        content: "You are a helpful assistant who will answer only accoding to the user's input in text format. Take reference of this url when answering the question, url: `\nhttps://experienceleague.adobe.com/en/docs/platform-learn/implement-web-sdk/applications-setup/setup-target\n`. when prehding snippet code is asked, extract the code from the url to provide exact code from the url"
      },
      {
        "role": "user",
        "content": ""
      }
    ],
    "llm_metadata": {
      "model_name": "gpt-4-32k",
      "llm_type": "azure_chat_openai",
      "temperature": 0.1,
      "max_tokens": 20000,
      "top_p": 0.95,
      "frequency_penalty": 0,
      "presence_penalty": 0
    },
    "response_format": {
      "type": "json_object"
    },
    "store context": "true"
  })
};

const fetchPreHidingSnippet = async () => {
  const response = await fetch(API_URL, requestOptions);
  const completion = await response.json();

  console.log("API Response:", completion);

  if (completion.generations && completion.generations.length > 0 && completion.generations[0].length > 0) {
    const generatedText = completion.generations[0][0].message.content;
    console.log("Generated Text:", generatedText);
  } else {
    console.log("No generated text found in the API response.");
  }
};

fetchPreHidingSnippet();

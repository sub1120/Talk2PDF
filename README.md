<div align="center">
  <br>
  <h2> :dizzy: Talk2PDF | Now Ask any question to your PDF :dizzy:</h2>
  
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript.js](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![js.langchain](https://img.shields.io/badge/langchain%20js-000000?style=for-the-badge&logo=reactjs&logoColor=white)

  <p>Talk2PDF is a revolutionary application that empowers users to interact with their PDF documents like never before.</p>
</div>


## Tabel of Content
- Demo Video 
- Client Setup
- Server Setup
- API End Points
- Contact

### Demo Video

https://github.com/sub1120/Talk2PDF/assets/43786036/585c5ad5-958c-41fa-890b-eec0d71bbfdb

Below steps will guide you, how to set up your project locally. To get a local copy up and running follow these simple example steps.

### Client Setup

1. Clone Repo
```
git clone https://github.com/sub1120/Talk2PDF.git
```

2. Install pnp
```
npm i -g pnpm
```

3. Install dependencies for client
```
cd client; pnpm i
```

4. Create a .env file and put this
```
VITE_API_URL=http://localhost:4001/api/v1
```

5. Start client locally
```
cd client; pnpm run dev
```

### Server Setup

1. Install dependencies for server
```
cd server; npm i
```

3. Create a .env file and put this
```
PORT=4000
GOOGLE_PALM_API_KEY=YOUR-API-KEY
```

Note: To create an `GOOGLE_PALM_API_KEY`, please visit [Get an API key](https://developers.generativeai.google/tutorials/setup)

5. Start server locally
```
cd server; npm run dev
```

### API End Points 

#### 1. Upload documents

```
POST /api/v1/doc/upload
```

#### 2. Delete all documents

```
DEL /api/v1/doc/delete
```

#### 3. Get answer of given question

```
POST api/v1/chat/answer
```

Body

```JSON
{
  "question": "Your question"
}
```

### Contact
Contact on `subhamsahu1120@gmail.com` for any kind of support

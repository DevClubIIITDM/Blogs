---
title: "How to Call an API in Express.js"
date: "2024-01-18"
excerpt: "Learn how to make API calls using Express.js and axios, including GET and POST requests with practical examples."
author:
  name: "Backend Team"
  avatar: "/placeholder-user.jpg"
  role: "Backend Developer"
category: "Backend Development"
readTime: "6 min read"
image: "/placeholder.jpg"
tags: ["express", "api", "axios", "nodejs", "javascript", "backend"]
---

# How to Call an API in Express.js

## What is an API?

An **API (Application Programming Interface)** is a set of defined rules and protocols that allow different software applications to communicate with each other. It acts as an interface between two systems, enabling them to exchange data without needing to understand each other's internal logic.

## What are its Applications in Our Daily Life?

Let's understand this in an easier way with the help of an example:

Let's say you want to book a flight ticket from Delhi to Bangalore and you visit some third party websites like Ixigo, SkyScanner etc to book the ticket at the cheapest fare. When you search on these third party websites it basically searches from all different airlines and tells you the best suitable option. So how do these websites get the data (like number of seats booked, remaining etc) they need from each airline?

So this is where API comes into play. Airline companies share the required data to these third party websites through APIs.

These websites call the API whenever they need some data. The API authenticates the third party with the help of an API key provided by the airline companies. After authentication, API fetches the data from the airline companies and sends it to the websites.

So, basically API governs the data shared by the airline companies to these third party websites.

Another example of API can be the sign up with Google or sign with Facebook etc options which we see while making a new account on any new website which basically is for authenticating a user which the websites do by collecting the required user data from their Google, Facebook accounts through an API.

API can be free or paid. There are several free APIs available on [GitHub](https://github.com/public-apis/public-apis) you can freely use them.

## Advantages of API

- **Reusability**: It encourages to use an existing functionality rather than building each required component from scratch
- **Data Control & Security**: APIs give companies control over **what** data is shared, **how** it's accessed, and **who** can access it.
- **Scalability**: APIs make it easier to scale services
- **Revenue generation**: Companies can generate revenue by making their APIs paid.

And many more....

## What Does It Mean to Call an API?

Calling an API is a general broad term which basically refers to interacting with the API like getting data from an API (which is also known as fetch an API), sending some data to the API (making a post request to an API), updating or deleting some data.

## How to Fetch and Post Data with GET and POST Methods in Express.js

Now we will see how to fetch and post data with GET and POST methods in Express.js with help of axios module.

### Fetch Data (GET Method)

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://goweather.xyz/weather/ny');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

As soon as the user visits `localhost:3000` a GET request will be done on this free API `https://goweather.xyz/weather/ny`.

The response from the API will be sent to the user by `res.json()` method.

### Post Data (POST Method)

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/users', async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email
    };

    const response = await axios.post('https://api.example.com/users', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-api-token'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

The POST method takes 3 arguments:
1. The URL of the API
2. The data you want to send (i.e., JavaScript object or JSON)
3. The configurations i.e., content type, timeout or the API token etc. (The last argument is optional) 
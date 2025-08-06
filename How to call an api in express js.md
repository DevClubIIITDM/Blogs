- WHAT IS AN API?

- WHAT ARE IT'S APPLICATIONS IN OUR DAILY LIFE ?

An **API (Application Programming Interface)** is a set of defined rules
and protocols that allow different software applications to communicate
with each other. It acts as an interface between two systems, enabling
them to exchange data without needing to understand each other's
internal logic.

Let's understand this in an easier way with the help of an example:

Lets say you want to book a flight ticket from Delhi to Bangalore and
you visit some third party websites like Ixigo , SkyScanner etc to book
the ticket at the cheapest fare. When you search on these third party
websites it basically searches from all different airlines and tells you
the best suitable option . So how do these websites get the data (like
number of seats booked , remaining etc) they need from each airline ?

So this is where API comes into play.Airline companies share the
required data to these third party webites through API's.

These websites call the API whenever they need some data . The API
authenticates the third party with the help of an API key provided by
the airline companies . After authentication ,API fetches the data from
the airline companies and send it to the websites.

So, basically API governs the data shared by the airline companies to
these third party websites

An another example of API can be the sign up with google or sign with
facebook etc options which we see while making a new account on any new
website which basically is for authenticating a user which the websites
do by collecting the required user data from their google , facebook
accounts through an API.

API can be free or paid . There are several free API's available on
github link:<https://github.com/public-apis/public-apis> you can freely
use them

- ADVANTAGES OF API

<!-- -->

- Reusability: It encourages to use an existing functionality rather
  than building each required component from scratch

- Data Control & Security : APIs give companies control over **what**
  data is shared, **how** it's accessed, and **who** can access it.

- Scalability: APIs make it easier to scale services

- Revenue generation: Companies can generate revenue by making their
  API's paid .

and many more....

WHAT DOES IT MEAN TO CALL AN API?

Calling an API is a general broad term which basically refers to
interacting with the API like getting data from an API (which is also
known as fetch an API) , sending some data to the API (making a post
request to an API) , updating or deleting some data .

- Now we will see how to fetch and post data with get and post method in
  express js with help of axios module

![](media/image1.png){width="7.435416666666667in" height="4.875in"}Fetch
data (get method)

As soon as the user visits the localhost/3000 a get request will be done
on this free api <https://goweather.xyz/weather/ny>

The response from the api will be sent to the user by res.json() method

Post data (post method)

![](media/image2.png){width="7.290972222222222in"
height="5.427083333333333in"}The post method takes 3 arguments the url
of the api , the data you want to send (i.e java script object or a
json) and lastly the configurations i.e content type ,timeout or the api
token etc .The last argument is optional .

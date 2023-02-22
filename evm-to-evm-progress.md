## February 20, 2023
&nbsp;
### Solana NFT loading as broken issue [ [ VIEW JIRA TICKET ](https://xp-network.atlassian.net/browse/XBU-1?atlOrigin=eyJpIjoiNzhmODczZmYyYzhkNDBiMzkxY2IzMjA0N2E4OGI2YmIiLCJwIjoiaiJ9) ]


**Progress:**

> Looked into the jsx of the component that renders the nft cards, checked the if conditions responsible for rendering nft image or the broken token uri component, checked the nft list in 


---

&nbsp;

## February 21, 2023
&nbsp;

### Solana NFT loading as broken issue [ [ VIEW JIRA TICKET ](https://xp-network.atlassian.net/browse/XBU-1?atlOrigin=eyJpIjoiNzhmODczZmYyYzhkNDBiMzkxY2IzMjA0N2E4OGI2YmIiLCJwIjoiaiJ9) ]

**Problem:**

> Some of the solana nfts are loading as 'Broken Token Uri' because they do not have the `image` field in them.

&nbsp;

**Solution:**
> Every nft does have a  `uri` field in it and hitting that uri gives us this data in response

````
    {
        "name": "Murder Head 817",
        "description": "Murder Head Death Club",
        "edition": 817,
        "image": "https://murderheaddeathclub.com/assets/nft/4480.png",
        "attributes": [
            {
                "trait_type": "BACKGROUND",
                "value": "ORANGE RED GRADIENT"
            },
            ...
        ]
    }
````

I can then use the `image` field from this response data inside the image tag `<img src={image}>` to load the image.

&nbsp;

**Blocker**

these uri such as https://murderheaddeathclub.com/assets/nft/4480.png ARE open-ended, making a GET request to this uri from postman does give me the response in the above code block but when I make an axios GET request to the the URI inside the project, it does not work and gives `CORS` error.

I tried

- making API call through axios and fetch
- adding headers `"Access-Control-Allow-Origin": "*", 'Content-Security-Policy': 'upgrade-insecure-requests'` 
- others solutions i got were all related to backend not frontend


&nbsp;

---

&nbsp;

## February 22, 2023
&nbsp;
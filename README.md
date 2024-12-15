## About
A very simple CJS script for connecting to ViewHub stream chat. <p>
In addition to chat text messages, you can also catch "Subscription", "Unsub", "Current Viewers" and "Donation" events.

## How to use
Since this is javascript, you need `nodejs` and `npm` installed.
Create a folder and copy <a href="https://github.com/Mikulskii/viewhub-simplest-chat-logger/blob/main/viewhub_chat_logger.js">`viewhub_chat_logger.js`</a> to it.<p>
Being inside the newly created directory, you need to install the `ws` package:<p> 
```
npm i ws
```
Unfortunately, I couldn't find an easy way to extract the `user_id` that is required to connect to the desired chat.<p>
All my attempts to do this via fetch returns an error with the code 403 (Forbidden).<p>
Therefore, this will have to be done manually. Substitute the name of the channel in <p>
`https://vh.live/api/v2/profile/{channelname}` <p>
And follow the educated link.<p>
The first line under data -> id is the same `user_id`.<p>
Insert the user_id name in `const channel = ""`

Run with
```
node viewhub_chat_logger.js
```


# SG Pass Status

Check SG Pass status and send status update to telgram bot. Make sure you see "Pending!" status from MOM. Otherwise, this won't work!

## Setup Guide

First install necessary packages

```
npm install
```

Copy `.env.example` to `.env` and configure. Run the following command via project directory and make sure there is no error. Ofcourse, you need to update the information correctly. Otherwise, it won't work. Since, I haven't check for the minior cases.

```
node index --passport="MF123456" --name="Kyaw Kyaw" --dob="22/11/1990"
```

Finally, you can set up with cron to run every hour! This will help check for you every hour and give you update when the status goes from "Pending!" to something else.

## Notes

I just make this for my usecase, please feel free to modify and use base on what you need.
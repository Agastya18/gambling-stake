
# Stake Clone

Welcome to the Dice Game, one of the popular game on Stake. This gambling app allow user to bet amount on the outcome range.

## Features

- Simple Gameplay: Place your bet and select the range to see if you win.
- Provably Fair: Our dice rolls are generated using a fair algorithm ensuring    randomness and fairness.
- Customizable Bets: Adjust your bet amount and potential win multipliers.
- User-Friendly Interface: Clean and intuitive design for a seamless user experience.
- Wallet Management: Easily manage your betting funds with a built-in wallet system.
- Razorpay Wallet Integration: Store and manage money in your wallet securely using Razorpay.

## Tech Stack

**Client:** React, Material UI and dasiy UI TailwindCSS

**Database:** PostgreSQL with Prisma 

**Server:** Node, Express

**Payment Gateway:** Razorpay for handling transactions and storing money in user wallets.

**State Management:** Zustand for managing global state.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Agastya18/gambling-stake.git
```

Go to the project directory

```bash
  cd gambling-stake
```

Install dependencies in both frondend and backend

```bash
  npm install
```

replace the .env-sample with .env 

```bash
PORT=8000
JWT_SECRET=
DATABASE_URL=
NODE_ENV=development
RAZORPAY_API_KEY=
RAZORPAY_APT_SECRET=
WEBHOOK_SECRET=
```

Go to root and run

```bash
  npm run dev
```

Go to frondend and run 

```bash
  npm run dev
```



## Screenshots





- games
![App Screenshot](https://i.ibb.co/4MfKsJ1/s1.png)

- dice game
![App Screenshot](https://i.ibb.co/r376vR5/2ec.png)

- Deposit/transaction
![App Screenshot](https://i.ibb.co/4MCZnLt/s3.png)




## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bugs or features.


## Deployment Artical (by me)

[Documentation](https://medium.com/@agastyagaur/deploying-a-mern-stack-application-on-a-unified-server-a-step-by-step-guide-to-cost-free-hosting-a9c2eb0e23a1)















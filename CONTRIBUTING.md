# Contributing

## Development

If you would like to contribute by fixing an open issue or developing a new feature you can use this suggested workflow:

First fork the repository, 

Create a new feature branch off the `main` branch.

Second, install the dependencies of the monorepo:

```bash
yarn install
```

Build the library:

```bash
cd packages/custoplayer && yarn build
```

Run the development server of the test project:

```bash
cd sites/my-site && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


#### Finally, [submit a PR](https://github.com/Etesam913/Custoplayer/pulls) for the review 


## Testing

If you want to run the unit tests run:

```bash
cd packages/custoplayer && yarn jest
```

If you want to run the integration tests run:

```bash
cd sites/my-site && yarn dev
```

In a new terminal window run (make sure you are in `sites/my-site`)

```
yarn test
```

This should open a cypress window where you can run tests.

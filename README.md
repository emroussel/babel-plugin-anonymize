# babel-plugin-anonymize

`babel-plugin-anonymize` renames variables, functions, classes, and more by replacing them with random words, while keeping code functional. Great for sanitizing private code in order to share it publicly on the internet!

Try it out live at https://anonymize-javascript.vercel.app.

## Install

Using npm:

```sh
npm install babel-plugin-anonymize
```

or using yarn:

```sh
yarn add babel-plugin-anonymize
```

## Usage

```json
{
  "plugins": ["babel-plugin-anonymize"]
}
```

## Options

### `wordType`

The type of words to replace things with.

Possible options: `"animals"`, `"dinosaurs"`, or `"fruits"`. If left empty, will use any words.

```json
{
  "plugins": [
    [
      "babel-plugin-anonymize",
      {
        "wordType": "animals"
      }
    ]
  ]
}
```

### `seed`

A seed for the random generator (`babel-plugin-anonymize` uses [seedrandom](https://github.com/davidbau/seedrandom) under the hood and this option will be passed to it). When providing a seed, `babel-plugin-anonymize` will always replace results with the same sequence of words.

Can be a string, number, etc.

```json
{
  "plugins": [
    [
      "babel-plugin-anonymize",
      {
        "seed": "hello."
      }
    ]
  ]
}
```

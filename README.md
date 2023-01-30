# eslint-plugin-pit

Extend eslint plugin for Vue-Pit

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-pit`:

```sh
npm install eslint-plugin-pit --save-dev
```

## Usage

Add `pit` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "pit"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "pit/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->



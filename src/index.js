import { declare } from "@babel/helper-plugin-utils";
import camelCase from "lodash/camelCase";
import snakeCase from "lodash/snakeCase";
import seedrandom from "seedrandom";
import animals from "./words/animals.json";
import dinosaurs from "./words/dinosaurs.json";
import fruits from "./words/fruits.json";

const wordLists = [
  { type: "animals", words: animals },
  { type: "dinosaurs", words: dinosaurs },
  { type: "fruits", words: fruits },
];

const preserveCase = (targetCase, valueToFormat) => {
  const camelCaseTarget = camelCase(targetCase) || "";
  if (camelCaseTarget === targetCase) {
    return camelCase(valueToFormat);
  }

  // PascalCase
  if (
    `${camelCaseTarget[0].toUpperCase()}${camelCaseTarget.slice(1)}` ===
    targetCase
  ) {
    const camelCaseValue = camelCase(valueToFormat);
    return `${camelCaseValue[0].toUpperCase()}${camelCaseValue.slice(1)}`;
  }

  if (snakeCase(targetCase) === targetCase) {
    return snakeCase(valueToFormat);
  }

  if (snakeCase(targetCase).toUpperCase() === targetCase) {
    return snakeCase(valueToFormat).toUpperCase();
  }

  return camelCase(valueToFormat);
};

export default declare((api, { wordType, seed }) => {
  const usedIndexes = {
    animals: [],
    dinosaurs: [],
    fruits: [],
  };

  const getListRandomNumber = seedrandom(seed);
  const getWordRandomNumber = seedrandom(seed);

  let getWord = () => {
    const list = wordType
      ? wordLists.find((list) => list.type === wordType)
      : wordLists[Math.floor(getListRandomNumber() * wordLists.length)];

    let wordIndex;
    while (
      wordIndex === undefined ||
      usedIndexes[list.type].includes(wordIndex)
    ) {
      wordIndex = Math.floor(getWordRandomNumber() * list.words.length);
    }

    usedIndexes[list.type].push(wordIndex);

    return list.words[wordIndex];
  };

  return {
    visitor: {
      VariableDeclaration(path) {
        path.node.declarations.forEach((declaration) => {
          if (declaration.id.name && declaration.id.name !== "i") {
            path.scope.rename(
              declaration.id.name,
              preserveCase(declaration.id.name, getWord())
            );
          }
        });
      },
      FunctionDeclaration(path) {
        path.scope.rename(
          path.node.id.name,
          preserveCase(path.node.id.name, getWord())
        );

        path.node.params.forEach((param) => {
          if (param.name && param.name !== "props") {
            path.scope.rename(param.name, preserveCase(param.name, getWord()));
          }
        });
      },
      ClassDeclaration(path) {
        path.scope.rename(
          path.node.id.name,
          preserveCase(path.node.id.name, getWord())
        );
      },
      ArrowFunctionExpression(path) {
        path.node.params.forEach((param) => {
          if (param.name && param.name !== "props") {
            path.scope.rename(param.name, preserveCase(param.name, getWord()));
          }
        });
      },
      FunctionExpression(path) {
        path.node.params.forEach((param) => {
          if (param.name && param.name !== "props") {
            path.scope.rename(param.name, preserveCase(param.name, getWord()));
          }
        });
      },
      ObjectProperty(path) {
        path.scope.rename(
          path.node.key.name,
          preserveCase(path.node.key.name, getWord())
        );
      },
      TSInterfaceDeclaration(path) {
        console.log(path);
        path.node.scope.rename(
          path.node.id.name,
          preserveCase(path.node.id.name, getWord())
        );
      },
    },
  };
});

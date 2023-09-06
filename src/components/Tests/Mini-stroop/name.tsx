import { getRandomIndex } from "../../../utils/getRandomIndex";

const name = ["blue", "green", "red", "yellow"];
export const color = ["blue", "green", "red", "yellow"];
export const newColor: string[] = [];
export const newName: string[] = [];

// random indexes are drawn from words array and push to newColor
const numRandom = 30;
for (let i = 0; i < numRandom; i++) {
  const randomIndex = getRandomIndex(color.length);

  newColor.push(color[randomIndex]);
}

for (let i = 0; i < numRandom; i++) {
  const randomIndex = getRandomIndex(name.length);

  newName.push(name[randomIndex]);
}

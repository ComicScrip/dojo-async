const db = require("./db");
const axios = require("axios");

(async function main() {
  await db.character.deleteMany();

  const { data: characterList } = await axios.get(
    "https://thronesapi.com/api/v2/Characters"
  );

  await db.character.createMany({
    data: characterList.map(({ firstName, lastName, imageUrl }) => ({
      firstName,
      lastName,
      imageUrl,
    })),
  });

  // alternative, but slower because we wait for one insertion to be over to start the next one:
  // for (const { firstName, lastName, imageUrl } of characterList) {
  //    await db.character.create({ data: { firstName, lastName, imageUrl } });
  // }

  console.log("done");
})();

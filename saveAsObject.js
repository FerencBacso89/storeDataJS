// A JS objektum tárolásához létrehozzuk a placeHolderData objektumot
let placeHolderData = {};

// Az input elemek elérése
const it1 = document.getElementById("testInput");
const it2 = document.getElementById("testInput2");

// A gomb megnyomására mentjük az adatokat és frissítjük a listát
document.getElementById("addValuesBtn").addEventListener("click", function () {
  // Az új értékek beolvasása
  const newDescription = it1.value; // Megfelelő érték beolvasása az inputból
  const newTimeFrame = Number(it2.value); // Számként olvassuk be
  const newCategory = it1.value + " category"; // Dinamikus kategória
  // Töltsük fel az objektumot az input mezők értékeivel
  placeHolderData = {
    ...placeHolderData, // Megtartja a korábbi adatokat
    [`${Object.keys(placeHolderData).length + 1}`]: {
      description: newDescription,
      timeFrame: newTimeFrame,
      category: newCategory,
    },
  };
  // A listában (ul) megjelenítjük az objektum adatait
  displayObjectData(placeHolderData);
});

// Függvény, amely megjeleníti az objektum adatait egy listában
function displayObjectData(data) {
  const outputList = document.getElementById("output");

  // Töröljük a korábbi listaelemeket, hogy újraépíthessük
  outputList.innerHTML = "";

  // Iterálunk az objektum kulcsain és létrehozzuk a listát
  Object.keys(data).forEach((key) => {
    const li = document.createElement("li");
    li.textContent = `${key}: ${data[key].description}, ${data[key].timeFrame} mins, Category: ${data[key].category}`;
    outputList.appendChild(li);
  });
}

// download JSON fájlba
function downloadJSON(data, filename = "data.json") {
  // Konvertáljuk a placeHolderData objektumot JSON stringgé
  const json = JSON.stringify(data, null, 2);

  // Blob létrehozása a JSON-ból
  const blob = new Blob([json], { type: "application/json" });

  // Letöltési hivatkozás létrehozása
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // Hivatkozás eltávolítása a DOM-ból
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Használat a placeHolderData objektummal
document.getElementById("downloadBtn").addEventListener("click", function () {
  downloadJSON(placeHolderData, "placeHolderData.json");
});

// READ JSON file

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        // A JSON adat beolvasása
        const jsonData = JSON.parse(e.target.result);

        // A beolvasott adatokat hozzáadjuk a placeHolderData objektumhoz
        placeHolderData = { ...placeHolderData, ...jsonData };

        // Kiírás ellenőrzés céljából
        console.log(placeHolderData);

        // Frissítsük a megjelenítést
        displayObjectData(placeHolderData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Invalid JSON file");
      }
    };

    // Olvassuk be a fájlt
    reader.readAsText(file);
  });

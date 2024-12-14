import * as fs from "fs";

export default function SaveToFile(name: string, path: string, data: any) {
  fs.writeFile(
    path,
    JSON.stringify(data),
    {
      encoding: "utf8",
      flag: "w+",
      mode: 0o755,
    },
    (err) => {
      if (err) console.log(err);
      else {
        console.log(`${name} File written successfully\n`);
      }
    }
  );
}

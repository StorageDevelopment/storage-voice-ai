import { StorageUnit } from "./storageunit";

// isRentable=true|false& (_bRented vs -bRentable)
// findBySize=10x10  (_dcWidth, _dcLength)
// findByPrice=[10, 100] (min and max, see below for Rate to use)
// sortByAsc=size|price
// sortByDesc=size|price
// isAda=true|false  (_iADA)
// isClimateControlled=true|false (_bClimate)

export class StorageUnits {
  private storageUnits: StorageUnit[];

  public constructor(storageUnits: StorageUnit[]) {
    this.storageUnits = storageUnits;
  }

  DOisRentable = (args: "true" | "false") => {
    const rentable = args === "true";
    this.storageUnits = this.storageUnits.filter((unit: any) => {
      const isRentable = !Boolean(unit._bRented === "true");
      return rentable === isRentable;
    });
  };

  DOfindBySize = (args: string) => {
    const dimensions = args.split("x");
    this.storageUnits = this.storageUnits.filter((unit: any) => {
      const width = parseInt(unit._dcWidth);
      const edge1 = parseInt(dimensions[0]);
      const length = parseInt(unit._dcLength);
      const edge2 = parseInt(dimensions[1]);
      return (
        (width == edge1 && length == edge2) ||
        (width == edge2 && length == edge1)
      );
    });
  };

  filter = (query: any) => {
    const keys = Object.keys(query);
    for (const key in keys) {
      const dokey = ("DO" + keys[key]) as keyof StorageUnits;
      if (typeof this[dokey] === "function") {
        this.callMethod(dokey, query[keys[key]]);
      }
    }
    return this.storageUnits;
  };

  callMethod(methodName: keyof StorageUnits, ...args: any[]): any {
    const method = this[methodName] as Function;

    if (typeof method === "function") {
      return method.apply(this, args);
    } else {
      throw new Error(`Method ${methodName} does not exist on StorageUnits`);
    }
  }
}

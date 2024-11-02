export class StorageUnit{

    public constructor() {
        this._width = 0;
        this._length = 0;

    }
    private _width: number;

    public get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this._width = value;
    }

    private _length: number;

    public get length(): number {
        return this._length;
    }

    public set length(value: number) {
        this._length = value;
    }
} 


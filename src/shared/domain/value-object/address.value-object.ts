export class Address {
  private _street: string;
  private _number: string;
  private _zipcode: string;
  private _city: string;
  private _state: string;
  private _complement?: string;

  constructor(
    street: string,
    number: string,
    zipcode: string,
    city: string,
    state: string,
    complement?: string
  ) {
    this._street = street;
    this._number = number;
    this._zipcode = zipcode;
    this._city = city;
    this._state = state;
    this._complement = complement;
    this.validate();
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }

    if (this._number.length === 0) {
      throw new Error("Number is required");
    }

    if (this._zipcode.length === 0) {
      throw new Error("Zip is required");
    }

    if (this._city.length === 0) {
      throw new Error("City is required");
    }

    if (this._state.length === 0) {
      throw new Error("State is required");
    }
  }

  get zipcode() {
    return this._zipcode;
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get complement(): string | undefined {
    return this._complement;
  }
}

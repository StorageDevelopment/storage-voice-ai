interface Person {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
}

type Lead = Person & {
  interest?: string;
};

type Customer = (Person | Lead) & {
  reservationId?: string;
  rentalId?: string;
  unitNumber?: string;
};

type Reservation = {
  customer: Customer;
  unitNumber: string;
  moveInDate?: Date;
  moveOutDate?: Date;
};

type Renter = {
  reservation: Reservation;
};

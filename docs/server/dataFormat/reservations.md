# Reservations

[Server Documentation](../server.md)


> This part of the documentation is focused on the reservations of bikes for rent. You will find its database model and all of the informations relative to its use in the app.

## Database Model

```
{
    _bikeId: String (ObjectID),
    _reservations: [
        {
            _customerId: String (ObjectID),
            _reservationFrom: Date,
            _reservationTo: Date,
            _quote: Float,
        }
    ]
}
```

Each bike has its own reservations database entry upon creation.
Each reservation will have a from and to date to define the duration of the rent.
Each reservation is also linked to a customerId.
The quote for the rent will be defined by the user, depending on the price it set the rent/day at or the custom prices it is willing to give to the customer. This will also be helpful later for the generation of rent contracts.
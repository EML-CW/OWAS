# Bikes

> This part of the documentation will detail all of the "bikes" related part of the app. From models to reservations

## Database model
> The database model may change over time in function of changes of architectures and or addition or removal of features.
> This database model is descriptive. Its goal is to keep trace of all bikes currently in stock and for rent.

```
{
    _id: ObjectID,
    _priceArray: Array,
    _bikeMake: String,
    _bikeModel: String,
    _bikeYear: Int,
    _displacement: Float,
    _mileage: Float
}
```

### _priceArray format

> The _priceArray variable in the bike document is fully customizable.
> It is an array of objects. Its goal is to provide different pre made durations of rent. It will also be used to gain time during quote or contract making.

```
[
    {
        _rentDuration: Float,
        _rentPrice: Float,
        _formulaTitle: String
    },
    {
        ...
    }
]
```

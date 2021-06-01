# OWAS - Server

> This page is the index of the OWAS server documentation. Here, you will find links to other parts of the server's docuentation such as the data formats and the architecture of the work tree.


## Technology

The OWS server is built using Node.JS and the ExpressJS framework. It is built as a REST API that can be called by the react app at the root of this directory.

The database engine used is MongoDB. The server uses the mongoose package (npm) to handle the connection between the api and its database.
Mongoose is wrapper in a custom wrapper that makes the calls to the database more generic. It's mostly for show and cleanliness tbh.


## Links

> You can follow those links to get to the other parts of the documentation


- [ReadMe](../../README.md)
    - [Server Documentation](./server.md)
        - [Data format - Users](dataFormat/users.md)
        - [Data format - reservations](dataFormat/reservations.md)
        - [Data format](dataFormat/bikes.md)
        - [Architecture](./server.md)
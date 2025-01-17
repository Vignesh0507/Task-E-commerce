import axios from "axios";
import React, { useEffect, useState } from "react";

const url = "https://fakestoreapi.com/products";

const Study = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .delete(`${url}/20`)
            .then((res) => {
                // setMessage("Product with ID 20 has been deleted successfully.");
                setData(res.data)})
            .catch((err) => console.log(err))

            .put(`${url}`/20,{
                title: "New Product",
                price: 29.99,
                description: "A great new product",
                image: "https://via.placeholder.com/150",
                category: "electronics",
                rating: {
                    "rate": 3.6,
                    "count": 145
            } })
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))

            axios
            .post(url,{
                title: "New Product",
                price: 29.99,
                description: "A great new product",
                image: "https://via.placeholder.com/150",
                category: "electronics",
                rating: {
                    "rate": 3.6,
                    "count": 145
            } })
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))


axios
            .get(url)
            .then((res) => setData(res.data)) 
            .catch((err) => console.log(err));



    }, []);
    console.log(data);
    return (
        <>
            {/* {data.map((val) => {
                return (
                    <p key={val.id}>
                        {val.price}
                    </p>
                ); */}
            {/* })} */}
        </>
    );
};

export default Study;

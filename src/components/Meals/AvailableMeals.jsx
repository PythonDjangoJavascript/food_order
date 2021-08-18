import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css';
import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem"

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

function AvailableMeals() {

    const [meals, setMeals] = useState([])

    // Fetch Data from Firebase
    useEffect(() => {

        // using nested func here as we can not pass asyc fucn directly to
        // useEffect
        const fecthData = async () => {
            const response = await fetch('https://food-order-app-2c4fc-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
            const responseData = await response.json()
            console.log(responseData)

            const loadedMeals = []

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }

            // Now Update the state of meals list with fetched data
            setMeals(loadedMeals)
        }

        // Execute the fecthc and load funciton
        fecthData()
    }, [])


    const mealsList = meals.map(meal => {
        return (
            <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        );
    });

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals
import classes from './MealsSummary.module.css';

function MealsSummary() {
    return (
        <section className={classes.summary}>
            <h2>Delisious Food, Deleverd to you</h2>
            <p>
                Choose you favorite food from our broad selection fo available
                food and enjoy a delicious lunch or dinner at home
            </p>
            <p>
                All our meals cooked with high quality ingredients, just in time
                and of course by experienced chef!
            </p>
        </section>
    );
}

export default MealsSummary
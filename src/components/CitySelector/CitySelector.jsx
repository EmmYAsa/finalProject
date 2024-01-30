// Компонент для вибору міста зі списком (select)

const CitySelector = ({ selectedCity, onCityChange, onEnterKey }) => {

    // Список доступних міст, включаючи нові міста

    const cities = ['Raleigh', 'Madrid', 'Alma', 'New York', 'Paris', 'London', 'Tokyo', 'Amsterdam', 'Rome', 'Barcelona'];

    return (
        <label>

            {/* Випадаючий список з обраним містом */}

            <select
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)} // Обробник зміни обраного міста
                onKeyDown={onEnterKey} // Обробник натискання клавіші Enter
            >

                {/* Створюємо елементи списку для кожного міста у масиві */}

                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default CitySelector;

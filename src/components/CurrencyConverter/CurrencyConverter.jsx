import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
   
   const [currencies, setCurrencies] = useState([]);// Стейт для зберігання списку валют (масив об'єктів)
   const [selectedCurrency, setSelectedCurrency] = useState(''); // Стейт для зберігання обраної користувачем валюти (абревіатура)
   const [amount, setAmount] = useState('');// Стейт для зберігання введеної користувачем суми для конвертації
   const [result, setResult] = useState('');// Стейт для зберігання результату конвертації

  // Ефект для завантаження списку валют під час старту компонента
  useEffect(() => {
    async function fetchCurrencies() {
      try {
        let data = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        let response = await data.json();
        setCurrencies(response);
        setSelectedCurrency(response[0]?.txt || ''); // Обираємо першу валюту за замовчуванням
      } catch (error) {
        console.error("Помилка при завантаженні даних: " + error.message);
      }
    }

    fetchCurrencies();
  }, []); // Порожній масив для одноразового завантаження при монтуванні компонента

  // Функція для знаходження курсу валюти за її абревіатурою
  const findRateByCC = (data, selectedCurrency) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].cc === selectedCurrency) {
        return data[i].rate;
      }
    }
    return 1; // Повертаємо 1, якщо курс не знайдено (за замовчуванням)
  };

  // Функція для конвертації валют
  const convertCurrency = () => {
    // Перевірка на коректність введеної суми
    if (!amount || isNaN(amount)) {
      setResult('Введіть коректну суму');
      return;
    }

    // Отримання абревіатури обраної валюти
    const selectedCurrencyAbbr = currencies.find(currency => currency.txt === selectedCurrency)?.cc;

    // Перевірка на успішне отримання абревіатури
    if (!selectedCurrencyAbbr) {
      setResult('Не вдалося знайти абревіатуру обраної валюти');
      return;
    }

    // Знаходження курсу обраної валюти та курсу гривні
    const fromRate = findRateByCC(currencies, selectedCurrencyAbbr);
    const toRate = findRateByCC(currencies, 'UAH');

    // Переведення суми в гривні
    const amountInUah = amount / fromRate;

    // Конвертація суми з гривень в обрану валюту
    const convertedAmount = amountInUah * toRate;

    // Встановлення результату конвертації
    setResult(`Результат: ${convertedAmount.toFixed(2)} ${selectedCurrency}`);
  };

  return (
    <div className="currency-converter">
      {/* Заголовок компонента */}
      <h1>Конвертер валют</h1>
      
      {/* Введення суми та вибір валюти */}
      <div className="uah">
        <input
          type="number"
          placeholder="UAH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {/* Опції для вибору валюти */}
          {currencies.map((currency) => (
            <option key={currency.txt} value={currency.txt}>
              {currency.txt}
            </option>
          ))}
        </select>
      </div>
      
      {/* Кнопка для запуску конвертації */}
      <button onClick={convertCurrency}>Результат</button>
      
      {/* Виведення результату конвертації */}
      <div className="content">
        <p>{result}</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;

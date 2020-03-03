//json менять нельзя, его не трогаем

let invoices = [
 {
   "customer": "MDT",
   "performances": [
     {
     "playId": "Гамлет",
     "audience": 55,
     "type": "tragedy"
     },
     {
     "playId": "Ромео и Джульетта",
     "audience": 35,
     "type": "tragedy"
     },
     {
     "playId": "Отелло",
     "audience": 40,
     "type": "comedy"
     }
   ]
  }
  //,...
];

function statement(invoice) {
   let totalAmount = 0;
   let bonuses = 0;
   let result = `Счет для ${invoice.customer}\n`;
   const format = new Intl.NumberFormat("ru-RU",
     { style: "currency", currency: "RUB",
     minimumFractionDigits: 2 }).format;

   for (let perf of invoice.performances) {
     let perfAmount = 0;
     switch (perf.type) {
       case "tragedy":
       perfAmount = 40000;
       if (perf.audience > 30) {
         perfAmount += 1000 * (perf.audience - 30);
       }
       break;
       case "comedy":
       perfAmount = 30000;
       if (perf.audience > 20) {
         perfAmount += 10000 + 500 * (perf.audience - 20);
       }
       perfAmount += 300 * perf.audience;
       // Дополнительный бонус за каждые 10 комедий - ошибка
       // Доп. бонус за каждые 5 гостей на комедии, вроде логично, так как за комедию платят гораздо больше.
       bonuses += Math.floor(perf.audience / 5);
       break;
       default:
        throw new Error(`неизвестный тип: ${perf.type}`);
     }

     // Добавление бонусов
     bonuses += Math.max(perf.audience - 30, 0);

     // Вывод строки счета
     result += ` ${perf.playId}: ${format(perfAmount)}`;
     result += ` (${perf.audience} мест)\n`;
     totalAmount += perfAmount;
   }
    result += `Итого с вас ${format(totalAmount)}\n`;
    result += `Вы заработали ${bonuses} бонусов\n`;
    return result;
}

console.log(statement(invoices[0]));

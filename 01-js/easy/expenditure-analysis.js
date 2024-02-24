/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  
  // return [];
  let category_totals = {}

  for (let i = 0; i < transactions.length; i++) {
    const currCategory = transactions[i].category;
    const currPrice = transactions[i].price;

    if(!category_totals[currCategory]){
      category_totals[currCategory] = currPrice;
    }
    else{
      category_totals[currCategory] += currPrice;
    }
  }

      const result = Object.keys(category_totals).map((currCategory)=> ({category: currCategory, totalSpent: category_totals[currCategory]}));

      return result;
}

module.exports = calculateTotalSpentByCategory;

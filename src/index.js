import _ from 'lodash';
import '../images/icons/css/main.scss';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
//import App from './components/App';


const filterDuplicates = (food) => {
	let duplicate;
	for (const index in result) {

	    if (result[index].id === duplicate) {
		    console.log(`Same name: ${result[index].name}`);
		    console.log(duplicate);
		    console.log(result[index].id);
		    result.splice(index, 1);	
	    } else {
		    duplicate = result[index].id;
	    }
	}
}

function CrockpotMeal(props) {
	let highestPriority = -2;
	let lowestPriority = -2;
	let result = [];
	const meals = props.meals;

	const removeDuplicates = (currentResult) => {
		return [...new Set(currentResult)];
	}
    
    const checkForInedibles = (meals) => {
    	let numberOfInedibles = 0;

    	for (let i = 0; i < props.isInedible.length; i++) {
    		if (props.isInedible[i]) {
                numberOfInedibles += 1;
            }
    	    //console.log(`Inedible? ${props.isInedible[i]}`);
    	    //console.log(`Inedible count: ${numberOfInedibles}`);
        }

    	for (const index in meals.inedibleNumMatch) {
            if (meals.inedibleNumMatch[index] === numberOfInedibles) {
            	return true;
            }
        }
        return false;
    }

    const excludedIngredientsCheck = (meals) => {
    	const foodNames = props.foodNames;
    	let exclusionFound = false;
    	console.log(`Excluded ${meals.excludedIngredients}`);
    	for (const index in meals.excludedIngredients) {
    		for (let i = 0; i < foodNames.length; i++) {
    		    if (meals.excludedIngredients[index] === foodNames[i]) {
    			    return false;
    		    }
    	    }
        }
        return true;
    }

    const foodValueFunc = (meal) => {
	    	let foodValueMatch = 0;

	    	const testFoodVal = (additionalFoodValue, foodValue) => {
	    		for (const indexOne in meal[additionalFoodValue]) {
	    			if (meal[additionalFoodValue][indexOne] === foodValue) {
	    				foodValueMatch += 1;
	    				console.log(`Food Value Match: ${foodValueMatch}`);
	    			}
	    		}
	    	}

            testFoodVal('additionalMeatValue', props.meatValue);
            testFoodVal('additionalFishValue', props.fishValue);
            testFoodVal('additionalEggValue', props.eggValue);
            testFoodVal('additionalFruitValue', props.fruitValue);
            testFoodVal('additionalVegetableValue', props.vegetableValue);
            testFoodVal('additionalSweetenerValue', props.sweetenerValue);
            testFoodVal('additionalDairyValue', props.dairyValue);
            testFoodVal('additionalMonsterFoodValue', props.monsterValue);
            console.log(`FINAL Food Value Match: ${foodValueMatch}`);

	    	for (const index in meal.foodValueMatch) {
	    		console.log(`FOOD VALUE MATCH!!! ${meal.foodValueMatch[index]}`);
	    		if (meal.foodValueMatch[index] === foodValueMatch) {
	    			console.log('TRUENESS');
	    			console.log(meal);
	    			return true;
	    		}
	    	}
	    	return false;
	};

	const filterSpecialMeals = (ingrediantsNeeded, foodValue) => {
		const foodNames = props.foodNames;

        const numberOfIngrediants = (meal) => {
        	const myTest = (meal) => {
        		let numTest = 0;
        		for (const index in meal) {
        			console.log('My Test Function results');
        			console.log(meal[index]);
        			for (let i = 0; i < foodNames.length; i++) {
        				if (foodNames[i] === meal[index]) {
        					numTest += 1;
        				}	
        			}
        		}
        		console.log(`Num test ${numTest}`);
        		return numTest;
        	}

        	const numIngredientsNeeded = myTest(meal.ingrediantsNeeded);
        	const numAltIngredientsNeeded = myTest(meal.altIngrediantsNeeded);
        	const numAltIngredientsNeededTwo = myTest(meal.altIngredientsNeededTwo);
        	const numAltIngredientsNeededThree = myTest(meal.altIngredientsNeededThree);
        	const numAltIngredientsNeededFour = myTest(meal.altIngredientsNeededFour);
        	const numAltIngredientsNeededFive = myTest(meal.altIngredientsNeededFive);
        	const numAltIngredientsNeededSix = myTest(meal.altIngredientsNeededSix);
        	const numAltIngredientsNeededSeven = myTest(meal.altIngredientsNeededSeven);
            
            /*
            for (const index in meal.ingrediantsNeeded) {
            	let count = 0;
            	for (let i = 0; i < foodNames.length; i++) {    	
                    if (foodNames[i] === meal.ingrediantsNeeded[index]) {
                        count += 1;
                        console.log('THE MEAL HAS LANDED!');
                        console.log(meal);
                    }
                    console.log(`THIS IS COUNT!!! ${count}`);
                }
            }
            */ //Uncomment if bugs arise

            for (const index in meal.ingredientNumMatch) {
            	console.log(`Ingredient match count: ${meal.ingredientNumMatch.length}`);
            }

        	for (const indexTwo in meal.ingredientNumMatch) {
        	    if (meal.ingredientNumMatch[indexTwo] === numIngredientsNeeded || meal.ingredientNumMatch[indexTwo] === numAltIngredientsNeeded || meal.ingredientNumMatch[indexTwo] === numAltIngredientsNeededTwo || meal.ingredientNumMatch[indexTwo] === numAltIngredientsNeededThree) {
        	    	return true;
        	    }
        	    
        	    if (meal.ingredientNumMatch[indexTwo] === numAltIngredientsNeededFour || meal.ingredientNumMatch[indexTwo] === numAltIngredientsNeededFive || meal.ingredientNumMatch[indexTwo] === numAltIngredientsNeededSix || meal.ingredientNumMatch[indexTwo] === numAltIngredientsNeededSeven) {
        	    	return true;
        	    }
        	}
        	return false;
	    }

	    const hasExcludedFoodValue = (meal, foodValue) => {
	    	const checkForExcludedValue = (excludedFoodValue) => {
	    	    for (const index in meal[excludedFoodValue]) {
	    		    if (meal[excludedFoodValue][index]) {
	    			    console.log('EXCLUDED FOOD VALUE');
	    		        return meal;
	    	        }
	    	    }
	        }
	    }

	    const selectMeal = (meal, ingredients) => {
	    	const foodValueTest = foodValueFunc(meal);
	    	const blub = numberOfIngrediants(meal);
	    	const canHaveInedibles = checkForInedibles(meal);
	    	const hasExcludedIngredients = excludedIngredientsCheck(meal);
	    	const hasFood = hasExcludedFoodValue(meal);
	    	console.log(hasFood);
            //console.log(`Excluded? ${hasExcludedIngredients}`);
	    	for (const index in meal[ingredients]) {
	    		if (meal[ingredients].every(ingredient => foodNames.includes(ingredient)) && foodValueTest && blub && canHaveInedibles && hasExcludedIngredients) {
    		        result.push(meal);
    	        }
	    	}
	    }
    
		meals.map(meal => {
            selectMeal(meal, 'ingrediantsNeeded');
            selectMeal(meal, 'altIngrediantsNeeded');
            selectMeal(meal, 'altIngredientsNeededTwo');
            selectMeal(meal, 'altIngredientsNeededThree');
            selectMeal(meal, 'altIngredientsNeededFour');
            selectMeal(meal, 'altIngredientsNeededFive');
            selectMeal(meal, 'altIngredientsNeededSix');
            selectMeal(meal, 'altIngredientsNeededSeven');
        });
	};
	
//filterSpecialMeals('ingrediantsNeeded', 'additionalVegetableValue');
    const filterByMeatValue = () => {
	    const filterMealsByMeatValue = meals.map(meal => {
	    	const meat = meal.meatValue;
	    	const fish = meal.fishValue;
	    	const hasInedibles = checkForInedibles(meal);
	    	const foodValueTest = foodValueFunc(meal);

		    for (const index in meat) {
			    if (meat[index] === props.meatValue && !meal.fishValue && !meal.eggValue && !meal.fruitValue && !meal.vegetableValue && !meal.sweetenerValue && hasInedibles && foodValueTest) {
				    result.push(meal);
				    console.log('the meats');
				    console.log(result);
				    result = removeDuplicates(result);
			    }
		    }
		    //console.log('FILTER');
		   
	    });
	    console.log('THE MEALS');
         console.log(meals);
	     console.log(meals.filter(m => !m.fishValue && !m.eggValue && !m.vegetableValue && !m.sweetenerValue));
    }

    const filterByFishValue = () => {
    	const filterMealsByFishValue = meals.map(meal => {
    		const fishValue = meal.fishValue;
    		const meatValue = meal.meatValue;
    		const hasExclusions = excludedIngredientsCheck(meal);

    		for (const index in fishValue) {
    			for (const item in meatValue) {
    				if (fishValue[index] === props.fishValue && meatValue[item] !== props.meatValue) {
    				    console.log('fish meal');
    				    console.log(meal);
    				    //result.push(meal);
    				    //result = removeDuplicates(result);
    			    }

    			    if (fishValue[index] === props.fishValue && meatValue[item] === props.meatValue && hasExclusions) {
    			    	console.log('SURF \'n\' TURF!');
    			    	result.push(meal);
    			    }
    			    
    		    }

    		    if (fishValue[index] === props.fishValue && !meal.meatValue) {
    				console.log('FISHY FISH');
    				console.log(meal);
    				result.push(meal);
    				result = removeDuplicates(result);
    			}
    		}
    	});
    }

    const filterByMonsterFoodValue = () => {
    	const filterMealsByMonsterFoodValue = meals.map(meal => {
    		const hasInedibles = checkForInedibles(meal);
    		for (const index in meal.monsterFoodValue) {
    			if (meal.monsterFoodValue[index] === props.monsterValue && hasInedibles) {
    				console.log('monster food');
    				console.log(meal);
    				result.push(meal);
    				result = removeDuplicates(result);
    			}
    		}
    	});
    }

    const filterByEggValue = () => {
    	const filterMealsByEggValue = meals.map(meal => {
    		const hasInedibles = checkForInedibles(meal);
    		const foodValueTest = foodValueFunc(meal);
    		//try to filter through result array and use for in below to do so
    		for (const index in meal.eggValue) {
    			for (const item in meal.meatValue) {
    				if (meal.eggValue[index] === props.eggValue && meal.meatValue[item] === props.meatValue && foodValueTest && hasInedibles) {
    				    console.log('I LIKE EGGS');
    				    console.log(meal);
    				    result.push(meal);
    				    result = removeDuplicates(result);
    			    }
    				for (const b in meal.vegetableValue) {
    					if (meal.eggValue[index] === props.eggValue && meal.meatValue[item] === props.meatValue && meal.vegetableValue[b] === props.vegetableValue && hasInedibles) {
    				        console.log('EGGS AND VEGGIES');
    				        console.log(meal);
    				        result.push(meal);
    				        result = removeDuplicates(result);
    				    } else {
    				    	//continue;
    			        }

    					if (meal.eggValue[index] === props.eggValue && meal.meatValue[item] === props.meatValue && hasInedibles && foodValueTest) {
    				        console.log('I LIKE EGGS');
    				        console.log(meal);
    				        result.push(meal);
    				        result = removeDuplicates(result);
    			        }
    			    }
    			} 
    		}
    	});
    }

    const filterByFruitValue = () => {
    	const filterMealsByFruitValue = meals.map(meal => {
    		const hasInedibles = checkForInedibles(meal);
    		const hasExclusions = excludedIngredientsCheck(meal);
    		const foodValueTest = foodValueFunc(meal);
    		for (const index in meal.fruitValue) {
    			if (meal.fruitValue[index] === props.fruitValue && hasInedibles && foodValueTest) {
    				result.push(meal);
    			}
    		}
    	})
    }

    const filterByVegetableValue = () => {
    	const filterMealsByVegetableValue = meals.map(meal => {
    		const hasInedibles = checkForInedibles(meal);
    		for (const index in meal.vegetableValue) {
    			    console.log('VEGGIE VALUES');
    			if (meal.vegetableValue[index] === props.vegetableValue && !meal.meatValue && !props.meatValue && hasInedibles) {
    			    console.log(meal.name);
    			    result.push(meal);
    		    }

    		    for (const indexTwo in meal.meatValue) {
    		    	if (meal.vegetableValue[index] === props.vegetableValue && meal.meatValue[indexTwo] === props.meatValue && !meal.eggValue) {
    		    		result.push(meal);
    		    	}
    		    }
    		}
    	});

    	if (!props.meatValue) {
    	    //filterSpecialMeals('ingrediantsNeeded', 'additionalVegetableValue');
    	}
    	filterSpecialMeals('ingrediantsNeeded', 'additionalVegetableValue');
    }

    const filterBySweetenerValue = () => {	
	    const filterMealsBySweetenerValue = meals.map(meal => {
	    	const hasInedibles = checkForInedibles(meal);
		    for (const index in meal.sweetenerValue) {
		    	for (const i in meal.meatValue) {
		    		if (meal.sweetenerValue[index] === props.sweetenerValue && meal.meatValue[i] === props.meatValue && hasInedibles) {
		    			//alert('meat and sweet');
		    			result.push(meal);
		    		}
		    	}

			    if (!props.meatValue && meal.sweetenerValue[index] === props.sweetenerValue && !meal.meatValue) {
				    result.push(meal);
				    console.log('THE MEAL!');
				    console.log(meal);
				    //console.log(result);
				//create system that filters out meal that doesn't have a sweet value
			    }
			    result = removeDuplicates(result);
		    }
	    });
    }

    filterByMeatValue();
    filterByFishValue();
    filterByEggValue();
    filterByFruitValue();
    filterByVegetableValue();
    filterBySweetenerValue();
    filterByMonsterFoodValue();

	console.log('THE RESULT');
	console.log(result);


    //const finalResult = result;
    const myFilter = result.map(meal => {
    	if (meal.priority >= highestPriority) {
    		lowestPriority = highestPriority;
    		highestPriority = meal.priority;
    		console.log(`Lowest: ${lowestPriority}`);
    	    console.log(`Highest: ${highestPriority}`);
    	} else {
    		//highestPriority = lowestPriority;
    	}
    });

    const failedMeal = () => {
    	meals.map(meal => {
    		console.log(`MEAL PRIORITY ${meal.priority}`);
    		 if (lowestPriority === -2 && highestPriority === -2) {
    			result.push(meal);
    			    
    		}
        });
    }
    failedMeal();
    
    console.log('THE HIGHS');
    console.log(highestPriority);
    console.log('THE LOWS');
    console.log(lowestPriority);

    const randomlyPickFoodOutcome = (result) => {
    	let foodPriorities = [];
	    for (const index in result) {
	    	console.log('test');
	    	console.log(result[index]);
	    	foodPriorities.push(result[index]);
	    }
        return foodPriorities[Math.floor(Math.random() * foodPriorities.length)];
    }
	const resultingMeal = result.filter(item => item.priority === highestPriority);
    console.log(resultingMeal);

	const meal = (
		<table id='crockpot-result' className={"crockpot"}>
		    <thead>
		        <tr>
		            <th>Name</th>
		            <th>Icon</th>
		            <th>Health</th>
		            <th>Sanity</th>
		            <th>Hunger</th>
		            <th>Crockpot</th>
		        </tr>
		    </thead>
		    <tbody>
	            {resultingMeal.map(meal => 
	            	<tr key={meal.id} className={"crockpot"}>
	            	    <th>{meal.name}</th>
	            	    <td><img className={'food-result-img'} src={meal.icon} alt={meal.name} width='90px'></img></td>
	            	    <td title={`Health ${meal.hp}`}><img src='../images/icons/Health_Meter.webp' alt='Health Meter' width='25px'></img><br/>{meal.hp}</td>
	    	            <td title={`Sanity ${meal.sanity}`}><img src='../images/icons/Sanity_Meter.webp' alt='Sanity Meter' width='25px'></img><br/>{meal.sanity}</td>
	    	            <td title={`Hunger ${meal.hunger}`}><img src='../images/icons/Hunger_Meter.webp' alt='Hunger Meter' width='25px'></img><br/>{meal.hunger}</td>
                        <td><img src={meal.crockpot}></img></td>
	    	        </tr>
	            )}
	        </tbody>
	    </table>
	);
	return (
		<div id="crockpot">
		    <div id='y-scroll'>
		        {meal}
		    </div>
		</div>
	);
}

function CrockpotContents(props) {
	const foodIcons = (
		<ul id='crockpot-contents'>
	    {props.food.map((food, i) => 
		        <li key={i} id={`${food.id}`}><img width={food.width} height={food.height} src={food.icon}></img></li>
	    )}
	    </ul>
	)
	return (
		<div id='food'>
            {foodIcons}
		</div>
	)
}

function calculateFoodValue(food) {
	let foodValue = 0;

	for (let i = 0; i < food.length; i++) {
		if (food[i] !== undefined) {
			foodValue += food[i];
		}
	}
	return foodValue;
}

const getFoodValue = (foodValue, calculateFoodValue) => {
	if (foodValue === undefined) {
		return 0;
	}
	const totalFoodValue = calculateFoodValue(foodValue);
	return totalFoodValue;
}

class Crockpot extends React.Component {
	constructor(props) {
		super(props);
		this.state = {crockpotFull: false, testy: false}
		this.cook = this.cook.bind(this);
		this.clearCook = this.clearCook.bind(this);
		this.test = this.test.bind(this);
	}

	cook() {
		this.setState({crockpotFull: true, testy: false});
	}

	clearCook() {
		this.setState({testy: true});
		setTimeout(() => {
			this.props.clearFood();
		    this.setState({crockpotFull: false});
	    }, 400);		
	}

	test() {
		this.setState(state => ({
			testy: state.testy = true
		}));

		setTimeout(() => {
			this.clearCook();
		}, 400)
	}

	render() {
		const selectedFood = this.props.food;
		const foodNames = selectedFood.map(food => food.name);
		const isInedible = selectedFood.map(food => food.inedible);
         
		const meatValue = selectedFood.map(food => food.meatValue);
		const fishValue = selectedFood.map(food => food.fishValue);

		const monsterFoodValue = selectedFood.map(food => food.monsterFoodValue);
		const eggValue = selectedFood.map(food => food.eggValue);

		const fruitValue = selectedFood.map(food => food.fruitValue);
		const sweetenerValue = selectedFood.map(food => food.sweetenerValue);

		const vegetableValue = selectedFood.map(food => food.vegetableValue);
		const dairyValue = selectedFood.map(food => food.dairyValue);

		const bugValue = selectedFood.map(food => food.bugValue);

		console.log(`Meat: ${getFoodValue(meatValue, calculateFoodValue)}`);
		console.log(`Fish: ${getFoodValue(fishValue, calculateFoodValue)}`);

		console.log(`Monster: ${getFoodValue(monsterFoodValue, calculateFoodValue)}`);
		console.log(`Egg: ${getFoodValue(eggValue, calculateFoodValue)}`);
		console.log(`Fruit: ${getFoodValue(fruitValue, calculateFoodValue)}`);
		console.log(`Vegetable: ${getFoodValue(vegetableValue, calculateFoodValue)}`);
		console.log(`Sweetener: ${getFoodValue(sweetenerValue, calculateFoodValue)}`);
		console.log(`Dairy: ${getFoodValue(dairyValue, calculateFoodValue)}`);
		console.log(`Bug: ${getFoodValue(bugValue, calculateFoodValue)}`);
		let currentClassName = '';

		if (this.state.crockpotFull) {
			currentClassName = 'fade-in';	
		}

		if (this.state.testy) {
			currentClassName = 'fade-out';
		}
		return(
			<div id='crockpot'>
			    <h2>Create some food!</h2>
			    <div id='selected-food-container'>
			        <div id='container'>
			            <div className={'food-container-tray'}>
			            </div>
			            <div className={'food-container-tray'}>
			            </div>
			            <div className={'food-container-tray'}>
			            </div>
			            <div className={'food-container-tray'}>
			            </div>
			        </div>
			        <div id="selected-food">
			            <CrockpotContents food={this.props.food} />
			        </div>
			    </div>
			    <img src="../images/icons/misc/Crock_Pot_Build.webp" alt="Crockpot" width="104px"></img>
			    <img src="../images/icons/misc/Portable_Crock_Pot_Build.webp" alt="Portable Crockpot" width="90px"></img>

			    <br/>{this.props.food.length === 4 
			    	? <button onClick={this.cook}>Cook</button>
			        : <button className='transparent'>Cook</button>
			        }
                <button onClick={this.clearCook}>Clear</button>
                <div id='testy'>
                <div className={currentClassName}>
			    <br/>{this.state.crockpotFull
			        ? <CrockpotMeal meatValue={getFoodValue(meatValue, calculateFoodValue)} 
			                        fishValue={getFoodValue(fishValue, calculateFoodValue)}
			                        monsterValue={getFoodValue(monsterFoodValue, calculateFoodValue)} 
			                        eggValue={getFoodValue(eggValue, calculateFoodValue)}
			                        fruitValue={getFoodValue(fruitValue, calculateFoodValue)}
			                        vegetableValue={getFoodValue(vegetableValue, calculateFoodValue)}
			                        sweetenerValue={getFoodValue(sweetenerValue, calculateFoodValue)}
			                        dairyValue={getFoodValue(dairyValue, calculateFoodValue)}
			                        bugValue={getFoodValue(bugValue, calculateFoodValue)}
			                        meals={this.props.meals}
			                        foodNames={foodNames}
			                        isInedible={isInedible} />
			        : null
			    }
			    </div>
			    </div>
			</div>
		);
	}
}

const foodValues = (food, foodValue) => {
	//const foodValue = ['meatValue', 'fishValue'];
	food.map(food => {
		console.log(`FOOD VALUE: ${food[foodValue]}`);
	})
		
}

function FoodList(props)  {
	const listOfFood = (
		<table className={"crockpot"}>
		    <thead>
		        <tr>
		            <th>Food Name</th>
		            <th>Food Icon</th>
		            <th>Health</th>
		            <th>Sanity</th>
		            <th>Hunger</th>
		            <th>Meat Value</th>
		            <th>Fish Value</th>
		            <th>Monster Food Value</th>
		            <th>Egg Value</th>
		            <th>Fruit Value</th>
		            <th>Vegetable Value</th>
		            <th>Sweetener Value</th>
		            <th>Dairy Value</th>
		            <th>Bug Value</th>
		            <th>Inedible</th>
		        </tr>
		    </thead>
		    <tbody>
		        {props.food.map(food => 
		        	<tr key={food.id} className={"crockpot"} onClick={() => props.onClick(food)}>
		        	    <th>{food.name}</th>
			            <td title={food.name}><img src={food.icon} alt={food.name} width='60px'></img></td>
			            <td title={`Health ${food.hp}`}><img src='../images/icons/Health_Meter.webp' alt='Health Meter' width='25px'></img><br/>{food.hp}</td>
			            <td title={`Sanity ${food.sanity}`}><img src='../images/icons/Sanity_Meter.webp'alt='Sanity Meter' width='25px'></img><br/>{food.sanity}</td>
			            <td title={`Hunger ${food.hunger}`}><img src='../images/icons/Hunger_Meter.webp' alt='Hunger Meter' width='25px'></img><br/>{food.hunger}</td>
			            <td title={`Meat Value ${food.meatValue}`} className={!food.meatValue ? 'hide-element' : 'show-element'}>{food.meatValue > 0 ? <img src='../images/icons/meats/Meats.webp'></img> : null}<br/>{food.meatValue > 0 ? food.meatValue : null}</td>
			            <td title={`Fish Value ${food.fishValue}`} className={!food.fishValue ? 'hide-element' : 'show-element'}>{food.fishValue > 0 ? <img src='../images/icons/meats/Fishes.webp'></img> : null}<br/>{food.fishValue > 0 ? food.fishValue : null}</td>
			            <td title={`Monster Food Value ${food.monsterFoodValue}`} className={!food.monsterFoodValue ? 'hide-element' : 'show-element'}>{food.monsterFoodValue > 0 ? <img src='../images/icons/meats/Monster_Foods.webp'></img> : null}<br/>{food.monsterFoodValue > 0 ? food.monsterFoodValue : null}</td>
			            <td title={`Egg Value ${food.eggValue}`} className={!food.eggValue ? 'hide-element' : 'show-element'}>{food.eggValue > 0 ? <img src='../images/icons/eggs/Eggs.webp'></img> : null}<br/>{food.eggValue > 0 ? food.eggValue : null}</td>
			            <td title={`Fruit Value ${food.fruitValue}`} className={!food.fruitValue ? 'hide-element' : 'show-element'}>{food.fruitValue > 0 ? <img src='../images/icons/fruits/Fruit.webp'></img> : null}<br/>{food.fruitValue > 0 ? food.fruitValue : null}</td>
			            <td title={`Vegetable Value ${food.vegetableValue}`} className={!food.vegetableValue ? 'hide-element' : 'show-element'}>{food.vegetableValue > 0 ? <img src='../images/icons/vegetables/Vegetables.webp'></img> : null}<br/>{food.vegetableValue > 0 ? food.vegetableValue : null}</td>
			            <td title={`Sweetener Value ${food.sweetenerValue}`} className={!food.sweetenerValue ? 'hide-element' : 'show-element'}>{food.sweetenerValue > 0 ? <img src='../images/icons/sweeteners/Sweetener.webp'></img> : null}<br/>{food.sweetenerValue > 0 ? food.sweetenerValue : null}</td>
			            <td title={`Dairy Value ${food.dairyValue}`} className={!food.dairyValue ? 'hide-element' : 'show-element'}>{food.dairyValue > 0 ? <img src='../images/icons/dairy/Dairy_product.webp'></img> : null}<br/>{food.dairyValue > 0 ? food.dairyValue : null}</td>
			            <td title={`Bug Value ${food.bugValue}`} className={!food.bugValue ? 'hide-element' : 'show-element'}>{food.bugValue > 0 ? <img src='../images/icons/bugs/Bugs.webp'></img> : null}<br/>{food.bugValue > 0 ? food.bugValue : null}</td>
			            <td title={'Inedible'} className={!food.inedible ? 'hide-element' : 'show-element'}>{food.inedible ? <img src='../images/icons/inedibles/Inedible.webp'></img> : null}</td>
			        </tr>
			    )}
			</tbody>
		</table>
    );
    return (
    	<div>
            {listOfFood}
        </div>
    );
}

function SelectFoodList(props) {
	const buttons = props.dlcButtons.map((item, e) => 
		<img id={props.index === e ? 'cond1' : null} className={'cursor-on-off dlc-img-size'} src={item} key={item.toString()} onClick={() => props.onClick(item, e)}></img>
	);
	return (
		<div>
			{buttons}
	    </div>
	);
}

function SelectDlcButton(props) {
	return (
		<button>props.name</button>
	);
}

class CrockpotRecipeTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFood: [],
			index: 0,
			addClass: false
		}
		this.selectedFood = this.selectedFood.bind(this);
		this.clearSelectedFood = this.clearSelectedFood.bind(this);
		this.handleDlcContent = this.handleDlcContent.bind(this);
		this.addActiveClass = this.addActiveClass.bind(this);
	}

	selectedFood(food) {
		if (this.state.selectedFood.length < 4) {
		    this.setState(state => ({
			    selectedFood: state.selectedFood.concat(food)
		    }));
	    }
	}

	clearSelectedFood() {	
		this.setState(state => ({
			selectedFood: state.selectedFood = []
		}));
	}

	handleDlcContent(item, e) {
		//alert(e);
		this.setState(state => ({
			index: state.index = e,
			addClass: !state.addClass
		}));
	}

	addActiveClass() {
		this.setState(state => ({
			addClass: !state.addClass
		}));
	}

	render() {
		const food = this.state.selectedFood;
		const currentIndex = this.state.index;
		const dlcList = [this.props.reignOfGiantsFood, this.props.shipwreckedIngredients, this.props.hamletIngredients];
		const currentDlc = dlcList[currentIndex];
		const dlcButtons = ['../images/icons/dlc/Don\'t_Starve_Together_Logo.webp', '../images/icons/dlc/Shipwrecked_Logo.webp', '../images/icons/dlc/Hamlet_Logo.webp'];
		return(
			<div id="main">
			    <div className={'white-background'}>
			        <h1>Won't Starve Crockpot Recipe App</h1>
			        <p>Welcome to the Won't Starve App! It's very easy to use.<br/>
			           First, select 4 food items. Once you've done that, hit the cook button<br/>
			           and see what you make. Click the <i>Clear</i> button to clear your selected food.<br/>
			           Click the DLC buttons to experiment with food ingredients exlusive to the DLC's.<br/>
			           <br/>
			           Created by Zachary DJ Hernandez</p>
			        <h2>Select DLC</h2>
			    </div>
			    <div>
			        <SelectFoodList dlcButtons={dlcButtons}
			                        onClick={this.handleDlcContent} 
			                        addClass={this.state.addClass} 
			                        index={this.state.index} />
			    </div>
			    
			    <div id="food-table">
			        <FoodList food={currentDlc} 
			            onClick={(food) => this.selectedFood(food)} />
			    </div>
			    
			    <div className={'blub'}>
			        <div className={'sticky-pos crockpot-recipe-table'}>
			            <Crockpot food={food} clearFood={this.clearSelectedFood} meals={this.props.crockpotMeals[currentIndex]} />
			        </div>
			    </div>

			    <div className={"crockpot-recipe-table no-display"}>
			        <Crockpot food={food} clearFood={this.clearSelectedFood} meals={this.props.crockpotMeals[currentIndex]} />
			    </div>
			</div>
		);
	}
}

const gameModes = {
	dlcOne: 'giants',
	dlcTwo: 'shipwrecked',
	dlcFour: 'hamlet',
};

const crockpotMeals = [
    {id: 1, name: 'Meatballs', hp: 3, sanity: 5, hunger: 62.5, priority: -1, 
    meatValue: [0.5, 1, 1.5, 2, 2.5], inedibleNumMatch: [0], foodValueMatch: [0], icon: '../images/icons/crockpot_meals/Meatballs.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 2, name: 'Bacon And Eggs', hp: 20, sanity: 5, hunger: 75, priority: 10, 
    meatValue: [1.5, 2, 2.5, 3], additionalVegetableValue: [0], eggValue: [2, 4], foodValueMatch: [1], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Bacon_and_Eggs.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 3, name: 'Meaty Stew', hp: 12, sanity: 5, hunger: 150, priority: 0, 
    meatValue: [3, 3.5, 4], inedibleNumMatch: [0], additionalVegetableValue: [0], foodValueMatch: [1], icon: '../images/icons/crockpot_meals/Meaty_Stew.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 4, name: 'Honey Nuggets', hp: 20, sanity: 5, hunger: 37.5, priority: 2, 
    meatValue: [0.5, 1, 1.5], sweetenerValue: [1, 2, 3], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Honey_Nuggets.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 5, name: 'Honey Ham', hp: 30, sanity: 5, hunger: 75, priority: 2,
    meatValue: [2, 2.5, 3], sweetenerValue: [1, 2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Honey_Ham.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 6, name: 'Taffy', hp: -3, sanity: 15, hunger: 25, priority: 10,
    sweetenerValue: [3, 4, 5, 6], additionalMeatValue: [0], inedibleNumMatch: [0, 1, 3], icon: '../images/icons/crockpot_meals/Taffy.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 7, name: 'Monster Lasanga', hp: -20, sanity: -20, hunger: 37.5, priority: 10,
    monsterFoodValue: [2, 3, 4],  inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Monster_Lasagna.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},
    /*
    {id: 8, name: 'Seafood Gumbo', hp: 40, sanity: 20, hunger: 37.5, priority: 10, 
    fishValue: [1.5, 2, 2.5, 3, 3.5, 4], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Seafood_Gumbo.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},
    */

    {id: 8, name: 'Seafood Gumbo', hp: 40, sanity: 20, hunger: 37.5, priority: 10,
    ingrediantsNeeded: ['Eel'], altIngrediantsNeeded: ['Cooked Eel'], additionalFishValue: [1.5, 2, 2.5, 3, 3.5, 4], foodValueMatch: [1], ingredientNumMatch: [1, 2, 3, 4], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Seafood_Gumbo.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 9, name: 'Surf \'n\' Turf', hp: 60, sanity: 33, hunger: 35.7, priority: 30,
    fishValue: [1.5, 2, 2.5, 3], meatValue: [2.5, 3, 4], inedibleNumMatch: [1], excludedIngredients: ['Ice'], icon: '../images/icons/crockpot_meals/Surf_\'n\'_Turf.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 10, name: 'Pierogi', hp: 40, sanity: 5, hunger: 37.5, priority: 5,
    meatValue: [0.5, 1, 1.5, 2], eggValue: [1, 2, 4], vegetableValue: [0.5, 1, 1.5, 2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Pierogi.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 11, name: 'Fist Full Of Jam', hp: 3, sanity: 5, hunger: 37.5, priority: 0,
     fruitValue: [0.5, 1, 1.5, 2, 2.5, 3.0], additionalMeatValue: [0], additionalVegetableValue: [0], inedibleNumMatch: [0], foodValueMatch: [2], icon: '../images/icons/crockpot_meals/Fist_Full_of_Jam.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 12, name: 'Fruit Medley', hp: 20, sanity: 5, hunger: 25, priority: 0,
     fruitValue: [3.0, 3.5, 4], additionalMeatValue: [0], additionalVegetableValue: [0], inedibleNumMatch: [0, 1], foodValueMatch: [2], icon: '../images/icons/crockpot_meals/Fruit_Medley.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 13, name: 'Asparagus Soup', hp: 20, sanity: 5, hunger: 18.75, priority: 10,
     additionalVegetableValue: [2.5, 3, 3.5, 4], additionalMeatValue: [0], ingrediantsNeeded: ['Asparagus'], altIngrediantsNeeded: ['Cooked Asparagus'], foodValueMatch: [2], ingredientNumMatch: [1, 2, 3, 4], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Asparagus_Soup.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 14, name: 'Ratatouille', hp: 3, sanity: 5, hunger: 25, priority: 0,
    vegetableValue: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Ratatouille.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 15, name: 'Spicy Chili', hp: 20, sanity: 0, hunger: 37.5, priority: 10,
     vegetableValue: [1.5, 2], meatValue: [1.5, 2], icon: '../images/icons/crockpot_meals/Spicy_Chili.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 16, name: 'Barnacle Linguine', hp: 10, sanity: 20, hunger: 75, priority: 25, 
     additionalVegetableValue: [2], ingrediantsNeeded: ['Barnacles', 'Barnacles'], altIngrediantsNeeded: ['Cooked Barnacles', 'Cooked Barnacles'], altIngredientsNeededTwo: ['Barnacles', 'Cooked Barnacles'], ingredientNumMatch: [2], foodValueMatch: [1], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Barnacle_Linguine.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 17, name: 'Barnacle Pita', hp: 20, sanity: 5, hunger: 37.5, priority: 24,
     additionalVegetableValue: [0.5, 1, 1.5, 2, 2.5, 3], ingrediantsNeeded: ['Barnacles'], altIngrediantsNeeded: ['Cooked Barnacles'], foodValueMatch: [1], ingredientNumMatch: [1], inedibleNumMatch: [0, 1, 2, 3], icon: '../images/icons/crockpot_meals/Barnacle_Pita.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 18, name: 'Barnacle Nigiri', hp: 40, sanity: 5, hunger: 37.5, priority: 30,
     additionalEggValue: [1, 2, 3, 4, 5, 8], ingrediantsNeeded: ['Barnacles', 'Kelp Fronds'], altIngrediantsNeeded: ['Barnacles', 'Cooked Kelp Fronds'], altIngredientsNeededTwo: ['Cooked Barnacles', 'Kelp Fronds'], 
     altIngredientsNeededThree: ['Cooked Barnacles', 'Cooked Kelp Fronds'], foodValueMatch: [1], ingredientNumMatch: [2, 3], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Barnacle_Nigiri.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 19, name: 'Froggle Bunwich', hp: 20, sanity: 5, hunger: 37.5, priority: 1,
     additionalVegetableValue: [0.5, 1, 1.5, 2, 2.5, 3], ingrediantsNeeded: ['Frog Legs'], altIngrediantsNeeded: ['Cooked Frog Legs'], foodValueMatch: [1], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Froggle_Bunwich.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 20, name: 'Guacamole', hp: 20, sanity: 0, hunger: 37.5, priority: 10,
     ingrediantsNeeded: ['Moleworm', 'Cactus Flesh'], altIngrediantsNeeded: ['Moleworm', 'Ripe Stone Fruit'], foodValueMatch: [0], ingredientNumMatch: [2], inedibleNumMatch: [1, 2, 3], icon: '../images/icons/crockpot_meals/Guacamole.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 21, name: 'Turkey Dinner', hp: 20, sanity: 5, hunger: 75, priority: 10,
     additionalMeatValue: [1.5, 2], additionalVegetableValue: [0.5, 1], additionalFruitValue: [0.5, 1], ingrediantsNeeded: ['Drumstick'], ingredientNumMatch: [2, 3], foodValueMatch: [2], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Turkey_Dinner.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 22, name: 'Beefy Greens', hp: 40, sanity: 5, hunger: 75, priority: 25,
     additionalVegetableValue: [3], ingrediantsNeeded: ['Leafy Meat'], altIngrediantsNeeded: ['Cooked Leafy Meat'], ingredientNumMatch: [1], foodValueMatch: [1], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Beefy_Greens.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 23, name: 'Jelly Salad', hp: 0, sanity: 50, hunger: 37.5, priority: 50, 
     additionalSweetenerValue: [2, 3], ingrediantsNeeded: ['Leafy Meat', 'Leafy Meat'], altIngrediantsNeeded: ['Cooked Leafy Meat', 'Cooked Leafy Meat'], altIngredientsNeededTwo: ['Leafy Meat', 'Cooked Leafy Meat'], ingredientNumMatch: [2, 3], foodValueMatch: [1], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Jelly_Salad.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 24, name: 'Banana Pop', hp: 20, sanity: 33, hunger: 12.5, priority: 20,
     additionalMeatValue: [0], ingrediantsNeeded: ['Cave Banana', 'Ice', 'Twigs'], altIngrediantsNeeded: ['Cooked Cave Banana', 'Ice', 'Twigs'], ingredientNumMatch: [3, 4], foodValueMatch: [1], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Banana_Pop.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 25, name: 'Creamy Potato Purée', hp: 20, sanity: 33, hunger: 37.5, priority: 20, 
     ingrediantsNeeded: ['Potato', 'Garlic'], altIngrediantsNeeded: ['Roasted Potato', 'Garlic'], altIngredientsNeededTwo: ['Potato', 'Roasted Garlic'], altIngredientsNeededThree: ['Roasted Potato', 'Roasted Garlic'], additionalMeatValue: [0], ingredientNumMatch: [2], foodValueMatch: [1], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Creamy_Potato_Purée.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 26, name: 'Fancy Spiralled Tubers', hp: 3, sanity: 15, hunger: 37.5, priority: 10, 
     additionalMeatValue: [0], ingrediantsNeeded: ['Potato', 'Twigs'], ingredientNumMatch: [2, 3], foodValueMatch: [1], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Fancy_Spiralled_Tubers.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 27, name: 'Fish Tacos', hp: 20, sanity: 5, hunger: 37.5, priority: 10,
     additionalFishValue: [0.5, 1], ingrediantsNeeded: ['Corn'], altIngrediantsNeeded: ['Popcorn'], altIngredientsNeededTwo: ['Popperfish'], altIngredientsNeededThree: ['Corn Cod'], foodValueMatch: [1], ingredientNumMatch: [1, 2], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Fish_Tacos.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 28, name: 'Dragonpie', hp: 40, sanity: 5, hunger: 75, priority: 1,
     ingrediantsNeeded: ['Dragon Fruit'], altIngrediantsNeeded: ['Prepared Dragon Fruit'], additionalMeatValue: [0], foodValueMatch: [1], ingredientNumMatch: [1], inedibleNumMatch: [0, 1, 2, 3], icon: '../images/icons/crockpot_meals/Dragonpie.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 29, name: 'Mandrake Soup', hp: 100, sanity: 5, hunger: 150, priority: 10,
     ingrediantsNeeded: ['Mandrake'],  ingredientNumMatch: [1], foodValueMatch: [0], inedibleNumMatch: [0, 1, 2, 3], icon: '../images/icons/crockpot_meals/Mandrake_Soup.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 30, name: 'Ice Cream', hp: 0, sanity: 50, hunger: 25, priority: 10,
    additionalDairyValue: [1, 2], additionalMeatValue: [0], additionalVegetableValue: [0], additionalEggValue: [0], additionalSweetenerValue: [1, 2], ingrediantsNeeded: ['Ice', 'Electric Milk'], altIngrediantsNeeded: ['Ice', 'Butter'], foodValueMatch: [5], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Ice_Cream.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 31, name: 'Jellybeans', hp: 'initial 2 + 2 every 2 minutes', sanity: 5, hunger: 0, priority: 12,
     additionalMeatValue: [0], ingrediantsNeeded: ['Royal Jelly'], foodValueMatch: [1], ingredientNumMatch: [1], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Jellybeans.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 32, name: 'Butter Muffin', hp: 20, sanity: 5, hunger: 37.5, priority: 1,
     additionalVegetableValue: [0.5, 1, 1.5, 2, 2.5, 3], additionalMeatValue: [0], ingrediantsNeeded: ['Butterfly Wings'], altIngrediantsNeeded: ['Moon Moth Wings'], foodValueMatch: [2], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Butter_Muffin.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 33, name: 'Salsa Fresca', hp: 3, sanity: 33, hunger: 25, priority: 20,
     additionalMeatValue: [0], additionalEggValue: [0], ingrediantsNeeded: ['Toma Root', 'Onion'], altIngrediantsNeeded: ['Roasted Toma Root', 'Onion'], altIngredientsNeededTwo: ['Toma Root', 'Roasted Onion'], altIngredientsNeededThree: ['Roasted Toma Root', 'Roasted Onion'], foodValueMatch: [2], ingredientNumMatch: [2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Salsa_Fresca.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 34, name: 'Vegetable Stinger', hp: 3, sanity: 33, hunger: 25, priority: 15,
     additionalVegetableValue: [2.5, 3], additionalMeatValue: [0], ingrediantsNeeded: ['Toma Root', 'Ice'], altIngrediantsNeeded: ['Asparagus', 'Ice'], altIngredientsNeededTwo: ['Roasted Toma Root', 'Ice'], altIngredientsNeededThree: ['Cooked Asparagus', 'Ice'], foodValueMatch: [2], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Vegetable_Stinger.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 35, name: 'Stuffed Eggplant', hp: 3, sanity: 5, hunger: 37.5, priority: 1,
     additionalVegetableValue: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4], ingrediantsNeeded: ['Eggplant'], altIngrediantsNeeded: ['Braised Eggplant'], foodValueMatch: [1], ingredientNumMatch: [1, 2], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Stuffed_Eggplant.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 36, name: 'Stuffed Pepper Poppers', hp: 30, sanity: -5, hunger: 25, priority: 20, 
     additionalMeatValue: [0.5, 1, 1.5], ingrediantsNeeded: ['Pepper'], altIngrediantsNeeded: ['Roasted Pepper'], foodValueMatch: [1], ingredientNumMatch: [1], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Stuffed_Pepper_Poppers.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 37, name: 'Stuffed Fish Heads', hp: 20, sanity: 0, hunger: 75, priority: 25,
     additionalFishValue: [1, 1.5, 2, 2.5], additionalMeatValue: [1, 1.5, 2], ingrediantsNeeded: ['Barnacles'], altIngrediantsNeeded: ['Cooked Barnacles'], ingredientNumMatch: [1, 2, 3], foodValueMatch: [2], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Stuffed_Fish_Heads.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 38, name: 'California Roll', hp: 20, sanity: 10, hunger: 37.5, priority: 20,
     additionalFishValue: [1, 1.5, 2], ingrediantsNeeded: ['Kelp Fronds'], altIngrediantsNeeded: ['Cooked Kelp Fronds'], altIngredientsNeededTwo: ['Dried Kelp Fronds'], foodValueMatch: [1], ingredientNumMatch: [2], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/California_Roll.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 39, name: 'Ceviche', hp: 20, sanity: 5, hunger: 25, priority: 20,
     additionalFishValue: [2], additionalEggValue: [0], ingrediantsNeeded: ['Ice'], foodValueMatch: [2], ingredientNumMatch: [1, 2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Ceviche.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 40, name: 'Melonsicle', hp: 3, sanity: 20, hunger: 12.5, priority: 10,
     additionalMeatValue: [0], additionalEggValue: [0], additionalVegetableValue: [0], ingrediantsNeeded: ['Watermelon', 'Twigs', 'Ice'], foodValueMatch: [3], ingredientNumMatch: [3, 4], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Melonsicle.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 41, name: 'Leafy Meatloaf', hp: 8, sanity: 5, hunger: 37.5, priority: 25,
     ingrediantsNeeded: ['Leafy Meat'], altIngrediantsNeeded: ['Cooked Leafy Meat'], altIngredientsNeededTwo: ['Leafy Meat', 'Cooked Leafy Meat'], foodValueMatch: [0], ingredientNumMatch: [2, 3, 4], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Leafy_Meatloaf.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 42, name: 'Pumpkin Cookies', hp: 0, sanity: 15, hunger: 37.5, priority: 10,
     ingrediantsNeeded: ['Pumpkin'], altIngrediantsNeeded: ['Hot Pumpkin'], additionalSweetenerValue: [2, 3], foodValueMatch: [1], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Pumpkin_Cookies.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 43, name: 'Powdercake', hp: -3, sanity: 0, hunger: 0, priority: 10,
     ingrediantsNeeded: ['Corn', 'Twigs'], altIngrediantsNeeded: ['Popcorn', 'Twigs'], altIngredientsNeededTwo: ['Popperfish', 'Twigs'], altIngredientsNeededTwo: ['Corn Cod', 'Twigs'], additionalSweetenerValue: [1, 2], ingredientNumMatch: [2, 3], foodValueMatch: [1], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Powdercake.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 44, name: 'Trail Mix', hp: 30, sanity: 5, hunger: 12.5, priority: 10,
     additionalMeatValue: [0], additionalEggValue: [0], additionalVegetableValue: [0], additionalDairyValue: [0], ingrediantsNeeded: ['Roasted Birchnut', 'Berries'], altIngrediantsNeeded: ['Roasted Birchnut', 'Roasted Berries'], 
     altIngredientsNeededTwo: ['Roasted Birchnut', 'Juicy Berries'], altIngredientsNeededThree: ['Roasted Birchnut', 'Roasted Juicy Berries'], additionalFruitValue: [0.5, 1, 1.5, 2], foodValueMatch: [5], ingredientNumMatch: [2, 3, 4], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Trail_Mix.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 45, name: 'Veggie Burger', hp: 30, sanity: 33, hunger: 37.5, priority: 25,
     ingrediantsNeeded: ['Leafy Meat', 'Onion'], altIngrediantsNeeded: ['Cooked Leafy Meat', 'Onion'], altIngredientsNeededTwo: ['Leafy Meat', 'Roasted Onion'], altIngredientsNeededThree: ['Cooked Leafy Meat', 'Roasted Onion'], ingredientNumMatch: [2], inedibleNumMatch: [0, 1], additionalVegetableValue: [2, 2.5, 3], foodValueMatch: [1], icon: '../images/icons/crockpot_meals/Veggie_Burger.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 46, name: 'Unagi', hp: 20, sanity: 5, hunger: 18.75, priority: 20,
     ingrediantsNeeded: ['Eel', 'Lichen'], altIngrediantsNeeded: ['Eel', 'Kelp Fronds'], altIngredientsNeededTwo: ['Eel', 'Cooked Kelp Fronds'], altIngredientsNeededThree: ['Eel', 'Dried Kelp Fronds'], 
      altIngredientsNeededFour: ['Cooked Eel', 'Lichen'], altIngredientsNeededFive: ['Cooked Eel', 'Kelp Fronds'], altIngredientsNeededSix: ['Cooked Eel', 'Cooked Kelp Fronds'], altIngredientsNeededSeven: ['Cooked Eel', 'Dried Kelp Fronds'], ingredientNumMatch: [2, 3], inedibleNumMatch: [0, 1, 2], foodValueMatch: [0], icon: '../images/icons/crockpot_meals/Unagi.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 47, name: 'Kabobs', hp: 3, sanity: 5, hunger: 37.5, priority: 5,
     ingrediantsNeeded: ['Twigs'], additionalMeatValue: [0.5, 1, 1.5, 2, 2.5, 3], additionalMonsterFoodValue: [0, 1], ingredientNumMatch: [1], foodValueMatch: [2], inedibleNumMatch: [1], icon: '../images/icons/crockpot_meals/Kabobs.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 48, name: 'Fishsticks', hp: 40, sanity: 5, hunger: 37.5, priority: 10,
     ingrediantsNeeded: ['Twigs'],  additionalFishValue: [0.5, 1, 2, 2.5, 3, 3.5, 4], foodValueMatch: [1], ingredientNumMatch: [1], inedibleNumMatch: [1], icon: '../images/icons/crockpot_meals/Fishsticks.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 49, name: 'Flower Salad', hp: 40, sanity: 5, hunger: 12.5, priority: 10,
     ingrediantsNeeded: ['Cactus Flower'], additionalVegetableValue: [1.5, 2, 2.5, 3, 3.5, 4], additionalMeatValue: [0], additionalSweetenerValue: [0], additionalFruitValue: [0], additionalEggValue: [0], ingredientNumMatch: [1, 2, 3, 4], foodValueMatch: [5], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Flower_Salad.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 50, name: 'Mushy Cake', hp: 0, sanity: 10, hunger: 25, priority: 55,
     ingrediantsNeeded: ['Moon Shroom', 'Red Cap', 'Blue Cap', 'Green Cap'], altIngrediantsNeeded: [null], foodValueMatch: [0], ingredientNumMatch: [4], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Mushy_Cake.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 51, name: 'Wet Goop', hp: 0, sanity: 0, hunger: 0, priority: -2, 
    icon: '../images/icons/crockpot_meals/Wet_Goop.webp'},

    {id: 52, name: 'Waffles', hp: 60, sanity: 5, hunger: 37.5, priority: 10,
     additionalEggValue: [1, 4], additionalDairyValue: [1], ingrediantsNeeded: ['Butter', 'Berries'], altIngrediantsNeeded: ['Butter', 'Roasted Berries'], altIngredientsNeededTwo: ['Butter', 'Juicy Berries'],
     altIngredientsNeededThree: ['Butter', 'Roasted Juicy Berries'], ingredientNumMatch: [2, 3], foodValueMatch: [2], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Waffles.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 53, name: 'Lobster Bisque', hp: 60, sanity: 10, hunger: 25, priority: 30,
     ingrediantsNeeded: ['Wobster', 'Ice'], foodValueMatch: [0], ingredientNumMatch: [2], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Wobster_Bisque_(DST).webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 54, name: 'Wobster Dinner', hp: 60, sanity: 50, hunger: 37.5, priority: 25,
     additionalMeatValue: [1], additionalDairyValue: [1], ingrediantsNeeded: ['Wobster', 'Butter'], ingredientNumMatch: [2], foodValueMatch: [2], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Wobster_Dinner_(DST).webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 55, name: 'Amberosia', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', priority: 100, 
     ingrediantsNeeded: ['Collected Dust'], foodValueMatch: [0], ingredientNumMatch: [1, 2, 3, 4], inedibleNumMatch: [0, 1, 2, 3], icon: '../images/icons/crockpot_meals/Amberosia.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 56, name: 'Milkmade Hat', hp: 0, sanity: '-5.3 in 4 min', hunger: '187.5 in 4 min', priority: 55,
     ingrediantsNeeded: ['Naked Nostrils', 'Kelp Fronds'], additionalDairyValue: [1, 2], foodValueMatch: [1], ingredientNumMatch: [2, 3], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Milkmade_Hat.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 57, name: 'Soothing Tea', hp: 3, sanity: '15 + 30 over 1 min', hunger: 0, priority: 1,
    additionalMeatValue: [0], additionalVegetableValue: [0], additionalFishValue: [0], additionalEggValue: [0], additionalDairyValue: [0], additionalMonsterFoodValue: [0], inedibleNumMatch: [0],
    additionalSweetenerValue: [1, 2], foodValueMatch: [7], ingrediantsNeeded: ['Forget-Me-Lots'], ingredientNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Soothing_Tea.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 58, name: 'Figatoni', hp: 30, sanity: 15, hunger: 56.25, priority: 30,
    ingrediantsNeeded: ['Fig'], altIngrediantsNeeded: ['Cooked Fig'], additionalMeatValue: [0], additionalVegetableValue: [2, 3], foodValueMatch: [2], ingredientNumMatch: [1, 2], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Figatoni.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 59, name: 'Figgy Frogwich', hp: 8, sanity: 10, hunger: 18.75, priority: 1,
    ingrediantsNeeded: ['Fig', 'Frog Legs'], altIngrediantsNeeded: ['Cooked Fig', 'Frog Legs'], altIngredientsNeededTwo: ['Fig', 'Cooked Frog Legs'], altIngredientsNeededThree: ['Cooked Fig', 'Cooked Frog Legs'], foodValueMatch: [0], ingredientNumMatch: [2, 3, 4], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Figgy_Frogwich.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'}, 

    {id: 60, name: 'Figkabab', hp: 20, sanity: 15, hunger: 25, priority: 30, 
    ingrediantsNeeded: ['Fig', 'Twigs'], altIngrediantsNeeded: ['Cooked Fig', 'Twigs'], additionalMeatValue: [1, 2], foodValueMatch: [1], ingredientNumMatch: [2, 3], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Figkabab.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 61, name: 'Fig-Stuffed Trunk', hp: 60, sanity: 0, hunger: 56.25, priority: 40,
    ingrediantsNeeded: ['Koalefant Trunk', 'Fig'], altIngrediantsNeeded: ['Koalefant Trunk Steak', 'Fig'], altIngredientsNeededTwo: ['Koalefant Trunk', 'Cooked Fig'], altIngredientsNeededThree: ['Koalefant Trunk Steak', 'Cooked Fig'],
    altIngredientsNeededFour: ['Winter Koalefant Trunk', 'Fig'], altIngredientsNeededFive: ['Winter Koalefant Trunk', 'Cooked Fig'], foodValueMatch: [0], ingredientNumMatch: [2, 3, 4], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Fig-Stuffed_Trunk.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 62, name: 'Asparagazpacho', hp: 3, sanity: 10, hunger: 25, priority: 30,
    ingrediantsNeeded: ['Asparagus', 'Ice'], altIngrediantsNeeded: ['Cooked Asparagus', 'Ice'], altIngredientsNeededTwo: ['Asparagus', 'Cooked Asparagus', 'Ice'], foodValueMatch: [0], ingredientNumMatch: [4], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Asparagazpacho.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 63, name: 'Bone Bouillon', hp: 32, sanity: 5, hunger: 150, priority: 30,
    ingrediantsNeeded: ['Bone Shards', 'Onion'], altIngrediantsNeeded: ['Bone Shards', 'Roasted Onion'], foodValueMatch: [0], ingredientNumMatch: [3, 4], inedibleNumMatch: [2], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Bone_Bouillon.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 64, name: 'Fish Cordon Bleu', hp: 20, sanity: -10, hunger: 37.5, priority: 30,
    ingrediantsNeeded: ['Frog Legs'], altIngrediantsNeeded: ['Cooked Frog Legs'], altIngredientsNeededTwo: ['Frog Legs', 'Cooked Frog Legs'], additionalFishValue: [1, 1.5, 2], foodValueMatch: [1], inedibleNumMatch: [0], ingredientNumMatch: [2], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Fish_Cordon_Bleu.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 65, name: 'Fresh Fruit Crepes', hp: 60, sanity: 15, hunger: 150, priority: 30,
    additionalFruitValue: [1.5, 2], additionalSweetenerValue: [1], ingrediantsNeeded: ['Butter'], ingredientNumMatch: [1], foodValueMatch: [2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Fresh_Fruit_Crepes.webp'},

    {id: 66, name: 'Glow Berry Mousse', hp: 3, sanity: 10, hunger: 37.5, priority: 30,
    additionalFruitValue: [2, 2.5, 3, 3.5, 4], additionalMeatValue: [0], ingrediantsNeeded: ['Glow Berry'], altIngrediantsNeeded: ['Lesser Glow Berry', 'Lesser Glow Berry'], altIngredientsNeededTwo: ['Glow Berry', 'Lesser Glow Berry'], foodValueMatch: [2], ingredientNumMatch: [1, 2, 3, 4], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Glow_Berry_Mousse.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 67, name: 'Grim Galette', hp: 1, sanity: 5, hunger: 25, priority: 30,
    ingrediantsNeeded: ['Nightmare Fuel', 'Potato', 'Onion'], altIngrediantsNeeded: ['Nightmare Fuel', 'Roasted Potato', 'Onion'], altIngredientsNeededTwo: ['Nightmare Fuel', 'Roasted Potato', 'Roasted Onion'], altIngredientsNeededThree: ['Nightmare Fuel', 'Potato', 'Roasted Onion'], foodValueMatch: [0], ingredientNumMatch: [4], inedibleNumMatch: [2], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Grim_Galette.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 68, name: 'Hot Dragon Chili Salad', hp: -3, sanity: 10, hunger: 25, priority: 30,
    additionalMeatValue: [0], additionalEggValue: [0], ingrediantsNeeded: ['Dragon Fruit', 'Pepper'], altIngrediantsNeeded: ['Prepared Dragon Fruit', 'Roasted Pepper'], altIngredientsNeededTwo: ['Dragon Fruit', 'Roasted Pepper'], altIngredientsNeededThree: ['Prepared Dragon Fruit', 'Pepper'], foodValueMatch: [2], ingredientNumMatch: [2, 3, 4], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Hot_Dragon_Chili_Salad.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 69, name: 'Monster Tartare', hp: -20, sanity: -20, hunger: 62.5, priority: 10, //Priority is actually 30, but I made it 10 so that monster lasanga is not excluded
    monsterFoodValue: [2, 3, 4], foodValueMatch: [1], ingredientNumMatch: [0], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Monster_Tartare.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 70, name: 'Moqueca', hp: 60, sanity: 33, hunger: 112.5, priority: 30,
    additionalFishValue: [0.5, 1, 1.5, 2], ingrediantsNeeded: ['Onion', 'Toma Root'], altIngrediantsNeeded: ['Roasted Onion', 'Roasted Toma Root'], altIngredientsNeededTwo: ['Roasted Onion', 'Toma Root'], altIngredientsNeededThree: ['Onion', 'Roasted Toma Root'],
    foodValueMatch: [1], ingredientNumMatch: [2, 3], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Moqueca.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 71, name: 'Puffed Potato Soufflé', hp: 20, sanity: 15, hunger: 37.5, priority: 30,
    ingrediantsNeeded: ['Potato'], altIngrediantsNeeded: ['Roasted Potato'], altIngredientsNeededTwo: ['Potato', 'Roasted Potato'], additionalMeatValue: [0], additionalEggValue: [1, 2, 4, 6, 8], ingredientNumMatch: [2], foodValueMatch: [2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Puffed_Potato_Soufflé.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 72, name: 'Volt Goat Chaud-Froid', hp: 3, sanity: 10, hunger: 37.5, priority: 30,
    ingrediantsNeeded: ['Volt Goat Horn'], additionalSweetenerValue: [2, 3, 5, 6, 7, 9], additionalMeatValue: [0], ingredientNumMatch: [1, 2], foodValueMatch: [2], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Volt_Goat_Chaud-Froid.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'}       

];

const shipwreckedMeals = [
    {id: 1, name: 'Meatballs', hp: 3, sanity: 5, hunger: 62.5, priority: -1, 
    meatValue: [0.5, 1, 1.5, 2, 2.5], inedibleNumMatch: [0], foodValueMatch: [0], icon: '../images/icons/crockpot_meals/Meatballs.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 2, name: 'Bacon And Eggs', hp: 20, sanity: 5, hunger: 75, priority: 10, 
    meatValue: [1.5, 2, 2.5, 3], additionalVegetableValue: [0], eggValue: [2, 4], foodValueMatch: [1], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Bacon_and_Eggs.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 3, name: 'Meaty Stew', hp: 12, sanity: 5, hunger: 150, priority: 0, 
    meatValue: [3, 4], inedibleNumMatch: [0], additionalVegetableValue: [0], foodValueMatch: [1], icon: '../images/icons/crockpot_meals/Meaty_Stew.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 4, name: 'Honey Nuggets', hp: 20, sanity: 5, hunger: 37.5, priority: 2, 
    meatValue: [0.5, 1, 1.5], sweetenerValue: [1, 2, 3], inedibleNumMatch: [0], fillers: true, icon: '../images/icons/crockpot_meals/Honey_Nuggets.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 5, name: 'Honey Ham', hp: 30, sanity: 5, hunger: 75, priority: 2,
    meatValue: [2, 2.5, 3], sweetenerValue: [1, 2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Honey_Ham.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 6, name: 'Taffy', hp: -3, sanity: 15, hunger: 25, priority: 10,
    sweetenerValue: [3, 4, 5, 6], additionalMeatValue: [0], inedibleNumMatch: [0, 1, 3], icon: '../images/icons/crockpot_meals/Taffy.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 7, name: 'Monster Lasanga', hp: -20, sanity: -20, hunger: 37.5, priority: 10,
    monsterFoodValue: [2, 3, 4],  inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Monster_Lasagna.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 8, name: 'Seafood Gumbo', hp: 40, sanity: 20, hunger: 37.5, priority: 10, 
    fishValue: [2.5, 3, 3.5, 4], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Seafood_Gumbo.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 9, name: 'Surf \'n\' Turf', hp: 60, sanity: 33, hunger: 35.7, priority: 30,
    fishValue: [1.5, 2, 2.5, 3], meatValue: [2.5, 3, 4], inedibleNumMatch: [1], excludedIngredients: ['Ice'], icon: '../images/icons/crockpot_meals/Surf_\'n\'_Turf.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 10, name: 'Pierogi', hp: 40, sanity: 5, hunger: 37.5, priority: 5,
    meatValue: [0.5, 1], eggValue: [1, 2, 4], vegetableValue: [0.5, 1, 1.5, 2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Pierogi.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 11, name: 'Fist Full Of Jam', hp: 3, sanity: 5, hunger: 37.5, priority: 0,
     fruitValue: [0.5, 1, 1.5, 2, 2.5, 3.0], additionalMeatValue: [0], additionalVegetableValue: [0], inedibleNumMatch: [0], foodValueMatch: [2], icon: '../images/icons/crockpot_meals/Fist_Full_of_Jam.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 12, name: 'Fruit Medley', hp: 20, sanity: 5, hunger: 25, priority: 0,
     fruitValue: [3.0, 3.5, 4], additionalMeatValue: [0], additionalVegetableValue: [0], foodValueMatch: [2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Fruit_Medley.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 13, name: 'Ratatouille', hp: 3, sanity: 5, hunger: 25, priority: 0,
    vegetableValue: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Ratatouille.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 14, name: 'Spicy Chili', hp: 20, sanity: 0, hunger: 37.5, priority: 10,
     vegetableValue: [1.5, 2], meatValue: [1.5, 2], icon: '../images/icons/crockpot_meals/Spicy_Chili.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 15, name: 'Turkey Dinner', hp: 20, sanity: 5, hunger: 75, priority: 10,
     additionalMeatValue: [1.5, 2], additionalVegetableValue: [0.5, 1], additionalFruitValue: [0.5, 1], ingrediantsNeeded: ['Drumstick'], ingredientNumMatch: [2, 3], foodValueMatch: [2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Turkey_Dinner.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'}, 

    {id: 16, name: 'Banana Pop', hp: 20, sanity: 33, hunger: 12.5, priority: 20,
     additionalMeatValue: [0], ingrediantsNeeded: ['Banana', 'Ice', 'Twigs'], altIngrediantsNeeded: ['Banana', 'Ice', 'Dorsal Fin'], ingredientNumMatch: [3, 4], foodValueMatch: [1], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Banana_Pop.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 17, name: 'Fish Tacos', hp: 20, sanity: 5, hunger: 37.5, priority: 10,
     additionalFishValue: [0.5, 1], ingrediantsNeeded: ['Corn'], altIngrediantsNeeded: ['Popcorn'], foodValueMatch: [1], ingredientNumMatch: [1, 2], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Fish_Tacos.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 18, name: 'Dragonpie', hp: 40, sanity: 5, hunger: 75, priority: 1,
     ingrediantsNeeded: ['Dragon Fruit'], altIngrediantsNeeded: ['Prepared Dragon Fruit'], additionalMeatValue: [0], foodValueMatch: [1], ingredientNumMatch: [1], inedibleNumMatch: [0, 1, 2, 3], icon: '../images/icons/crockpot_meals/Dragonpie.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 19, name: 'Mandrake Soup', hp: 100, sanity: 5, hunger: 150, priority: 10,
     ingrediantsNeeded: ['Mandrake'],  ingredientNumMatch: [1], foodValueMatch: [0], inedibleNumMatch: [0, 1, 2, 3], icon: '../images/icons/crockpot_meals/Mandrake_Soup.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 20, name: 'Ice Cream', hp: 0, sanity: 50, hunger: 25, priority: 10,
    additionalDairyValue: [1, 2], additionalMeatValue: [0], additionalVegetableValue: [0], additionalEggValue: [0], additionalSweetenerValue: [1, 2], ingrediantsNeeded: ['Ice', 'Electric Milk'], altIngrediantsNeeded: ['Ice', 'Butter'], foodValueMatch: [5], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Ice_Cream.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 21, name: 'Butter Muffin', hp: 20, sanity: 5, hunger: 37.5, priority: 1,
     additionalVegetableValue: [0.5, 1, 1.5, 2, 2.5, 3], additionalMeatValue: [0], ingrediantsNeeded: ['Butterfly Wings'], foodValueMatch: [2], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Butter_Muffin.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 22, name: 'Stuffed Eggplant', hp: 3, sanity: 5, hunger: 37.5, priority: 1,
     additionalVegetableValue: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4], ingrediantsNeeded: ['Eggplant'], altIngrediantsNeeded: ['Braised Eggplant'], foodValueMatch: [1], ingredientNumMatch: [1, 2], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Stuffed_Eggplant.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 23, name: 'California Roll', hp: 20, sanity: 10, hunger: 37.5, priority: 20,
     additionalFishValue: [1, 1.5, 2], ingrediantsNeeded: ['Seaweed'], foodValueMatch: [1], ingredientNumMatch: [2], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/California_Roll.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 24, name: 'Ceviche', hp: 20, sanity: 5, hunger: 25, priority: 20,
     additionalFishValue: [2], ingrediantsNeeded: ['Ice'], foodValueMatch: [1], ingredientNumMatch: [1, 2], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Ceviche.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 25, name: 'Melonsicle', hp: 3, sanity: 20, hunger: 12.5, priority: 10,
     additionalMeatValue: [0], additionalEggValue: [0], additionalVegetableValue: [0], ingrediantsNeeded: ['Watermelon', 'Twigs', 'Ice'], foodValueMatch: [3], ingredientNumMatch: [3, 4], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Melonsicle.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 26, name: 'Pumpkin Cookies', hp: 0, sanity: 15, hunger: 37.5, priority: 10,
     ingrediantsNeeded: ['Pumpkin'], altIngrediantsNeeded: ['Hot Pumpkin'], additionalSweetenerValue: [2, 3], foodValueMatch: [1], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Pumpkin_Cookies.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 27, name: 'Powdercake', hp: -3, sanity: 0, hunger: 0, priority: 10,
     ingrediantsNeeded: ['Corn', 'Twigs'], altIngrediantsNeeded: ['Popcorn', 'Twigs'], additionalSweetenerValue: [1, 2], ingredientNumMatch: [2, 3], foodValueMatch: [1], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Powdercake.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 28, name: 'Bisque', hp: 60, sanity: 5, hunger: 18.75, priority: 30,
     additionalFishValue: [1.5], ingrediantsNeeded: ['Limpets', 'Ice'], foodValueMatch: [1], ingredientNumMatch: [4], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/shipwrecked/Bisque.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 29, name: 'Caviar', hp: 3, sanity: 33, hunger: 12.5, priority: 20,
     additionalVegetableValue: [0.5, 1, 1.5, 2, 2.5, 3], ingrediantsNeeded: ['Roe'], altIngrediantsNeeded: ['Cooked Roe'], foodValueMatch: [1], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/shipwrecked/Caviar.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 30, name: 'Coffee', hp: 3, sanity: -5, hunger: 9.375, priority: 30,
     additionalDairyValue: [0, 1], additionalSweetenerValue: [0, 1], additionalMeatValue: [0], additionalFishValue: [0], additionalEggValue: [0], additionalVegetableValue: [0], additionalMonsterFoodValue: [0], additionalFruitValue: [1.5, 2], ingrediantsNeeded: ['Cooked Coffee Beans'], excludedIngredients: ['Berries', 'Roasted Berries', 'Coffee Beans', 'Butterfly Wings', 'Ice'], foodValueMatch: [8], ingredientNumMatch: [3, 4], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/shipwrecked/Coffee.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 31, name: 'Jelly-O Pop', hp: 20, sanity: 0, hunger: 12.5, priority: 20,
     ingrediantsNeeded: ['Jellyfish', 'Ice'], altIngrediantsNeeded: ['Dead Jellyfish', 'Ice'], altIngredientsNeededTwo: ['Cooked Jellyfish', 'Ice'], altIngredientsNeededThree: ['Dried Jellyfish', 'Ice'],
     foodValueMatch: [0], ingredientNumMatch: [2], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/shipwrecked/Jelly-O_Pop.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 32, name: 'Kabobs', hp: 3, sanity: 5, hunger: 37.5, priority: 5,
     ingrediantsNeeded: ['Twigs'], additionalMeatValue: [0.5, 1, 1.5, 2, 2.5, 3], ingredientNumMatch: [1], foodValueMatch: [1], inedibleNumMatch: [1], icon: '../images/icons/crockpot_meals/Kabobs.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 33, name: 'Shark Fin Soup', hp: 40, sanity: -10, hunger: 12.5, priority: 20,
     ingrediantsNeeded: ['Shark Fin'], foodValueMatch: [0], ingredientNumMatch: [1], inedibleNumMatch: [0, 1, 2, 3], icon: '../images/icons/crockpot_meals/shipwrecked/Shark_Fin_Soup.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 34, name: 'Tropical Bouillabaisse', hp: 20, sanity: 15, hunger: 37.5, priority: 35,
     ingrediantsNeeded: ['Neon Quattro', 'Pierrot Fish', 'Purple Grouper'], altIngrediantsNeeded: ['Cooked Neon Quattro', 'Cooked Pierrot Fish', 'Cooked Purple Grouper'], 
     altIngredientsNeededTwo: ['Cooked Neon Quattro', 'Pierrot Fish', 'Purple Grouper'], altIngredientsNeededThree: ['Neon Quattro', 'Cooked Pierrot Fish', 'Purple Grouper'], 
     altIngredientsNeededFour: ['Neon Quattro', 'Pierrot Fish', 'Cooked Purple Grouper'], altIngredientsNeededFive: ['Neon Quattro', 'Cooked Pierrot Fish', 'Cooked Purple Grouper'], altIngredientsNeededSix: ['Cooked Neon Quattro', 'Pierrot Fish', 'Cooked Purple Grouper'], altIngredientsNeededSeven: ['Cooked Neon Quattro', 'Cooked Pierrot Fish', 'Purple Grouper'], additionalVegetableValue: [1], foodValueMatch: [1], ingredientNumMatch: [3], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/shipwrecked/Tropical_Bouillabaisse.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 35, name: 'Waffles', hp: 60, sanity: 5, hunger: 37.5, priority: 10,
     additionalEggValue: [1, 4], additionalDairyValue: [1], ingrediantsNeeded: ['Butter', 'Berries'], altIngrediantsNeeded: ['Butter', 'Roasted Berries'], altIngredientsNeededTwo: ['Butter', 'Juicy Berries'],
     altIngredientsNeededThree: ['Butter', 'Roasted Juicy Berries'], ingredientNumMatch: [2, 3], foodValueMatch: [2], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Waffles.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 36, name: 'Wobster Bisque', hp: 60, sanity: 10, hunger: 25, priority: 30,
     ingrediantsNeeded: ['Wobster', 'Ice'], foodValueMatch: [0], ingredientNumMatch: [2], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/shipwrecked/Lobster_Bisque.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 37, name: 'Wobster Dinner', hp: 60, sanity: 50, hunger: 37.5, priority: 25,
     additionalMeatValue: [0], excludedIngredients: ['Ice'], additionalDairyValue: [1], ingrediantsNeeded: ['Wobster', 'Butter'], ingredientNumMatch: [2], foodValueMatch: [2], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/shipwrecked/Lobster_Dinner.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},     

    {id: 38, name: 'Fishsticks', hp: 40, sanity: 5, hunger: 37.5, priority: 10,
     ingrediantsNeeded: ['Twigs'],  additionalFishValue: [0.5, 1, 1.5, 2, 2.5, 3], foodValueMatch: [1], ingredientNumMatch: [1], inedibleNumMatch: [1], icon: '../images/icons/crockpot_meals/Fishsticks.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 39, name: 'Wet Goop', hp: 0, sanity: 0, hunger: 0, priority: -2, 
    icon: '../images/icons/crockpot_meals/Wet_Goop.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 40, name: 'Fresh Fruit Crepes', hp: 60, sanity: 15, hunger: 150, priority: 30,
    additionalFruitValue: [1.5, 2], additionalSweetenerValue: [1], ingrediantsNeeded: ['Butter'], ingredientNumMatch: [1], foodValueMatch: [2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Fresh_Fruit_Crepes.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 41, name: 'Monster Tartare', hp: 3, sanity: 10, hunger: 37.5, priority: 30,
    monsterFoodValue: [2], additionalVegetableValue: [0.5, 1], additionalEggValue: [1, 4], foodValueMatch: [2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Monster_Tartare.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 42, name: 'Mussel Bouillabaise', hp: 20, sanity: 15, hunger: 37.5, priority: 30,
    ingrediantsNeeded: ['Mussel'], additionalVegetableValue: [2], ingredientNumMatch: [2], inedibleNumMatch: [0], foodValueMatch: [1], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Mussel_Bouillabaise.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'},

    {id: 43, name: 'Sweet Potato Souffle', hp: 20, sanity: 15, hunger: 37.5, priority: 30,
    ingrediantsNeeded: ['Sweet Potato'], additionalEggValue: [2, 4, 8], ingredientNumMatch: [2], foodValueMatch: [1], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/portable_crockpot_meals/Sweet_Potato_Souffle.webp', crockpot: '../images/icons/misc/Portable_Crock_Pot.webp'}       
];

const hamletMeals = [
    {id: 1, name: 'Meatballs', hp: 3, sanity: 5, hunger: 62.5, priority: -1, 
    meatValue: [0.5, 1, 1.5, 2, 2.5], inedibleNumMatch: [0], foodValueMatch: [0], icon: '../images/icons/crockpot_meals/Meatballs.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 2, name: 'Bacon And Eggs', hp: 20, sanity: 5, hunger: 75, priority: 10, 
    meatValue: [1.5, 2, 2.5, 3], additionalVegetableValue: [0], eggValue: [2, 4], foodValueMatch: [1], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Bacon_and_Eggs.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 3, name: 'Meaty Stew', hp: 12, sanity: 5, hunger: 150, priority: 0, 
    meatValue: [3, 4], inedibleNumMatch: [0], foodValueMatch: [0], icon: '../images/icons/crockpot_meals/Meaty_Stew.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 4, name: 'Honey Nuggets', hp: 20, sanity: 5, hunger: 37.5, priority: 2, 
    meatValue: [0.5, 1, 1.5], sweetenerValue: [1, 2, 3], inedibleNumMatch: [0], fillers: true, icon: '../images/icons/crockpot_meals/Honey_Nuggets.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 5, name: 'Honey Ham', hp: 30, sanity: 5, hunger: 75, priority: 2,
    meatValue: [2, 2.5, 3], sweetenerValue: [1, 2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Honey_Ham.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 6, name: 'Taffy', hp: -3, sanity: 15, hunger: 25, priority: 10,
    sweetenerValue: [3, 4, 5, 6], additionalMeatValue: [0], inedibleNumMatch: [0, 1, 3], icon: '../images/icons/crockpot_meals/Taffy.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 7, name: 'Monster Lasanga', hp: -20, sanity: -20, hunger: 37.5, priority: 10,
    monsterFoodValue: [2, 3, 4],  inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Monster_Lasagna.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 8, name: 'Pierogi', hp: 40, sanity: 5, hunger: 37.5, priority: 5,
    meatValue: [0.5, 1], eggValue: [1, 2, 4], vegetableValue: [0.5, 1, 1.5, 2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Pierogi.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 9, name: 'Fist Full Of Jam', hp: 3, sanity: 5, hunger: 37.5, priority: 0,
     fruitValue: [0.5, 1, 1.5, 2, 2.5, 3], additionalMeatValue: [0], additionalVegetableValue: [0], inedibleNumMatch: [0], foodValueMatch: [2], icon: '../images/icons/crockpot_meals/Fist_Full_of_Jam.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 10, name: 'Fruit Medley', hp: 20, sanity: 5, hunger: 25, priority: 0,
     fruitValue: [3, 3.5, 4], additionalMeatValue: [0], additionalVegetableValue: [0], foodValueMatch: [2], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Fruit_Medley.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 11, name: 'Asparagus Soup', hp: 20, sanity: 5, hunger: 18.75, priority: 10,
     additionalVegetableValue: [1.5, 2, 2.5, 3, 3.5, 4], ingrediantsNeeded: ['Asparagus'], altIngrediantsNeeded: ['Cooked Asparagus'], foodValueMatch: [1], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Asparagus_Soup.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 12, name: 'Ratatouille', hp: 3, sanity: 5, hunger: 25, priority: 0,
    vegetableValue: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Ratatouille.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 13, name: 'Spicy Chili', hp: 20, sanity: 0, hunger: 37.5, priority: 10,
    vegetableValue: [1.5, 2], meatValue: [1.5, 2], icon: '../images/icons/crockpot_meals/Spicy_Chili.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 14, name: 'Froggle Bunwich', hp: 20, sanity: 5, hunger: 37.5, priority: 1,
    additionalVegetableValue: [0.5, 1, 1.5, 2, 2.5, 3], ingrediantsNeeded: ['Frog Legs'], altIngrediantsNeeded: ['Cooked Frog Legs'], foodValueMatch: [1], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 2], icon: '../images/icons/crockpot_meals/Froggle_Bunwich.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 15, name: 'Turkey Dinner', hp: 20, sanity: 5, hunger: 75, priority: 10,
     additionalMeatValue: [1.5, 2], additionalVegetableValue: [0.5, 1], additionalFruitValue: [0.5, 1], ingrediantsNeeded: ['Drumstick'], ingredientNumMatch: [2, 3], foodValueMatch: [2], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Turkey_Dinner.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 16, name: 'Banana Pop', hp: 20, sanity: 33, hunger: 12.5, priority: 20,
    additionalMeatValue: [0], ingrediantsNeeded: ['Banana', 'Ice', 'Twigs'], altIngrediantsNeeded: ['Banana', 'Ice', 'Dorsal Fin'], ingredientNumMatch: [3, 4], foodValueMatch: [1], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Banana_Pop.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 17, name: 'Fish Tacos', hp: 20, sanity: 5, hunger: 37.5, priority: 10,
    additionalFishValue: [0.5, 1], ingrediantsNeeded: ['Corn'], altIngrediantsNeeded: ['Popcorn'], foodValueMatch: [1], ingredientNumMatch: [1, 2], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Fish_Tacos.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 18, name: 'Mandrake Soup', hp: 100, sanity: 5, hunger: 150, priority: 10,
    ingrediantsNeeded: ['Mandrake'],  ingredientNumMatch: [1], foodValueMatch: [0], inedibleNumMatch: [0, 1, 2, 3], icon: '../images/icons/crockpot_meals/Mandrake_Soup.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 19, name: 'Ice Cream', hp: 0, sanity: 50, hunger: 25, priority: 10,
    additionalDairyValue: [1, 2], additionalMeatValue: [0], additionalVegetableValue: [0], additionalEggValue: [0], additionalSweetenerValue: [1, 2], ingrediantsNeeded: ['Ice', 'Electric Milk'], altIngrediantsNeeded: ['Ice', 'Butter'], foodValueMatch: [5], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/Ice_Cream.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 20, name: 'Butter Muffin', hp: 20, sanity: 5, hunger: 37.5, priority: 1,
    additionalVegetableValue: [0.5, 1, 1.5, 2, 2.5, 3], additionalMeatValue: [0], ingrediantsNeeded: ['Butterfly Wings'], altIngrediantsNeeded: ['Moon Moth Wings'], foodValueMatch: [2], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Butter_Muffin.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 21, name: 'Spicy Vegetable Stinger', hp: 3, sanity: 33, hunger: 25, priority: 15,
    additionalVegetableValue: [2.5, 3], additionalMeatValue: [0], ingrediantsNeeded: ['Asparagus', 'Ice'], altIngrediantsNeeded: ['Cooked Asparagus', 'Ice'], altIngredientsNeededTwo: ['Radish', 'Ice'], altIngredientsNeededThree: ['Cooked Radish', 'Ice'], foodValueMatch: [2], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/hamlet/Spicy_Vegetable_Stinger.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 22, name: 'Stuffed Eggplant', hp: 3, sanity: 5, hunger: 37.5, priority: 1,
    additionalVegetableValue: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4], ingrediantsNeeded: ['Eggplant'], altIngrediantsNeeded: ['Braised Eggplant'], foodValueMatch: [1], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/Stuffed_Eggplant.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 23, name: 'Melonsicle', hp: 3, sanity: 20, hunger: 12.5, priority: 10,
    additionalMeatValue: [0], additionalEggValue: [0], additionalVegetableValue: [0], ingrediantsNeeded: ['Watermelon', 'Twigs', 'Ice'], foodValueMatch: [3], ingredientNumMatch: [3, 4], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Melonsicle.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 24, name: 'Pumpkin Cookies', hp: 0, sanity: 15, hunger: 37.5, priority: 10,
    ingrediantsNeeded: ['Pumpkin'], altIngrediantsNeeded: ['Hot Pumpkin'], additionalSweetenerValue: [2, 3], foodValueMatch: [1], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Pumpkin_Cookies.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 25, name: 'Powdercake', hp: -3, sanity: 0, hunger: 0, priority: 10,
    ingrediantsNeeded: ['Corn', 'Twigs'], altIngrediantsNeeded: ['Popcorn', 'Twigs'], additionalSweetenerValue: [1, 2], ingredientNumMatch: [2, 3], foodValueMatch: [1], inedibleNumMatch: [1, 2], icon: '../images/icons/crockpot_meals/Powdercake.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 26, name: 'Trail Mix', hp: 30, sanity: 5, hunger: 12.5, priority: 10,
    additionalMeatValue: [0], additionalEggValue: [0], additionalVegetableValue: [0], additionalDairyValue: [0], ingrediantsNeeded: ['Roasted Birchnut', 'Berries'], altIngrediantsNeeded: ['Roasted Birchnut', 'Roasted Berries'], 
    altIngredientsNeededTwo: ['Roasted Birchnut', 'Juicy Berries'], altIngredientsNeededThree: ['Roasted Birchnut', 'Roasted Juicy Berries'], additionalFruitValue: [0.5, 1, 1.5, 2], foodValueMatch: [5], ingredientNumMatch: [2, 3, 4], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Trail_Mix.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 27, name: 'Kabobs', hp: 3, sanity: 5, hunger: 37.5, priority: 5,
    ingrediantsNeeded: ['Twigs'], additionalMeatValue: [0.5, 1, 1.5, 2, 2.5, 3], ingredientNumMatch: [1], foodValueMatch: [1], inedibleNumMatch: [1], icon: '../images/icons/crockpot_meals/Kabobs.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 28, name: 'Fishsticks', hp: 40, sanity: 5, hunger: 37.5, priority: 10,
    ingrediantsNeeded: ['Twigs'],  additionalFishValue: [0.5, 1, 1.5, 2, 2.5, 3], foodValueMatch: [1], ingredientNumMatch: [1], inedibleNumMatch: [1], icon: '../images/icons/crockpot_meals/Fishsticks.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 29, name: 'Wet Goop', hp: 0, sanity: 0, hunger: 0, priority: -2, 
    notValid: true, ingrediantsNeeded: [false], altIngrediantsNeeded: [false], foodValueMatch: [0], ingrediantNumMatch: [0], icon: '../images/icons/crockpot_meals/Wet_Goop.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 30, name: 'Waffles', hp: 60, sanity: 5, hunger: 37.5, priority: 10,
    additionalEggValue: [1, 4], additionalDairyValue: [1], ingrediantsNeeded: ['Butter', 'Berries'], altIngrediantsNeeded: ['Butter', 'Roasted Berries'], altIngredientsNeededTwo: ['Butter', 'Juicy Berries'],
    altIngredientsNeededThree: ['Butter', 'Roasted Juicy Berries'], ingredientNumMatch: [2, 3], foodValueMatch: [2], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/Waffles.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 31, name: 'Feijoada', hp: 20, sanity: 15, hunger: 75, priority: 30,
    additionalMeatValue: [0.5, 1], ingrediantsNeeded: ['Bean Bugs'], altIngrediantsNeeded: ['Cooked Bean Bugs'], ingredientNumMatch: [3], foodValueMatch: [1], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/hamlet/Feijoada.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 32, name: 'Hard Shell Tacos', hp: 20, sanity: 5, hunger: 37.5, priority: 1,
    additionalVegetableValue: [0.5, 1, 1.5, 2], ingrediantsNeeded: ['Weevole Carapace'], ingredientNumMatch: [2], foodValueMatch: [1], inedibleNumMatch: [2, 3], icon: '../images/icons/crockpot_meals/hamlet/Hard_Shell_Tacos.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 33, name: 'Gummy Cake', hp: -3, sanity: -5, hunger: 150, priority: 1,
    additionalMeatValue: [0], additionalSweetenerValue: [1, 2], ingrediantsNeeded: ['Gummy Slug'], altIngrediantsNeeded: ['Cooked Gummy Slug'], foodValueMatch: [2], ingredientNumMatch: [1, 2, 3], inedibleNumMatch: [0, 1, 2], icon: '../images/icons/crockpot_meals/hamlet/Gummy_Cake.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 34, name: 'Nettle Rolls', hp: 20, sanity: 5, hunger: 25, priority: 0,
    ingrediantsNeeded: ['Nettle'], foodValueMatch: [0], ingredientNumMatch: [3, 4], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/hamlet/Nettle_Rolls.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 35, name: 'Tea', hp: 3, sanity: 33, hunger: 12.5, priority: 25, 
    additionalSweetenerValue: [1, 2], additionalMeatValue: [0], additionalVegetableValue: [0], ingrediantsNeeded: ['Piko'], ingredientNumMatch: [2], foodValueMatch: [3], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/hamlet/Tea.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 36, name: 'Iced Tea', hp: 3, sanity: 33, hunger: 12.5, priority: 30, 
    additionalSweetenerValue: [1], additionalMeatValue: [0], additionalVegetableValue: [0], ingrediantsNeeded: ['Piko', 'Ice'], ingredientNumMatch: [3], foodValueMatch: [3], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/hamlet/Iced_Tea.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 37, name: 'Snake Bone Soup', hp: 40, sanity: 10, hunger: 25, priority: 20,
    additionalMeatValue: [2], ingrediantsNeeded: ['Snake Bone'], ingredientNumMatch: [2], foodValueMatch: [1], inedibleNumMatch: [2], icon: '../images/icons/crockpot_meals/hamlet/Snake_Bone_Soup.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 38, name: 'Coffee', hp: 3, sanity: -5, hunger: 9.375, priority: 30,
     additionalDairyValue: [0, 1], additionalSweetenerValue: [0, 1], additionalMeatValue: [0], additionalFishValue: [0], additionalEggValue: [0], additionalVegetableValue: [0], additionalMonsterFoodValue: [0], additionalFruitValue: [1.5, 2], ingrediantsNeeded: ['Cooked Coffee Beans'], excludedIngredients: ['Berries', 'Roasted Berries', 'Coffee Beans', 'Butterfly Wings', 'Ice'], foodValueMatch: [8], ingredientNumMatch: [3, 4], inedibleNumMatch: [0], icon: '../images/icons/crockpot_meals/shipwrecked/Coffee.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 39, name: 'Steamed Ham Sandwich', hp: 40, sanity: 15, hunger: 37.5, priority: 5,
    additionalMeatValue: [1], additionalVegetableValue: [2, 2.5, 3], ingrediantsNeeded: ['Meat', 'Foliage'], altIngrediantsNeeded: ['Cooked Meat', 'Foliage'], foodValueMatch: [2], ingredientNumMatch: [2, 3], inedibleNumMatch: [0, 1], icon: '../images/icons/crockpot_meals/hamlet/Steamed_Ham_Sandwich.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'},

    {id: 40, name: 'Dragonpie', hp: 40, sanity: 5, hunger: 75, priority: 1,
     ingrediantsNeeded: ['Dragon Fruit'], altIngrediantsNeeded:['Prepared Dragon Fruit'], additionalMeatValue: [0], foodValueMatch: [1], ingredientNumMatch: [1], inedibleNumMatch: [0, 1, 2, 3], icon: '../images/icons/crockpot_meals/Dragonpie.webp', crockpot: '../images/icons/misc/Crock_Pot.webp'}
];

const reignOfGiantsFood = [
    {id: 1, name: 'Morsel', hp: 0, sanity: -10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Morsel.webp'},

    {id: 2, name: 'Cooked Morsel', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Cooked_Morsel.webp'},

    {id: 3, name: 'Drumstick', hp: 0, sanity: -10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Drumstick.webp'},

    {id: 4, name: 'Cooked Drumstick', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Fried_Drumstick.webp'},

    {id: 5, name: 'Frog Legs', hp: 0, sanity: -10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Frog_Legs.webp'},

    {id: 6, name: 'Cooked Frog Legs', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Cooked_Frog_Legs.webp'},

    {id: 7, name: 'Meat', hp: 1, sanity: -10, hunger: 25, meatValue: 1, icon: '../images/icons/meats/Meat.webp'},

    {id: 8, name: 'Cooked Meat', hp: 3, sanity: 0, hunger: 25, meatValue: 1, icon: '../images/icons/meats/Cooked_Meat.webp'},

    {id: 9, name: 'Leafy Meat', hp: 0, sanity: -10, hunger: 12.5, meatValue: 1, icon: '../images/icons/meats/Leafy_Meat.webp'},

    {id: 10, name: 'Cooked Leafy Meat', hp: 1, sanity: 0, hunger: 18.75, meatValue: 1, icon: '../images/icons/meats/Cooked_Leafy_Meat.webp'},

    {id: 11, name: 'Monster Meat', hp: -20, sanity: -15, hunger: 18.75, meatValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/Monster_Meat.webp'},

    {id: 12, name: 'Cooked Monster Meat', hp: -3, sanity: -10, hunger: 18.75, meatValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/Cooked_Monster_Meat.webp'},

    {id: 13, name: 'Monster Jerky', hp: -3, sanity: -5, hunger: 18.75, meatValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/Monster_Jerky.webp'},

    {id: 14, name: 'Small Jerky', hp: 8, sanity: 10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Small_Jerky.webp'},

    {id: 15, name: 'Jerky', hp: 20, sanity: 15, hunger: 15, meatValue: 1, icon: '../images/icons/meats/Jerky.webp'},

    {id: 16, name: 'Batilisk Wing', hp: 3, sanity: -10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Batilisk_Wing.webp'},

    {id: 17, name: 'Cooked Batilisk Wing', hp: 8, sanity: 0, hunger: 18.75, meatValue: 0.5, icon: '../images/icons/meats/Cooked_Batilisk_Wing.webp'},

    {id: 18, name: 'Naked Nostrils', hp: 3, sanity: -10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Naked_Nostrils.webp'},

    {id: 19, name: 'Charred Nostrils', hp: 8, sanity: 0, hunger: 18.5, meatValue: 0.5, icon: '../images/icons/meats/Charred_Nostrils.webp'},

    {id: 20, name: 'Koalefant Trunk', hp: 30, sanity: 0, hunger: 37.5, meatValue: 1, icon: '../images/icons/meats/Koalefant_Trunk.webp'},

    {id: 21, name: 'Winter Koalefant Trunk', hp: 30, sanity: 0, hunger: 37.5, meatValue: 1, icon: '../images/icons/meats/Winter_Koalefant_Trunk.webp'},

    {id: 22, name: 'Koalefant Trunk Steak', hp: 40, sanity: 0, hunger: 75, meatValue: 1, icon: '../images/icons/meats/Koalefant_Trunk_Steak.webp'},

    {id: 23, name: 'Freshwater Fish', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/Freshwater_Fish.webp'},

    {id: 24, name: 'Fish Morsel', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/Fish_Morsel.webp'},

    {id: 25, name: 'Cooked Fish Morsel', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/Cooked_Fish_Morsel.webp'},

    {id: 26, name: 'Raw Fish', hp: 8, sanity: 0, hunger: 25, meatValue: 1, fishValue: 1, icon: '../images/icons/meats/Raw_Fish.webp'},

    {id: 27, name: 'Fish Steak', hp: 8, sanity: 0, hunger: 25, meatValue: 1, fishValue: 1, icon: '../images/icons/meats/Fish_Steak.webp'},

    {id: 28, name: 'Runty Guppy', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/fishes/Runty_Guppy.webp', width: '70px', id: 'runty-gup'},

    {id: 29, name: 'Needlenosed Squirt', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/fishes/Needlenosed_Squirt.webp', width: '70px', id: 'needle-squirt'},

    {id: 30, name: 'Bitty Baitfish', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/fishes/Bitty_Baitfish.webp', width: '75px', id: 'bitty-bait'},

    {id: 31, name: 'Smolt Fry', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/fishes/Smolt_Fry.webp', width: '70px', id: 'smolt'},

    {id: 32, name: 'Popperfish', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/meats/fishes/Popperfish.webp', width: '90px', id: 'popper'},

    {id: 33, name: 'Fallounder', hp: 0, sanity: -10, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/fishes/Fallounder.webp', width: '80px', id: 'fall'},

    {id: 34, name: 'Bloomfin Tuna', hp: 0, sanity: -10, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/fishes/Bloomfin_Tuna.webp', width: '75px', id: 'bloomfin'},

    {id: 35, name: 'Scorching Sunfish', hp: 0, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/fishes/Scorching_Sunfish.webp', width: '63px', id: 'scorching-sun'},

    {id: 36, name: 'Spittlefish', hp: 0, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/fishes/Spittlefish.webp', width: '75px', id: 'spittle'},

    {id: 37, name: 'Mudfish', hp: 8, sanity: 0, hunger: 25, meatValue: 1, fishValue: 1, icon: '../images/icons/meats/fishes/Mudfish.webp', width: '80px', id: 'mud'},

    {id: 38, name: 'Deep Bass', hp: 8, sanity: 0, hunger: 25, meatValue: 1, fishValue: 1, icon: '../images/icons/meats/fishes/Deep_Bass.webp', width: '68px', id: 'deep'},

    {id: 39, name: 'Dandy Lionfish', hp: 8, sanity: 0, hunger: 25, meatValue: 1, fishValue: 1, icon: '../images/icons/meats/fishes/Dandy_Lionfish.webp', width: '75px', id: 'dandy'},

    {id: 40, name: 'Black Catfish', hp: 8, sanity: 0, hunger: 25, meatValue: 1, fishValue: 1, icon: '../images/icons/meats/fishes/Black_Catfish.webp', width: '70px', id: 'black-cat'},

    {id: 41, name: 'Corn Cod', hp: 3, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/meats/fishes/Corn_Cod.webp', width: '80px', id: 'corn-cod'},

    {id: 42, name: 'Dappled Koi', hp: 8, sanity: 0, hunger: 25, meatValue: 1, fishValue: 1, icon: '../images/icons/meats/fishes/Dappled_Koi.webp', width: '75px', id: 'dappled-koi'},

    {id: 43, name: 'Golden Koi', hp: 8, sanity: 0, hunger: 25, meatValue: 1, fishValue: 1, icon: '../images/icons/meats/fishes/Golden_Koi.webp', width: '80px', id: 'golden-koi'},

    {id: 44, name: 'Ice Bream', hp: 8, sanity: 0, hunger: 25, meatValue: 1, fishValue: 1, icon: '../images/icons/meats/fishes/Ice_Bream.webp', width: '70px', id: 'ice-bream'},

    {id: 45, name: 'Eel', hp: 3, sanity: 0, hunger: 9.375, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/Eel.webp'},

    {id: 46, name: 'Cooked Eel', hp: 8, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/Cooked_Eel.webp'},

    {id: 47, name: 'Barnacles', hp: 0, sanity: -5, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/Barnacles.webp'},

    {id: 48, name: 'Cooked Barnacles', hp: 1, sanity: -1, hunger: 12.5, meatValue: 0.5, fishValue: 0.5, icon: '../images/icons/meats/Cooked_Barnacles.webp'},

    {id: 49, name: 'Wobster', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', meatValue: 1, fishValue: 1, icon: '../images/icons/meats/Wobster_(DST).webp'},

    {id: 50, name: 'Egg', hp: 0, sanity: 0, hunger: 9.375, eggValue: 1, icon: '../images/icons/eggs/Egg.webp'},

    {id: 51, name: 'Cooked Egg', hp: 0, sanity: 0, hunger: 12.5, eggValue: 1, icon: '../images/icons/eggs/Cooked_Egg.webp'},

    {id: 52, name: 'Tallbird Egg', hp: 3, sanity: 0, hunger: 20, eggValue: 4, icon: '../images/icons/eggs/Tallbird_Egg.webp'},

    {id: 53, name: 'Cooked Tallbird Egg', hp: 0, sanity: 0, hunger: 35.7, eggValue: 4, icon: '../images/icons/eggs/Fried_Tallbird_Egg.webp'},

    {id: 54, name: 'Berries', hp: 0, sanity: 0, hunger: 9.375, fruitValue: 0.5, icon: '../images/icons/fruits/Berries.webp'},

    {id: 55, name: 'Roasted Berries', hp: 1, sanity: 0, hunger: 12.5, fruitValue: 0.5, icon: '../images/icons/fruits/Roasted_Berries.webp'},

    {id: 56, name: 'Juicy Berries', hp: 1, sanity: 0, hunger: 12.5, fruitValue: 0.5, icon: '../images/icons/fruits/Juicy_Berries.webp'},

    {id: 57, name: 'Roasted Juicy Berries', hp: 3, sanity: 0, hunger: 18.75, fruitValue: 0.5, icon: '../images/icons/fruits/Roasted_Juicy_Berries.webp'},

    {id: 58, name: 'Dragon Fruit', hp: 3, sanity: 0, hunger: 9.375, fruitValue: 1, icon: '../images/icons/fruits/Dragon_Fruit.webp'},

    {id: 59, name: 'Prepared Dragon Fruit', hp: 20, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Prepared_Dragon_Fruit.webp'},

    {id: 60, name: 'Durian', hp: -3, sanity: -5, hunger: 25, fruitValue: 1, monsterFoodValue: 1, icon: '../images/icons/fruits/Durian.webp'},

    {id: 61, name: 'Extra Smelly Durian', hp: 0, sanity: -5, hunger: 25, fruitValue: 1, monsterFoodValue: 1, icon: '../images/icons/fruits/Extra_Smelly_Durian.webp'},

    {id: 62, name: 'Pomegranate', hp: 3, sanity: 0, hunger: 9.375, fruitValue: 1, icon: '../images/icons/fruits/Pomegranate.webp'},

    {id: 63, name: 'Sliced Pomegranate', hp: 20, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Sliced_Pomegranate.webp'},

    {id: 64, name: 'Watermelon', hp: 3, sanity: 5, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Watermelon.webp'},

    {id: 65, name: 'Grilled Watermelon', hp: 1, sanity: 7.5, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Grilled_Watermelon.webp'},

    {id: 66, name: 'Cave Banana', hp: 1, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Cave_Banana.webp'},

    {id: 67, name: 'Cooked Cave Banana', hp: 3, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Cooked_Cave_Banana.webp'},

    {id: 68, name: 'Glow Berry', hp: 11, sanity: -10, hunger: 25, fruitValue: 1, icon: '../images/icons/fruits/Glow_Berry.webp'},

    {id: 69, name: 'Lesser Glow Berry', hp: 3, sanity: -10, hunger: 12.5, fruitValue: 0.5, icon: '../images/icons/fruits/Lesser_Glow_Berry.webp'},

    {id: 70, name: 'Fig', hp: 0, sanity: 0, hunger: 12.5, fruitValue: 0.5, icon: '../images/icons/fruits/Fig.webp'},

    {id: 71, name: 'Cooked Fig', hp: 1, sanity: 0, hunger: 18.75, fruitValue: 0.5, icon: '../images/icons/fruits/Cooked_Fig.webp'},

    {id: 72, name: 'Honey', hp: 3, sanity: 0, hunger: 9.375, sweetenerValue: 1, icon: '../images/icons/sweeteners/Honey.webp'},

    {id: 73, name: 'Honeycomb', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', sweetenerValue: 1, icon: '../images/icons/sweeteners/Honeycomb.webp'},

    {id: 74, name: 'Royal Jelly', hp: 40, sanity: 15, hunger: 12.5, sweetenerValue: 3, icon: '../images/icons/sweeteners/Royal_Jelly.webp'},

    {id: 75, name: 'Carrot', hp: 1, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Carrot.webp'},

    {id: 76, name: 'Roasted Carrot', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Roasted_Carrot.webp'},

    {id: 77, name: 'Asparagus', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Asparagus.webp'},

    {id: 78, name: 'Cooked Asparagus', hp: 3, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Cooked_Asparagus.webp'},

    {id: 79, name: 'Corn', hp: 3, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Corn.webp'},

    {id: 80, name: 'Popcorn', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Popcorn.webp'},

    {id: 81, name: 'Eggplant', hp: 8, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Eggplant.webp'},

    {id: 82, name: 'Braised Eggplant', hp: 20, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Braised_Eggplant.webp'},

    {id: 83, name: 'Pumpkin', hp: 3, sanity: 0, hunger: 37.5, vegetableValue: 1, icon: '../images/icons/vegetables/Pumpkin.webp'},

    {id: 84, name: 'Hot Pumpkin', hp: 8, sanity: 0, hunger: 37.5, vegetableValue: 1, icon: '../images/icons/vegetables/Hot_Pumpkin.webp'},

    {id: 85, name: 'Cactus Flesh', hp: -3, sanity: -5, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Cactus_Flesh.webp'},

    {id: 86, name: 'Cooked Cactus Flesh', hp: 1, sanity: 15, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Cooked_Cactus_Flesh.webp'},

    {id: 87, name: 'Cactus Flower', hp: 8, sanity: 5, hunger: 12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cactus_Flower.webp'},

    {id: 88, name: 'Lichen', hp: 3, sanity: -5, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Lichen.webp'},

    {id: 89, name: 'Kelp Fronds', hp: -1, sanity: -10, hunger: 9.375, vegetableValue: 0.5, icon: '../images/icons/vegetables/Kelp_Fronds.webp'},

    {id: 90, name: 'Cooked Kelp Fronds', hp: 0, sanity: -5, hunger: 9.375, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cooked_Kelp_Fronds.webp'},

    {id: 91, name: 'Dried Kelp Fronds', hp: 1, sanity: 10, hunger: 9.375, vegetableValue: 0.5, icon: '../images/icons/vegetables/Dried_Kelp_Fronds.webp'},

    {id: 92, name: 'Ripe Stone Fruit', hp: 1, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Ripe_Stone_Fruit.webp'},

    {id: 93, name: 'Cooked Stone Fruit', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Cooked_Stone_Fruit.webp'},

    {id: 94, name: 'Garlic', hp: 0, sanity: -10, hunger: 9.375, vegetableValue: 1, icon: '../images/icons/vegetables/Garlic.webp'},

    {id: 95, name: 'Roasted Garlic', hp: 1, sanity: -5, hunger: 9.375, vegetableValue: 1, icon: '../images/icons/vegetables/Roast_Garlic.webp'},

    {id: 96, name: 'Onion', hp: 0, sanity: -10, hunger: 9.375, vegetableValue: 1, icon: '../images/icons/vegetables/Onion.webp'},

    {id: 97, name: 'Roasted Onion', hp: 1, sanity: -5, hunger: 9.375, vegetableValue: 1, icon: '../images/icons/vegetables/Roast_Onion.webp'},

    {id: 98, name: 'Pepper', hp: -20, sanity: -15, hunger: 9.375, vegetableValue: 1, icon: '../images/icons/vegetables/Pepper.webp'},

    {id: 99, name: 'Roasted Pepper', hp: -3, sanity: -10, hunger: 9.375, vegetableValue: 1, icon: '../images/icons/vegetables/Roasted_Pepper.webp'},

    {id: 100, name: 'Potato', hp: -3, sanity: -5, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Potato.webp'},

    {id: 101, name: 'Roasted Potato', hp: 20, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Roast_Potato.webp'},

    {id: 102, name: 'Toma Root', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Toma_Root.webp'},

    {id: 103, name: 'Roasted Toma Root', hp: 20, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Roast_Toma_Root.webp'},

    {id: 104, name: 'Mandrake', hp: 60, sanity: 0, hunger: 75, vegetableValue: 1, icon: '../images/icons/vegetables/Mandrake.webp'},

    {id: 105, name: 'Cooked Mandrake', hp: 100, sanity: 0, hunger: 150, vegetableValue: 1, icon: '../images/icons/vegetables/Cooked_Mandrake.webp'},

    {id: 106, name: 'Blue Cap', hp: 20, sanity: -15, hunger: 12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Blue_Cap.webp'},

    {id: 107, name: 'Cooked Blue Cap', hp: -3, sanity: 10, hunger: 0, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cooked_Blue_Cap.webp'},

    {id: 108, name: 'Green Cap', hp: 0, sanity: -50, hunger: 12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Green_Cap.webp'},

    {id: 109, name: 'Cooked Green Cap', hp: -1, sanity: 15, hunger: 0, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cooked_Green_Cap.webp'},

    {id: 110, name: 'Red Cap', hp: -20, sanity: 0, hunger: 12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Red_Cap.webp'},

    {id: 111, name: 'Cooked Red Cap', hp: 1, sanity: -10, hunger: 0, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cooked_Red_Cap.webp'},

    {id: 112, name: 'Moon Shroom', hp: 0, sanity: 10, hunger: 12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Moon_Shroom.webp'},

    {id: 113, name: 'Cooked Moon Shroom', hp: 0, sanity: -10, hunger: -12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cooked_Moon_Shroom.webp'},

    {id: 114, name: 'Forget-Me-Lots', hp: 0, sanity: 1, hunger: 0, vegetableValue: 0, icon: '../images/icons/vegetables/Forget-Me-Lots.webp'},

    {id: 115, name: 'Butter', hp: 40, sanity: 0, hunger: 25, dairy: true, dairyValue: 1, icon: '../images/icons/dairy/Butter.webp'},

    {id: 116, name: 'Electric Milk', hp: 3, sanity: 10, hunger: 12.5, dairy: true, dairyValue: 1, icon: '../images/icons/dairy/Electric_Milk.webp'},

    {id: 117, name: 'Butterfly Wings', hp: 8, sanity: 0, hunger: 9.375, icon: '../images/icons/other_edibles/Butterfly_Wings.webp'},

    {id: 118, name: 'Moon Moth Wings', hp: 8, sanity: 15, hunger: 9.375, icon: '../images/icons/other_edibles/Moon_Moth_Wings.webp'},

    {id: 119, name: 'Roasted Birchnut', hp: 1, sanity: 0, hunger: 9.375, icon: '../images/icons/other_edibles/Roasted_Birchnut.webp'},

    {id: 120, name: 'Ice', hp: 0.5, sanity: 0, hunger: 2.3, icon: '../images/icons/other_edibles/Ice.webp'},

    {id: 121, name: 'Twigs', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', inedible: true, icon: '../images/icons/inedibles/Twigs.webp'},

    {id: 122, name: 'Bone Shards', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', inedible: true, icon: '../images/icons/inedibles/Bone_Shards.webp'},

    {id: 123, name: 'Volt Goat Horn', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', inedible: true, icon: '../images/icons/inedibles/Volt_Goat_Horn.webp'},

    {id: 124, name: 'Moleworm', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', meatValue: 0.5, inedible: true, icon: '../images/icons/inedibles/Moleworm.webp'},

    {id: 125, name: 'Nightmare Fuel', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', inedible: true, icon: '../images/icons/inedibles/Nightmare_Fuel.webp'},

    {id: 126, name: 'Collected Dust', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', icon: '../images/icons/inedibles/Collected_Dust.webp'}
];

const shipwreckedIngredients= [
    {id: 1, name: 'Morsel', hp: 0, sanity: -10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Morsel.webp'},

    {id: 2, name: 'Cooked Morsel', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Cooked_Morsel.webp'},

    {id: 3, name: 'Drumstick', hp: 0, sanity: -10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Drumstick.webp'},

    {id: 4, name: 'Cooked Drumstick', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Fried_Drumstick.webp'},

    {id: 5, name: 'Meat', hp: 1, sanity: -10, hunger: 25, meatValue: 1, icon: '../images/icons/meats/Meat.webp'},

    {id: 6, name: 'Cooked Meat', hp: 3, sanity: 0, hunger: 25, meatValue: 1, icon: '../images/icons/meats/Cooked_Meat.webp'},

    {id: 7, name: 'Monster Meat', hp: -20, sanity: -15, hunger: 18.75, meatValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/Monster_Meat.webp'},

    {id: 8, name: 'Cooked Monster Meat', hp: -3, sanity: -10, hunger: 18.75, meatValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/Cooked_Monster_Meat.webp'},

    {id: 9, name: 'Monster Jerky', hp: -3, sanity: -5, hunger: 18.75, meatValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/Monster_Jerky.webp'},

    {id: 10, name: 'Small Jerky', hp: 8, sanity: 10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Small_Jerky.webp'},

    {id: 11, name: 'Jerky', hp: 20, sanity: 15, hunger: 15, meatValue: 1, icon: '../images/icons/meats/Jerky.webp'},

    {id: 12, name: 'Dead Dogfish', hp: 1, sanity: 0, hunger: 25, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/shipwrecked/Dead_Dogfish.webp'},

    {id: 13, name: 'Raw Fish', hp: 1, sanity: 0, hunger: 25, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/Raw_Fish.webp'},

    {id: 14, name: 'Fish Steak', hp: 20, sanity: 0, hunger: 25, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/Fish_Steak.webp'},

    {id: 15, name: 'Fish', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/Fish.webp'},

    {id: 16, name: 'Cooked Fish', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/Cooked_Fish.webp'},

    {id: 17, name: 'Tropical Fish', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/shipwrecked/Tropical_Fish.webp'},

    {id: 18, name: 'Cooked Fish Morsel', hp: 1, sanity: 0, hunger: 12.5, fishValue: 0.5, icon: '../images/icons/meats/Cooked_Fish_Morsel.webp'},

    {id: 19, name: 'Fish Morsel', hp: 1, sanity: 0, hunger: 12.5, fishValue: 0.5, icon: '../images/icons/meats/Fish_Morsel.webp'},

    {id: 20, name: 'Neon Quattro', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue:1, icon: '../images/icons/meats/shipwrecked/Neon_Quattro.webp'},

    {id: 21, name: 'Cooked Neon Quattro', hp: 3, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/shipwrecked/Cooked_Neon_Quattro.webp'},

    {id: 22, name: 'Pierrot Fish', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/shipwrecked/Pierrot_Fish.webp'},

    {id: 23, name: 'Cooked Pierrot Fish', hp: 3, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/shipwrecked/Cooked_Pierrot_Fish.webp'},

    {id: 24, name: 'Purple Grouper', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/shipwrecked/Purple_Grouper.webp'},

    {id: 25, name: 'Cooked Purple Grouper', hp: 3, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/shipwrecked/Cooked_Purple_Grouper.webp'},

    {id: 26, name: 'Jellyfish', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', fishValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/shipwrecked/Jellyfish.webp'},

    {id: 27, name: 'Dead Jellyfish', hp: 10, sanity: 0, hunger: 10, fishValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/shipwrecked/Dead_Jellyfish.webp'},

    {id: 28, name: 'Cooked Jellyfish', hp: 10, sanity: 0, hunger: 18.75, fishValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/shipwrecked/Cooked_Jellyfish.webp'},

    {id: 29, name: 'Dried Jellyfish', hp: 10, sanity: 0, hunger: 18.75, fishValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/shipwrecked/Dried_Jellyfish.webp'},

    {id: 30, name: 'Roe', hp: 1, sanity: 0, hunger: 4.6875, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/shipwrecked/Roe.webp'},

    {id: 31, name: 'Cooked Roe', hp: 0, sanity: 0, hunger: 4.6875, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/shipwrecked/Cooked_Roe.webp'},

    {id: 32, name: 'Shark Fin', hp: 20, sanity: -15, hunger: 25, fishValue: 1, meatValue: 0.5, icon: '../images/icons/meats/shipwrecked/Shark_Fin.webp'},

    {id: 33, name: 'Wobster', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', fishValue: 2, icon: '../images/icons/meats/shipwrecked/Wobster.webp'},

    {id: 34, name: 'Mussel', hp: 0, sanity: -15, hunger: 12.5, fishValue: 0.5, icon: '../images/icons/meats/shipwrecked/Mussel.webp'},

    {id: 35, name: 'Cooked Mussel', hp: 1, sanity: 0, hunger: 12.5, fishValue: 0.5, icon: '../images/icons/meats/shipwrecked/Cooked_Mussel.webp'},

    {id: 36, name: 'Limpets', hp: 0, sanity: -10, hunger: 12.5, fishValue: 0.5, icon: '../images/icons/meats/shipwrecked/Limpets.webp'},

    {id: 37, name: 'Cooked Limpets', hp: 1, sanity: 0, hunger: 12.5, fishValue: 0.5, icon: '../images/icons/meats/shipwrecked/Cooked_Limpets.webp'},

    {id: 38, name: 'Crabbit', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', fishValue: 0.5, icon: '../images/icons/inedibles/shipwrecked/Crabbit.webp'},

    {id: 39, name: 'Egg', hp: 0, sanity: 0, hunger: 9.375, eggValue: 1, icon: '../images/icons/eggs/Egg.webp'},

    {id: 40, name: 'Cooked Egg', hp: 0, sanity: 0, hunger: 12.5, eggValue: 1, icon: '../images/icons/eggs/Cooked_Egg.webp'},

    {id: 41, name: 'Tallbird Egg', hp: 3, sanity: 0, hunger: 20, eggValue: 4, icon: '../images/icons/eggs/Tallbird_Egg.webp'},

    {id: 42, name: 'Cooked Tallbird Egg', hp: 0, sanity: 0, hunger: 35.7, eggValue: 4, icon: '../images/icons/eggs/Fried_Tallbird_Egg.webp'},

    {id: 43, name: 'Doydoy Egg', hp: 3, sanity: 0, hunger: 25, eggValue: 1, icon: '../images/icons/eggs/shipwrecked/Doydoy_Egg.webp'},

    {id: 44, name: 'Fried Doydoy Egg', hp: 0, sanity: 0, hunger: 37.5, eggValue: 1, icon: '../images/icons/eggs/shipwrecked/Fried_Doydoy_Egg.webp'},

    {id: 45, name: 'Berries', hp: 0, sanity: 0, hunger: 9.375, fruitValue: 0.5, icon: '../images/icons/fruits/Berries.webp'},

    {id: 46, name: 'Roasted Berries', hp: 1, sanity: 0, hunger: 12.5, fruitValue: 0.5, icon: '../images/icons/fruits/Roasted_Berries.webp'},

    {id: 47, name: 'Dragon Fruit', hp: 3, sanity: 0, hunger: 9.375, fruitValue: 1, icon: '../images/icons/fruits/Dragon_Fruit.webp'},

    {id: 48, name: 'Prepared Dragon Fruit', hp: 20, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Prepared_Dragon_Fruit.webp'},

    {id: 49, name: 'Durian', hp: -3, sanity: -5, hunger: 25, fruitValue: 1, monsterFoodValue: 1, icon: '../images/icons/fruits/Durian.webp'},

    {id: 50, name: 'Extra Smelly Durian', hp: 0, sanity: -5, hunger: 25, fruitValue: 1, monsterFoodValue: 1, icon: '../images/icons/fruits/Extra_Smelly_Durian.webp'},

    {id: 51, name: 'Pomegranate', hp: 3, sanity: 0, hunger: 9.375, fruitValue: 1, icon: '../images/icons/fruits/Pomegranate.webp'},

    {id: 52, name: 'Sliced Pomegranate', hp: 20, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Sliced_Pomegranate.webp'},

    {id: 53, name: 'Watermelon', hp: 3, sanity: 5, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Watermelon.webp'},

    {id: 54, name: 'Grilled Watermelon', hp: 1, sanity: 7.5, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Grilled_Watermelon.webp'}, 

    {id: 55, name: 'Banana', hp: 1, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/shipwrecked/Banana.webp'},

    {id: 56, name: 'Cooked Banana', hp: 3, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Cooked_Cave_Banana.webp'},

    {id: 57, name: 'Halved Coconut', hp: 1, sanity: 0, hunger: 4.6875, fruitValue: 1, icon: '../images/icons/fruits/shipwrecked/Halved_Coconut.webp'},

    {id: 58, name: 'Roasted Coconut', hp: 1, sanity: 0, hunger: 9.375, fruitValue: 1, icon: '../images/icons/fruits/shipwrecked/Roasted_Coconut.webp'},

    {id: 59, name: 'Coffee Beans', hp: 0, sanity: 0, hunger: 9.375, fruitValue: 0.5, icon: '../images/icons/fruits/shipwrecked/Coffee_Beans.webp'},

    {id: 60, name: 'Cooked Coffee Beans', hp: 0, sanity: -5, hunger: 9.375, fruitValue: 0.5, icon: '../images/icons/fruits/shipwrecked/Cooked_Coffee_Beans.webp'},

    {id: 61, name: 'Honey', hp: 3, sanity: 0, hunger: 9.375, sweetenerValue: 1, icon: '../images/icons/sweeteners/Honey.webp'},

    {id: 62, name: 'Honeycomb', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', sweetenerValue: 1, icon: '../images/icons/sweeteners/Honeycomb.webp'},

    {id: 63, name: 'Carrot', hp: 1, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Carrot.webp'},

    {id: 64, name: 'Roasted Carrot', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Roasted_Carrot.webp'},

    {id: 65, name: 'Corn', hp: 3, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Corn.webp'},

    {id: 66, name: 'Popcorn', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Popcorn.webp'},

    {id: 67, name: 'Eggplant', hp: 8, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Eggplant.webp'},

    {id: 68, name: 'Braised Eggplant', hp: 20, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Braised_Eggplant.webp'},

    {id: 69, name: 'Pumpkin', hp: 3, sanity: 0, hunger: 37.5, vegetableValue: 1, icon: '../images/icons/vegetables/Pumpkin.webp'},

    {id: 70, name: 'Hot Pumpkin', hp: 8, sanity: 0, hunger: 37.5, vegetableValue: 1, icon: '../images/icons/vegetables/Hot_Pumpkin.webp'},

    {id: 71, name: 'Seaweed', hp: 1, sanity: -10, hunger: 9.375, vegetableValue: 1, icon: '../images/icons/vegetables/shipwrecked/Seaweed.webp'},

    {id: 72, name: 'Roasted Seaweed', hp: 3, sanity: 0, hunger: 9.375, vegetableValue: 1, icon: '../images/icons/vegetables/shipwrecked/Roasted_Seaweed.webp'},

    {id: 73, name: 'Dried Seaweed', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/shipwrecked/Dried_Seaweed.webp'},

    {id: 74, name: 'Sweet Potato', hp: 1, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/shipwrecked/Sweet_Potato.webp'},

    {id: 75, name: 'Cooked Sweet Potato', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/shipwrecked/Cooked_Sweet_Potato.webp'},

    {id: 76, name: 'Mandrake', hp: 60, sanity: 0, hunger: 75, vegetableValue: 1, icon: '../images/icons/vegetables/Mandrake.webp'},

    {id: 77, name: 'Cooked Mandrake', hp: 100, sanity: 0, hunger: 150, vegetableValue: 1, icon: '../images/icons/vegetables/Cooked_Mandrake.webp'},

    {id: 78, name: 'Blue Cap', hp: 20, sanity: -15, hunger: 12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Blue_Cap.webp'},

    {id: 79, name: 'Cooked Blue Cap', hp: -3, sanity: 10, hunger: 0, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cooked_Blue_Cap.webp'},

    {id: 80, name: 'Green Cap', hp: 0, sanity: -50, hunger: 12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Green_Cap.webp'},

    {id: 81, name: 'Cooked Green Cap', hp: -1, sanity: 15, hunger: 0, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cooked_Green_Cap.webp'},

    {id: 82, name: 'Red Cap', hp: -20, sanity: 0, hunger: 12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Red_Cap.webp'},

    {id: 83, name: 'Cooked Red Cap', hp: 1, sanity: -10, hunger: 0, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cooked_Red_Cap.webp'},

    {id: 84, name: 'Butterfly Wings', hp: 8, sanity: 0, hunger: 9.375, icon: '../images/icons/other_edibles/shipwrecked/Butterfly_Wings_SW.webp'},

    {id: 85, name: 'Butter', hp: 40, sanity: 0, hunger: 25, dairy: true, dairyValue: 1, icon: '../images/icons/dairy/Butter.webp'},

    {id: 86, name: 'Ice', hp: 0.5, sanity: 0, hunger: 2.3, icon: '../images/icons/other_edibles/Ice.webp'},

    {id: 87, name: 'Twigs', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', inedible: true, icon: '../images/icons/inedibles/Twigs.webp'},

    {id: 88, name: 'Dorsal Fin', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', inedible: true, icon: '../images/icons/inedibles/shipwrecked/Dorsal_Fin.webp'}
];

const hamletIngredients = [
    {id: 1, name: 'Morsel', hp: 0, sanity: -10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Morsel.webp'},

    {id: 2, name: 'Cooked Morsel', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Cooked_Morsel.webp'},

    {id: 3, name: 'Drumstick', hp: 0, sanity: -10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Drumstick.webp'},

    {id: 4, name: 'Cooked Drumstick', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Fried_Drumstick.webp'},

    {id: 5, name: 'Frog Legs', hp: 0, sanity: -10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Frog_Legs.webp'},

    {id: 6, name: 'Cooked Frog Legs', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Cooked_Frog_Legs.webp'},

    {id: 7, name: 'Meat', hp: 1, sanity: -10, hunger: 25, meatValue: 1, icon: '../images/icons/meats/Meat.webp'},

    {id: 8, name: 'Cooked Meat', hp: 3, sanity: 0, hunger: 25, meatValue: 1, icon: '../images/icons/meats/Cooked_Meat.webp'},

    {id: 9, name: 'Monster Meat', hp: -20, sanity: -15, hunger: 18.75, meatValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/Monster_Meat.webp'},

    {id: 10, name: 'Cooked Monster Meat', hp: -3, sanity: -10, hunger: 18.75, meatValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/Cooked_Monster_Meat.webp'},

    {id: 11, name: 'Monster Jerky', hp: -3, sanity: -5, hunger: 18.75, meatValue: 1, monsterFoodValue: 1, icon: '../images/icons/meats/Monster_Jerky.webp'},

    {id: 12, name: 'Small Jerky', hp: 8, sanity: 10, hunger: 12.5, meatValue: 0.5, icon: '../images/icons/meats/Small_Jerky.webp'},

    {id: 13, name: 'Jerky', hp: 20, sanity: 15, hunger: 15, meatValue: 1, icon: '../images/icons/meats/Jerky.webp'},

    {id: 14, name: 'Piko', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', icon: '../images/icons/inedibles/hamlet/Orange_Piko.webp'},

    {id: 15, name: 'Fish', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/hamlet/Fish_(Hamlet).webp'},

    {id: 16, name: 'Cooked Fish', hp: 1, sanity: 0, hunger: 12.5, meatValue: 0.5, fishValue: 1, icon: '../images/icons/meats/hamlet/Cooked_Fish_(Hamlet).webp'},

    {id: 17, name: 'Fish Morsel', hp: 1, sanity: 0, hunger: 12.5, fishValue: 0.5, icon: '../images/icons/meats/Fish_Morsel.webp'},

    {id: 18, name: 'Cooked Fish Morsel', hp: 1, sanity: 0, hunger: 12.5, fishValue: 0.5, icon: '../images/icons/meats/Cooked_Fish_Morsel.webp'},

    {id: 19, name: 'Egg', hp: 0, sanity: 0, hunger: 9.375, eggValue: 1, icon: '../images/icons/eggs/Egg.webp'},

    {id: 20, name: 'Cooked Egg', hp: 0, sanity: 0, hunger: 12.5, eggValue: 1, icon: '../images/icons/eggs/Cooked_Egg.webp'},

    {id: 21, name: 'Tallbird Egg', hp: 3, sanity: 0, hunger: 20, eggValue: 4, icon: '../images/icons/eggs/Tallbird_Egg.webp'},

    {id: 22, name: 'Cooked Tallbird Egg', hp: 0, sanity: 0, hunger: 35.7, eggValue: 4, icon: '../images/icons/eggs/Fried_Tallbird_Egg.webp'},

    {id: 23, name: 'Bean Bugs', hp: 0, sanity: -10, hunger: 9.375, bugValue: 1, icon: '../images/icons/bugs/Bean_Bugs.webp'},

    {id: 24, name: 'Cooked Bean Bugs', hp: 1, sanity: -5, hunger: 12.5, bugValue: 1, icon: '../images/icons/bugs/Cooked_Bean_Bugs.webp'},

    {id: 25, name: 'Gummy Slug', hp: 0, sanity: -10, hunger: 9.375, bugValue: 1, icon: '../images/icons/bugs/Gummy_Slug.webp'},

    {id: 26, name: 'Cooked Gummy Slug', hp: 1, sanity: -5, hunger: 12.5, bugValue: 1, icon: '../images/icons/bugs/Cooked_Gummy_Slug.webp'},

    {id: 27, name: 'Berries', hp: 0, sanity: 0, hunger: 9.375, fruitValue: 0.5, icon: '../images/icons/fruits/Berries.webp'},

    {id: 28, name: 'Roasted Berries', hp: 1, sanity: 0, hunger: 12.5, fruitValue: 0.5, icon: '../images/icons/fruits/Roasted_Berries.webp'},

    {id: 29, name: 'Dragon Fruit', hp: 3, sanity: 0, hunger: 9.375, fruitValue: 1, icon: '../images/icons/fruits/Dragon_Fruit.webp'},

    {id: 30, name: 'Prepared Dragon Fruit', hp: 20, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Prepared_Dragon_Fruit.webp'},

    {id: 31, name: 'Durian', hp: -3, sanity: -5, hunger: 25, fruitValue: 1, monsterFoodValue: 1, icon: '../images/icons/fruits/Durian.webp'},

    {id: 32, name: 'Extra Smelly Durian', hp: 0, sanity: -5, hunger: 25, fruitValue: 1, monsterFoodValue: 1, icon: '../images/icons/fruits/Extra_Smelly_Durian.webp'},

    {id: 33, name: 'Pomegranate', hp: 3, sanity: 0, hunger: 9.375, fruitValue: 1, icon: '../images/icons/fruits/Pomegranate.webp'},

    {id: 34, name: 'Sliced Pomegranate', hp: 20, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Sliced_Pomegranate.webp'},

    {id: 35, name: 'Watermelon', hp: 3, sanity: 5, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Watermelon.webp'},

    {id: 36, name: 'Grilled Watermelon', hp: 1, sanity: 7.5, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Grilled_Watermelon.webp'}, 

    {id: 37, name: 'Banana', hp: 1, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/shipwrecked/Banana.webp'},

    {id: 38, name: 'Cooked Banana', hp: 3, sanity: 0, hunger: 12.5, fruitValue: 1, icon: '../images/icons/fruits/Cooked_Cave_Banana.webp'},

    {id: 39, name: 'Halved Coconut', hp: 1, sanity: 0, hunger: 4.6875, fruitValue: 1, icon: '../images/icons/fruits/shipwrecked/Halved_Coconut.webp'},

    {id: 40, name: 'Roasted Coconut', hp: 1, sanity: 0, hunger: 9.375, fruitValue: 1, icon: '../images/icons/fruits/shipwrecked/Roasted_Coconut.webp'},

    {id: 41, name: 'Coffee Beans', hp: 0, sanity: 0, hunger: 9.375, fruitValue: 0.5, icon: '../images/icons/fruits/shipwrecked/Coffee_Beans.webp'},

    {id: 42, name: 'Cooked Coffee Beans', hp: 0, sanity: -5, hunger: 9.375, fruitValue: 0.5, icon: '../images/icons/fruits/shipwrecked/Cooked_Coffee_Beans.webp'},

    {id: 43, name: 'Honey', hp: 3, sanity: 0, hunger: 9.375, sweetenerValue: 1, icon: '../images/icons/sweeteners/Honey.webp'},

    {id: 44, name: 'Honeycomb', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', sweetenerValue: 1, icon: '../images/icons/sweeteners/Honeycomb.webp'},

    {id: 45, name: 'Carrot', hp: 1, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Carrot.webp'},

    {id: 46, name: 'Roasted Carrot', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Roasted_Carrot.webp'},

    {id: 47, name: 'Asparagus', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Asparagus.webp'},

    {id: 48, name: 'Cooked Asparagus', hp: 3, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Cooked_Asparagus.webp'},

    {id: 49, name: 'Radish', hp: 1, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/hamlet/Radish.webp'},

    {id: 50, name: 'Cooked Radish', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/hamlet/Cooked_Radish.webp'},

    {id: 51, name: 'Aloe', hp: 8, sanity: 0, hunger: 9.375, vegetableValue: 1, icon: '../images/icons/vegetables/hamlet/Aloe.webp'},

    {id: 52, name: 'Cooked Aloe', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/hamlet/Cooked_Aloe.webp'},

    {id: 53, name: 'Foliage', hp: 1, sanity: 0, hunger: 0, vegetableValue: 1, icon: '../images/icons/vegetables/hamlet/Foliage.webp'},

    {id: 54, name: 'Corn', hp: 3, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Corn.webp'},

    {id: 55, name: 'Popcorn', hp: 3, sanity: 0, hunger: 12.5, vegetableValue: 1, icon: '../images/icons/vegetables/Popcorn.webp'},

    {id: 56, name: 'Eggplant', hp: 8, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Eggplant.webp'},

    {id: 57, name: 'Braised Eggplant', hp: 20, sanity: 0, hunger: 25, vegetableValue: 1, icon: '../images/icons/vegetables/Braised_Eggplant.webp'},

    {id: 58, name: 'Sweet Potato', hp: 1, sanity: 0, hunger: 12.5, icon: '../images/icons/vegetables/shipwrecked/Sweet_Potato.webp'},

    {id: 59, name: 'Pumpkin', hp: 3, sanity: 0, hunger: 37.5, vegetableValue: 1, icon: '../images/icons/vegetables/Pumpkin.webp'},

    {id: 60, name: 'Hot Pumpkin', hp: 8, sanity: 0, hunger: 37.5, vegetableValue: 1, icon: '../images/icons/vegetables/Hot_Pumpkin.webp'},

    {id: 61, name: 'Mandrake', hp: 60, sanity: 0, hunger: 75, vegetableValue: 1, icon: '../images/icons/vegetables/Mandrake.webp'},

    {id: 62, name: 'Cooked Mandrake', hp: 100, sanity: 0, hunger: 150, vegetableValue: 1, icon: '../images/icons/vegetables/Cooked_Mandrake.webp'},

    {id: 63, name: 'Blue Cap', hp: 20, sanity: -15, hunger: 12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Blue_Cap.webp'},

    {id: 64, name: 'Cooked Blue Cap', hp: -3, sanity: 10, hunger: 0, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cooked_Blue_Cap.webp'},

    {id: 65, name: 'Green Cap', hp: 0, sanity: -50, hunger: 12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Green_Cap.webp'},

    {id: 66, name: 'Cooked Green Cap', hp: -1, sanity: 15, hunger: 0, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cooked_Green_Cap.webp'},

    {id: 67, name: 'Red Cap', hp: -20, sanity: 0, hunger: 12.5, vegetableValue: 0.5, icon: '../images/icons/vegetables/Red_Cap.webp'},

    {id: 68, name: 'Cooked Red Cap', hp: 1, sanity: -10, hunger: 0, vegetableValue: 0.5, icon: '../images/icons/vegetables/Cooked_Red_Cap.webp'}, 

    {id: 69, name: 'Butterfly Wings', hp: 8, sanity: 0, hunger: 9.375, icon: '../images/icons/other_edibles/Butterfly_Wings.webp'},

    {id: 70, name: 'Roasted Birchnut', hp: 1, sanity: 0, hunger: 9.375, icon: '../images/icons/other_edibles/Roasted_Birchnut.webp'},

    {id: 71, name: 'Nettle', hp: 10, sanity: 0, hunger: 10, icon: '../images/icons/other_edibles/hamlet/Nettle.webp'},

    {id: 72, name: 'Butter', hp: 40, sanity: 0, hunger: 25, dairy: true, dairyValue: 1, icon: '../images/icons/dairy/Butter.webp'},

    {id: 73, name: 'Ice', hp: 0.5, sanity: 0, hunger: 2.3, icon: '../images/icons/other_edibles/Ice.webp'},

    {id: 74, name: 'Twigs', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', inedible: true, icon: '../images/icons/inedibles/Twigs.webp'},

    {id: 75, name: 'Weevole Carapace', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', inedible: true, icon: '../images/icons/inedibles/hamlet/Weevole_Carapace.webp'},

    {id: 76, name: 'Snake Bone', hp: 'N/A', sanity: 'N/A', hunger: 'N/A', inedible: true, icon: '../images/icons/inedibles/hamlet/Snake_Bone.webp'}

];

ReactDOM.render(
	<CrockpotRecipeTable reignOfGiantsFood={reignOfGiantsFood} 
	                     shipwreckedIngredients={shipwreckedIngredients}
	                     hamletIngredients={hamletIngredients}
	                     crockpotMeals={[crockpotMeals, shipwreckedMeals, hamletMeals]} 
	                     shipwreckedMeals={shipwreckedMeals} />,
	document.getElementById('timer-example')
);